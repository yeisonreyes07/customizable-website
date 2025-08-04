<template>
  <div class="main-layout" :style="mainStyles">
    <!-- Header -->
    <header class="main-header" :style="headerStyles">
      <div class="header-overlay"></div>
      <div class="header-content">
        <div class="header-logo-section">
          <img 
            :src="logoSrc" 
            alt="Logo Yeison Reyes" 
            class="main-logo"
            @error="handleLogoError"
            @load="handleLogoLoad"
          />
        </div>
        <div class="header-text">
          
          <h1 class="header-title" :style="headerTextStyles">
            Sistema de Personalización de Temas
          </h1>
          <p class="header-subtitle" :style="headerTextStyles">
            Yeison Reyes - 2025 | Personaliza la apariencia de tu sitio web en tiempo real
          </p>
        </div>
      </div>
    </header>

    <!-- Contenido Principal -->
    <main class="main-content">
      <div class="content-container">
      

        <!-- Sobre este proyecto -->
        <div class="about-section">
          <h2 class="section-title" :style="contentTitleStyles">
            ¿Qué puedes hacer aquí?
          </h2>
          
          <div class="about-grid">
            <div class="about-column">
              <h3 class="about-subtitle" :style="contentTitleStyles">
                🎨 Explora y experimenta
              </h3>
              <div class="about-content" :style="contentTextStyles">
                <p>Este es un espacio donde puedes jugar con diferentes combinaciones de colores y ver cómo transforman completamente la apariencia de una aplicación web.</p>
                <p>No hay reglas estrictas - simplemente diviértete creando el esquema de colores que más te guste.</p>
              </div>
            </div>

            <div class="about-column">
              <h3 class="about-subtitle" :style="contentTitleStyles">
                💾 Guarda tus creaciones
              </h3>
              <div class="about-content" :style="contentTextStyles">
                <p>Cuando encuentres una combinación que te encante, puedes guardarla y volverá a cargar automáticamente la próxima vez que visites la página.</p>
                <p>También puedes restablecer todo a los valores originales si quieres empezar de nuevo.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Cómo empezar -->
        <div class="getting-started-section">
          <div class="getting-started-card">
            <h3 class="getting-started-title" :style="contentTitleStyles">
              🚀 Empezar es súper fácil
            </h3>
            
            <div class="steps-container" :style="contentTextStyles">
              <div class="step-item">
                <div class="step-icon">
                  <MaterialIcon :icon="mdiPalette" size="lg" />
                </div>
                <div class="step-content">
                  <h4>Abre el personalizador</h4>
                  <p>Haz clic en el botón flotante de la esquina para abrir el panel de colores.</p>
                </div>
              </div>

              <div class="step-item">
                <div class="step-icon">
                  <MaterialIcon :icon="mdiFormatColorFill" size="lg" />
                </div>
                <div class="step-content">
                  <h4>Cambia los colores</h4>
                  <p>Haz clic en cualquier selector de color y elige el que más te guste. Los cambios se ven al instante.</p>
                </div>
              </div>

              <div class="step-item">
                <div class="step-icon">
                  <MaterialIcon :icon="mdiContentSaveAll" size="lg" />
                </div>
                <div class="step-content">
                  <h4>Guarda tu trabajo</h4>
                  <p>Cuando tengas algo que te guste, dale a "Guardar" y se recordará para la próxima vez.</p>
                </div>
              </div>
            </div>

            <div class="tip-box" :style="contentTextStyles">
              <p><strong>💡 Tip:</strong> No tengas miedo de experimentar. Siempre puedes usar el botón "Restablecer" para volver a empezar.</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="main-footer" :style="footerStyles">
      <div class="footer-overlay"></div>
      <div class="footer-content">
        <div class="footer-text">
         
          <p class="footer-description" :style="footerTextStyles">
            © 2025 Yeison Reyes - 2025 | Personaliza la apariencia de tu sitio web en tiempo real 
          </p>
         
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { computed, watch } from 'vue'
import MaterialIcon from './MaterialIcon.vue'
import { 
  mdiPalette,
  mdiLightningBolt,
  mdiHeart,
  mdiLock,
  mdiCheckBold,
  mdiCodeTags,
  mdiLaptop,
  mdiCloudDownload,
  mdiRocket,
  mdiShield,
  mdiSpeedometer,
  mdiKeyChange,
  mdiColorHelper,
  mdiChatMinus
} from '@mdi/js'

