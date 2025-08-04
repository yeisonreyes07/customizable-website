<template>
  <div :class="['theme-panel', { 'theme-panel-compact': compact }]">

    <!-- Contenido del Panel -->
    <div :class="['panel-content', { 'panel-content-compact': compact }]">
      <!-- Logo Personalizado -->
      <div class="panel-section animated-border">
        <div class="panel-title">
          <MaterialIcon :icon="mdiImageEdit" size="md" />
          Logo Personalizado
        </div>
        
        <div class="section-content">
          <div class="input-group">
            <label class="input-label">Cambiar Logo</label>
            <div class="logo-preview-container">
              <div class="logo-preview">
                <img :src="localTheme.logoUrl" alt="Logo actual" class="preview-image" />
              </div>
              <div class="logo-controls">
                <input 
                  type="file" 
                  ref="logoInput"
                  @change="handleLogoUpload"
                  accept="image/*"
                  class="file-input"
                  style="display: none;"
                />
                <button 
                  @click.stop="$refs.logoInput.click()"
                  class="btn btn-secondary"
                  type="button"
                >
                  <MaterialIcon :icon="mdiImagePlus" size="sm" />
                  Subir Imagen
                </button>
                <button 
                  @click.stop="resetLogo"
                  class="btn btn-outline"
                  type="button"
                  v-if="localTheme.logoUrl && localTheme.logoUrl !== '/images/logo.gif'"
                >
                  <MaterialIcon :icon="mdiRestore" size="sm" />
                  Restaurar Original
                </button>
              </div>
            </div>
            <p class="input-help">Formatos soportados: JPG, PNG, GIF, WebP (máx. 2MB)</p>
          </div>
        </div>
      </div>

      <!-- Estilos Globales -->
      <div class="panel-section animated-border">
        <div class="panel-title">
          <MaterialIcon :icon="mdiPalette" size="md" />
          Estilos Globales
        </div>
        
        <div class="section-content">
          <div class="input-group">
            <label class="input-label">Color de Fondo Principal</label>
            <div class="input-row">
              <input 
                type="color" 
                v-model="localTheme.backgroundColor"
                @change.stop="updateGlobalTheme"
                class="color-input"
              />
              <input 
                type="text" 
                v-model="localTheme.backgroundColor"
                @input.stop="updateGlobalTheme"
                placeholder="#ffffff"
                class="text-input"
                :class="{ 'error': errors.backgroundColor }"
              />
            </div>
            <span v-if="errors.backgroundColor" class="error-message">{{ errors.backgroundColor }}</span>
          </div>

          <div class="input-group">
            <label class="input-label">Color de Texto Global</label>
            <div class="input-row">
              <input 
                type="color" 
                v-model="localTheme.textColor"
                @change="updateGlobalTheme"
                class="color-input"
              />
              <input 
                type="text" 
                v-model="localTheme.textColor"
                @input="updateGlobalTheme"
                placeholder="#1f2937"
                class="text-input"
                :class="{ 'error': errors.textColor }"
              />
            </div>
            <span v-if="errors.textColor" class="error-message">{{ errors.textColor }}</span>
          </div>
        </div>
      </div>

      <!-- Estilos del Header -->
      <div class="panel-section animated-border">
        <div class="panel-title">
          <MaterialIcon :icon="mdiPalette" size="md" />
          Estilos del Header
        </div>
        
        <div class="section-content">
          <div class="input-group">
            <label class="input-label">Fondo del Header</label>
            <div class="input-row">
              <input 
                type="color" 
                v-model="localTheme.headerBackground"
                @change="updateGlobalTheme"
                class="color-input"
              />
              <input 
                type="text" 
                v-model="localTheme.headerBackground"
                @input="updateGlobalTheme"
                placeholder="#f8fafc"
                class="text-input"
                :class="{ 'error': errors.headerBackground }"
              />
            </div>
            <span v-if="errors.headerBackground" class="error-message">{{ errors.headerBackground }}</span>
          </div>

          <div class="input-group">
            <label class="input-label">Texto del Header</label>
            <div class="input-row">
              <input 
                type="color" 
                v-model="localTheme.headerTextColor"
                @change="updateGlobalTheme"
                class="color-input"
              />
              <input 
                type="text" 
                v-model="localTheme.headerTextColor"
                @input="updateGlobalTheme"
                placeholder="#1f2937"
                class="text-input"
                :class="{ 'error': errors.headerTextColor }"
              />
            </div>
            <span v-if="errors.headerTextColor" class="error-message">{{ errors.headerTextColor }}</span>
          </div>
        </div>
      </div>

      <!-- Estilos del Contenido -->
      <div class="panel-section animated-border">
        <div class="panel-title">
          <MaterialIcon :icon="mdiPalette" size="md" />
          Estilos del Contenido
        </div>
        
        <div class="section-content">
          <div class="input-group">
            <label class="input-label">Color de Títulos</label>
            <div class="input-row">
              <input 
                type="color" 
                v-model="localTheme.contentTitleColor"
                @change="updateGlobalTheme"
                class="color-input"
              />
              <input 
                type="text" 
                v-model="localTheme.contentTitleColor"
                @input="updateGlobalTheme"
                placeholder="#3b82f6"
                class="text-input"
                :class="{ 'error': errors.contentTitleColor }"
              />
            </div>
            <span v-if="errors.contentTitleColor" class="error-message">{{ errors.contentTitleColor }}</span>
          </div>

          <div class="input-group">
            <label class="input-label">Color de Texto del Contenido</label>
            <div class="input-row">
              <input 
                type="color" 
                v-model="localTheme.contentTextColor"
                @change="updateGlobalTheme"
                class="color-input"
              />
              <input 
                type="text" 
                v-model="localTheme.contentTextColor"
                @input="updateGlobalTheme"
                placeholder="#4b5563"
                class="text-input"
                :class="{ 'error': errors.contentTextColor }"
              />
            </div>
            <span v-if="errors.contentTextColor" class="error-message">{{ errors.contentTextColor }}</span>
          </div>
        </div>
      </div>

      <!-- Estilos del Footer -->
      <div class="panel-section animated-border">
        <div class="panel-title">
          <MaterialIcon :icon="mdiPalette" size="md" />
          Estilos del Footer
        </div>
        
        <div class="section-content">
          <div class="input-group">
            <label class="input-label">Fondo del Footer</label>
            <div class="input-row">
              <input 
                type="color" 
                v-model="localTheme.footerBackground"
                @change="updateGlobalTheme"
                class="color-input"
              />
              <input 
                type="text" 
                v-model="localTheme.footerBackground"
                @input="updateGlobalTheme"
                placeholder="#1f2937"
                class="text-input"
                :class="{ 'error': errors.footerBackground }"
              />
            </div>
            <span v-if="errors.footerBackground" class="error-message">{{ errors.footerBackground }}</span>
          </div>

          <div class="input-group">
            <label class="input-label">Texto del Footer</label>
            <div class="input-row">
              <input 
                type="color" 
                v-model="localTheme.footerTextColor"
                @change="updateGlobalTheme"
                class="color-input"
              />
              <input 
                type="text" 
                v-model="localTheme.footerTextColor"
                @input="updateGlobalTheme"
                placeholder="#f9fafb"
                class="text-input"
                :class="{ 'error': errors.footerTextColor }"
              />
            </div>
            <span v-if="errors.footerTextColor" class="error-message">{{ errors.footerTextColor }}</span>
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div class="panel-section animated-border">
        <div class="panel-title">
          <MaterialIcon :icon="mdiTune" size="md" />
          Acciones
        </div>
        
        <div class="actions-container">
      
          
                      <button 
              @click.stop="saveTheme" 
              class="btn btn-success action-btn"
              style="position: relative; z-index: 10;"
            >
              <MaterialIcon :icon="mdiContentSaveOutline" size="md" />
              Guardar Tema
            </button>
          
        
          
                      <button 
              @click.stop="resetTheme" 
              class="btn btn-danger action-btn"
              style="position: relative; z-index: 10;"
            >
              <MaterialIcon :icon="mdiRefresh" size="md" />
              Restablecer
            </button>
        </div>
      </div>

     
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch, onMounted, nextTick } from 'vue'
import MaterialIcon from './MaterialIcon.vue'
import { 
  mdiPalette,
  mdiHeart,
  mdiMenu,
  mdiFileDocumentOutline,
  mdiDomain,
  mdiTune,
  mdiContentSaveOutline,
  mdiRefresh,
  mdiImageEdit,
  mdiImagePlus,
  mdiRestore
} from '@mdi/js'

