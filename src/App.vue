<template>
  <div id="app" class="app-container">
    <button 
      v-if="!showThemeModal"
      @click="openThemeModal"
      class="theme-modal-trigger"
      title="Abrir Personalizador de Temas"
    >
      <MaterialIcon :icon="mdiPalette" size="md" />
    </button>

    <div 
      v-if="showThemeModal"
      class="theme-modal-overlay"
      @click="closeThemeModal"
    >
      <div 
        class="theme-modal"
        @click.stop
      >
        <div class="theme-modal-header">
          <div class="theme-modal-title">
            <MaterialIcon :icon="mdiPalette" size="md" />
            <span>Personalizador</span>
          </div>
          <button 
            @click="closeThemeModal"
            class="theme-modal-close"
            title="Cerrar Personalizador"
          >
            <MaterialIcon :icon="mdiClose" size="sm" />
          </button>
        </div>
        
        <div class="theme-modal-content">
                <ThemePanel 
        :theme="theme" 
        @update-theme="updateThemeOnly"
        @update-theme-with-validation="updateTheme"
        @save-theme="saveTheme"
        @load-theme="loadTheme"
        @notification="showNotification"
        :compact="true"
      />
        </div>
      </div>
    </div>


    <div class="main-content full-width">
      <MainLayout :theme="theme" />
    </div>


  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useToast } from 'vue-toastification'
import ThemePanel from './components/ThemePanel.vue'
import MainLayout from './components/MainLayout.vue'
import MaterialIcon from './components/MaterialIcon.vue'
import { mdiPalette, mdiClose } from '@mdi/js'