export default {
  name: 'MainLayout',
  components: {
    MaterialIcon
  },
  props: {
    theme: {
      type: Object,
      required: true
    }
  },
  setup(props) {

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


    const mainStyles = computed(() => {
      const backgroundColor = normalizeColor(props.theme.backgroundColor) || '#ffffff'
      const textColor = normalizeColor(props.theme.textColor) || '#1f2937'
      
      return {
        backgroundColor,
        color: textColor,
        transition: 'all 0.3s ease'
      }
    })


    const headerStyles = computed(() => {
      const backgroundColor = normalizeColor(props.theme.headerBackground) || '#f8fafc'
      
      return {
        backgroundColor,
        transition: 'all 0.3s ease'
      }
    })


    const footerStyles = computed(() => {
      const backgroundColor = normalizeColor(props.theme.footerBackground) || '#1f2937'
      
      return {
        backgroundColor,
        transition: 'all 0.3s ease'
      }
    })


    const headerTextStyles = computed(() => {
      const color = normalizeColor(props.theme.headerTextColor) || '#1f2937'
      
      return {
        color,
        transition: 'all 0.3s ease'
      }
    })


    const footerTextStyles = computed(() => {
      const color = normalizeColor(props.theme.footerTextColor) || '#f9fafb'
      
      return {
        color,
        transition: 'all 0.3s ease'
      }
    })


    const logoSrc = computed(() => {
      const logo = props.theme.logoUrl
      

      if (!logo || logo.trim() === '') {
        console.warn('Logo URL está vacío, usando logo por defecto')
        return '/images/logo.gif'
      }
      

      if (logo.startsWith('data:')) {
        if (!logo.includes('image/') || !logo.includes('base64,')) {
          console.warn('Formato de imagen base64 inválido, usando logo por defecto')
          return '/images/logo.gif'
        }
      }
      
      return logo
    })


    const handleLogoError = (event) => {
      console.error('Error cargando logo:', props.theme.logoUrl)
      

      if (event.target.src !== '/images/logo.gif') {
        console.log('Fallback al logo por defecto')
        event.target.src = '/images/logo.gif'
      } else {
        console.error('Error cargando incluso el logo por defecto')

        event.target.style.display = 'none'
      }
    }


    const handleLogoLoad = (event) => {
      console.log('Logo cargado exitosamente:', event.target.src)

      event.target.style.display = 'block'
    }


    const contentTitleStyles = computed(() => {
      const color = normalizeColor(props.theme.contentTitleColor) || '#3b82f6'
      
      return {
        color,
        transition: 'all 0.3s ease'
      }
    })


    const contentTextStyles = computed(() => {
      const color = normalizeColor(props.theme.contentTextColor) || '#4b5563'
      
      return {
        color,
        transition: 'all 0.3s ease'
      }
    })


    watch(() => props.theme, (newTheme) => {
      if (newTheme) {
        console.log('Tema actualizado en MainLayout:', newTheme)
      }
    }, { deep: true })

    return {
      mainStyles,
      headerStyles,
      footerStyles,
      headerTextStyles,
      footerTextStyles,
      contentTitleStyles,
      contentTextStyles,
      logoSrc,
      handleLogoError,
      handleLogoLoad,
  
      mdiPalette,
      mdiLightningBolt,
      mdiHeart,
      mdiLock,
      mdiCheckBold,
      mdiCodeTags,
      mdiLaptop,
      mdiCloudDownload,
      mdiRocket,
      mdiShield,
      mdiSpeedometer
    }
  }
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-header {
  position: relative;
  overflow: hidden;
}

.header-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(124, 58, 237, 0.1));
}