export default {
  name: 'ThemePanel',
  components: {
    MaterialIcon
  },
  props: {
    theme: {
      type: Object,
      required: true
    },
    compact: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update-theme', 'save-theme', 'load-theme', 'notification'],
  setup(props, { emit }) {
    const defaultTheme = {
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      headerBackground: '#f8fafc',
      headerTextColor: '#1f2937',
      contentTitleColor: '#3b82f6',
      contentTextColor: '#4b5563',
      footerBackground: '#1f2937',
      footerTextColor: '#f9fafb',
      logoUrl: '/images/logo.gif'
    }

    const localTheme = ref({ ...defaultTheme })
    const errors = reactive({})

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

    const validateColor = (field) => {
      if (field === 'logoUrl') {
        delete errors[field]
        return true
      }
      
      const color = localTheme.value[field]
      const normalizedColor = normalizeColor(color)
      
      if (!color || !normalizedColor) {
        errors[field] = 'El color es requerido'
        return false
      }
      
      const hexRegex = /^#([A-Fa-f0-9]{6})$/ 
      
      if (!hexRegex.test(normalizedColor)) {
        errors[field] = 'Formato de color inválido (ej: #ff0000)'
        return false
      }
      
      delete errors[field]
      return true
    }

    const updateGlobalTheme = () => {
      try {
        console.log('updateGlobalTheme llamado, localTheme:', localTheme.value)
        
        const normalizedTheme = {}
        Object.keys(localTheme.value).forEach(field => {
          if (field === 'logoUrl') {
            normalizedTheme[field] = localTheme.value[field]
          } else {
            normalizedTheme[field] = normalizeColor(localTheme.value[field]) || localTheme.value[field]
          }
        })
        
        console.log('ThemePanel emitiendo tema:', normalizedTheme)
        emit('update-theme', normalizedTheme)
      } catch (error) {
        console.error('Error actualizando tema:', error)
      }
    }

    
    const saveTheme = () => {
      console.log('Botón Guardar clickeado')
      try {
        emit('save-theme')
        console.log('Evento save-theme emitido')
      } catch (error) {
        console.error('Error emitiendo save-theme:', error)
      }
    }


    const loadTheme = () => {
      console.log('Botón Cargar clickeado')
      try {
        emit('load-theme')
        console.log('Evento load-theme emitido')
      } catch (error) {
        console.error('Error emitiendo load-theme:', error)
      }
    }


    const resetTheme = () => {
      console.log('Botón Restablecer clickeado')
      try {
        localTheme.value = { ...defaultTheme }
        Object.keys(errors).forEach(key => delete errors[key])
        updateGlobalTheme()
        console.log('Tema restablecido exitosamente')
        emit('notification', 'Éxito', 'Tema y logo restablecidos completamente', 'success')
      } catch (error) {
        console.error('Error restableciendo tema:', error)
        emit('notification', 'Error', 'Error al restablecer el tema', 'error')
      }
    }

    watch(() => props.theme, (newTheme) => {
      if (newTheme && Object.keys(newTheme).length > 0) {
        console.log('ThemePanel recibió nuevo tema:', newTheme)
        const normalizedTheme = {}
        Object.keys(newTheme).forEach(key => {
          if (key === 'logoUrl') {
            normalizedTheme[key] = newTheme[key] || '/images/logo.gif'
          } else {
            normalizedTheme[key] = normalizeColor(newTheme[key])
          }
        })
        localTheme.value = { ...defaultTheme, ...normalizedTheme }
        
        Object.keys(errors).forEach(key => delete errors[key])
      }
    }, { deep: true, immediate: true })

    onMounted(() => {
      if (props.theme && Object.keys(props.theme).length > 0) {
        const normalizedTheme = {}
        Object.keys(props.theme).forEach(key => {
          if (key === 'logoUrl') {
            normalizedTheme[key] = props.theme[key] || '/images/logo.gif'
          } else {
            normalizedTheme[key] = normalizeColor(props.theme[key])
          }
        })
        localTheme.value = { ...defaultTheme, ...normalizedTheme }
      } else {
        localTheme.value = { ...defaultTheme }
      }
    })

    const handleLogoUpload = (event) => {
      const file = event.target.files[0]
      if (!file) return


      if (file.size > 2 * 1024 * 1024) {
        emit('notification', 'Error', 'La imagen debe ser menor a 2MB', 'error')
        return
      }


      if (!file.type.startsWith('image/')) {
        emit('notification', 'Error', 'Por favor selecciona un archivo de imagen válido', 'error')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        localTheme.value.logoUrl = e.target.result
        updateGlobalTheme()
        emit('notification', 'Éxito', 'Logo actualizado correctamente', 'success')
      }
      reader.onerror = () => {
        emit('notification', 'Error', 'Error al cargar la imagen', 'error')
      }
      reader.readAsDataURL(file)
    }

    const resetLogo = () => {
      localTheme.value.logoUrl = '/images/logo.gif'
      updateGlobalTheme()
      emit('notification', 'Éxito', 'Logo restaurado al original', 'success')
    }

    return {
      localTheme,
      errors,
      validateColor,
      updateGlobalTheme,
      saveTheme,
      loadTheme,
      resetTheme,
      handleLogoUpload,
      resetLogo,
  
      mdiPalette,
      mdiHeart,
      mdiMenu,
      mdiFileDocumentOutline,
      mdiDomain,
      mdiTune,
      mdiContentSaveOutline,
      mdiRefresh,
      mdiImageEdit,
      mdiImagePlus,
      mdiRestore
    }
  }
}
</script>

<style scoped>
.theme-panel {
  height: 100%;
  background-color: #f9fafb;
}

.theme-panel-compact {
  background-color: transparent;
}

.panel-header {
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
  z-index: 10;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-text {
  flex: 1;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.header-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.panel-content {
  padding: 1.5rem;
}

.panel-content-compact {
  padding: 1rem;
}

.panel-section {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}

.theme-panel-compact .panel-section {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}

.panel-section:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.panel-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #60a5fa, #3b82f6);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  z-index: -1;
}

.panel-section:hover::before {
  opacity: 0.1;
}

.panel-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-panel-compact .panel-title {
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.panel-title svg {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  color: #2563eb;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.theme-panel-compact .input-group {
  gap: 0.375rem;
}

.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.theme-panel-compact .input-label {
  font-size: 0.8rem;
}

.input-row {
  display: flex;
  gap: 0.75rem;
}

.color-input {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  border: 2px solid #d1d5db;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.theme-panel-compact .color-input {
  width: 2.5rem;
  height: 2.5rem;
}

.color-input:hover {
  transform: scale(1.05);
}

.color-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.text-input {
  flex: 1;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.2s;
}

.text-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}

.text-input.error {
  border-color: #dc2626;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.25);
}

.error-message {
  font-size: 0.875rem;
  color: #dc2626;
}

.actions-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.theme-panel-compact .action-btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.preview-item {
  text-align: center;
}

.color-preview {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  border: 2px solid #d1d5db;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 0 auto 0.5rem;
}

.color-preview:hover {
  transform: scale(1.1);
}

.preview-label {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
}

/* Iconos */
.icon-sm {
  width: 1rem;
  height: 1rem;
}

.icon-md {
  width: 1.25rem;
  height: 1.25rem;
}

.icon-lg {
  width: 1.5rem;
  height: 1.5rem;
}

/* Animación pulse-glow */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
  }
}

.pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Estilos para logo personalizado */
.logo-preview-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.logo-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #e5e7eb;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo-controls {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.input-help {
  font-size: 0.75rem;
  color: #6b7280;
  text-align: center;
  margin: 0.5rem 0 0 0;
  line-height: 1.4;
}

.btn-secondary {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  transform: translateY(-1px);
}

.btn-outline {
  background: transparent;
  color: #6b7280;
  border: 2px solid #e5e7eb;
}

.btn-outline:hover {
  background: #f9fafb;
  border-color: #d1d5db;
  color: #374151;
  transform: translateY(-1px);
}
</style> 