export default {
  name: 'App',
  components: {
    ThemePanel,
    MainLayout,
    MaterialIcon
  },
  setup() {
    const theme = useLocalStorage('customTheme', {
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      headerBackground: '#f8fafc',
      headerTextColor: '#1f2937',
      contentTitleColor: '#3b82f6',
      contentTextColor: '#4b5563',
      footerBackground: '#1f2937',
      footerTextColor: '#f9fafb',
      logoUrl: '/images/logo.gif'
    })

    const showThemeModal = ref(true)
    const toast = useToast()


    const normalizeColor = (color) => {
      if (!color) return ''
      
      if (color.startsWith('data:') || color.startsWith('/') || color.startsWith('http')) {
        return color
      }
      
      let normalized = color.trim().toLowerCase()
      
      if (!normalized.startsWith('#')) {
        normalized = '#' + normalized
      }
      
      if (normalized.length === 4) {
        normalized = '#' + normalized[1] + normalized[1] + normalized[2] + normalized[2] + normalized[3] + normalized[3]
      }
      
      return normalized
    }


    const validateTheme = (themeData) => {
      const hexRegex = /^#([A-Fa-f0-9]{6})$/
      const errors = {}
      
      Object.keys(themeData).forEach(key => {
        if (key === 'logoUrl') {
          return
        }
        
        const normalizedColor = normalizeColor(themeData[key])
        if (!normalizedColor || !hexRegex.test(normalizedColor)) {
          errors[key] = 'Color inválido'
        }
      })
      
      return Object.keys(errors).length === 0
    }

    const updateThemeOnly = (newTheme) => {
      try {
        const normalizedTheme = {}
        Object.keys(newTheme).forEach(key => {
          if (key === 'logoUrl') {
            normalizedTheme[key] = newTheme[key]
          } else {
            normalizedTheme[key] = normalizeColor(newTheme[key])
          }
        })
        
        theme.value = { ...normalizedTheme }
        applyGlobalTheme(normalizedTheme)
      } catch (error) {
        console.error('Error al actualizar tema:', error)
      }
    }

    const updateTheme = (newTheme) => {
      try {
        if (validateTheme(newTheme)) {
          const normalizedTheme = {}
          Object.keys(newTheme).forEach(key => {
            if (key === 'logoUrl') {
              normalizedTheme[key] = newTheme[key]
            } else {
              normalizedTheme[key] = normalizeColor(newTheme[key])
            }
          })
          
          theme.value = { ...normalizedTheme }
          applyGlobalTheme(normalizedTheme)
        } else {
          showNotification('Error', 'Algunos colores son inválidos', 'error')
        }
      } catch (error) {
        console.error('Error al actualizar tema:', error)
        showNotification('Error', 'No se pudo actualizar el tema', 'error')
      }
    }

    const saveTheme = () => {
      try {
        if (validateTheme(theme.value)) {
          showNotification('Éxito', 'Tema guardado correctamente', 'success')
        } else {
          showNotification('Error', 'El tema contiene colores inválidos', 'error')
        }
      } catch (error) {
        showNotification('Error', 'No se pudo guardar el tema', 'error')
      }
    }

    const loadTheme = () => {
      try {
        if (validateTheme(theme.value)) {
          showNotification('Éxito', 'Tema cargado correctamente', 'success')
        } else {
          showNotification('Error', 'El tema guardado contiene colores inválidos', 'error')
        }
      } catch (error) {
        showNotification('Error', 'No se pudo cargar el tema', 'error')
      }
    }

    const openThemeModal = () => {
      showThemeModal.value = true
    }

    const closeThemeModal = () => {
      showThemeModal.value = false
    }

    const showNotification = (title, message, type = 'success') => {
      const options = {
        timeout: 4000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        icon: true
      }
      
      if (type === 'success') {
        toast.success(`✅ ${title}: ${message}`, options)
      } else if (type === 'error') {
        toast.error(`❌ ${title}: ${message}`, options)
      } else if (type === 'warning') {
        toast.warning(`⚠️ ${title}: ${message}`, options)
      } else {
        toast.info(`ℹ️ ${title}: ${message}`, options)
      }
    }


    const applyGlobalTheme = (themeData) => {
      try {
        const root = document.documentElement
        
        root.style.setProperty('--bg-color', themeData.backgroundColor || '#ffffff')
        root.style.setProperty('--text-color', themeData.textColor || '#1f2937')
        root.style.setProperty('--header-bg', themeData.headerBackground || '#f8fafc')
        root.style.setProperty('--header-text', themeData.headerTextColor || '#1f2937')
        root.style.setProperty('--content-title', themeData.contentTitleColor || '#3b82f6')
        root.style.setProperty('--content-text', themeData.contentTextColor || '#4b5563')
        root.style.setProperty('--footer-bg', themeData.footerBackground || '#1f2937')
        root.style.setProperty('--footer-text', themeData.footerTextColor || '#f9fafb')

      } catch (error) {
        console.error('Error aplicando variables CSS:', error)
      }
    }

    onMounted(() => {
      if (theme.value && Object.keys(theme.value).length > 0) {
        if (validateTheme(theme.value)) {
          applyGlobalTheme(theme.value)
        } else {
          console.warn('Tema con colores inválidos detectado, restableciendo...')
          const defaultTheme = {
            backgroundColor: '#ffffff',
            textColor: '#1f2937',
            headerBackground: '#f8fafc',
            headerTextColor: '#1f2937',
            contentTitleColor: '#3b82f6',
            contentTextColor: '#4b5563',
            footerBackground: '#1f2937',
            footerTextColor: '#f9fafb'
          }
          theme.value = defaultTheme
          applyGlobalTheme(defaultTheme)
        }
      } else {
        const defaultTheme = {
          backgroundColor: '#ffffff',
          textColor: '#1f2937',
          headerBackground: '#f8fafc',
          headerTextColor: '#1f2937',
          contentTitleColor: '#3b82f6',
          contentTextColor: '#4b5563',
          footerBackground: '#1f2937',
          footerTextColor: '#f9fafb'
        }
        theme.value = defaultTheme
        applyGlobalTheme(defaultTheme)
      }
    })


    watch(theme, (newTheme) => {
      if (newTheme && Object.keys(newTheme).length > 0) {
        if (!validateTheme(newTheme)) {
          console.warn('Tema con colores inválidos detectado')
        }
      }
    }, { deep: true })

    return {
      theme,
      showThemeModal,
      updateTheme,
      updateThemeOnly,
      saveTheme,
      loadTheme,
      openThemeModal,
      closeThemeModal,
      applyGlobalTheme,
      mdiPalette,
      mdiClose
    }
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  position: relative;
}

.theme-modal-trigger {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.theme-modal-trigger:hover {
  transform: scale(1.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.theme-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1100;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 1rem;
}

.theme-modal {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 400px;
  width: 100%;
  max-height: 100vh;
  overflow: hidden;
  animation: slideInFromRight 0.3s ease-out;
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.theme-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%);
  color: white;
}

.theme-modal-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
}

.theme-modal-close {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.theme-modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.theme-modal-content {
  max-height: calc(95vh - 4rem);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

.theme-modal-content::-webkit-scrollbar {
  width: 6px;
}

.theme-modal-content::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.theme-modal-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.theme-modal-content::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.main-content.full-width {
  margin-left: 0;
}


@media (max-width: 768px) {
  .theme-modal {
    max-width: 95%;
    margin: 0 auto;
  }
  
  .theme-modal-overlay {
    align-items: center;
    justify-content: center;
  }
}
</style> 