.header-content {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.header-logo-section {
  flex-shrink: 0;
}

.main-logo {
  height: 120px;
  width: auto;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  filter: brightness(1.1);
}

.main-logo:hover {
  transform: scale(1.05) rotate(5deg);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  filter: brightness(1.2);
}

/* Estados del logo */
.main-logo {
  display: block;
  transition: all 0.3s ease, opacity 0.2s ease;
}

.main-logo[style*="display: none"] {
  opacity: 0;
  transform: scale(0.9);
}

/* Fallback cuando hay error de carga */
.header-logo-section:has(.main-logo[style*="display: none"])::before {
  content: "📷";
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #f3f4f6;
  border: 4px solid #e5e7eb;
  color: #6b7280;
}

.header-text {
  text-align: left;
  flex: 1;
  min-width: 300px;
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%);
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.header-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
}

.header-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
 
}

.main-content {
  flex: 1;
  padding-top: 4rem;
  padding-bottom: 4rem;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.welcome-section {
  max-width: 64rem;
  margin: 0 auto 4rem auto;
}

.welcome-text {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  margin: 0 0 1.5rem 0;
}

.welcome-description {
  font-size: 1.125rem;
  line-height: 1.75;
  max-width: 48rem;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.feature-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
  padding: 1.5rem;
  transition: all 0.3s;
}

.feature-card:hover {
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.feature-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: transform 0.3s;
}

.feature-icon.green {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.feature-icon.blue {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.feature-icon.purple {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  margin: 0 0 0.75rem 0;
}

.feature-description {
  color: #6b7280;
  margin: 0;
}

.about-section {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  margin: 0 0 3rem 0;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 900px;
  margin: 0 auto;
}

.about-column {
  text-align: left;
}

.about-subtitle {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  margin: 0 0 1.5rem 0;
}

.about-content {
  line-height: 1.7;
}

.about-content p {
  margin-bottom: 1rem;
}

.about-content p:last-child {
  margin-bottom: 0;
}

.getting-started-section {
  margin-bottom: 4rem;
}

.getting-started-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
  padding: 2.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.getting-started-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  margin: 0 0 2.5rem 0;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border-left: 4px solid #3b82f6;
}

.step-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%);
  color: white;
  border-radius: 0.75rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h4 {
  font-weight: 600;
  margin-bottom: 0.5rem;
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.step-content p {
  margin: 0;
  line-height: 1.6;
  color: #6b7280;
}

.tip-box {
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
}

.tip-box p {
  margin: 0;
  color: #92400e;
}

.main-footer {
  position: relative;
  overflow: hidden;
}

.footer-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(17, 24, 39, 0.1), rgba(31, 41, 55, 0.1));
}

.footer-content {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.footer-text {
  text-align: center;
}

.footer-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.footer-icon {
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.footer-description {
  font-size: 1.125rem;
  margin-bottom: 1rem;
  margin: 0 0 1rem 0;
}

.footer-subdescription {
  opacity: 0.8;
  margin: 0;
}

/* Iconos */
.icon-md {
  width: 1.25rem;
  height: 1.25rem;
}

.icon-lg {
  width: 1.5rem;
  height: 1.5rem;
}

.icon-xl {
  width: 2rem;
  height: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  
  .main-logo {
    height: 80px;
  }
  
  .header-text {
    text-align: center;
  }
  
  .header-title {
    font-size: 2rem;
  }
  
  .header-subtitle {
    font-size: 1.125rem;
  }
  
  .welcome-title {
    font-size: 1.875rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .about-grid {
    grid-template-columns: 1fr;
  }
  
  .steps-container {
    gap: 1.5rem;
  }
  
  .step-item {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .getting-started-card {
    padding: 2rem;
  }
}
</style> 