export const theme = {
    // Primærfarger
    primary: {
      main: '#4CAF50',      // Grønn hovedfarge
      light: '#81C784',     // Lysere grønn
      dark: '#388E3C',      // Mørkere grønn
      contrastText: '#FFF', // Tekstfarge på grønn bakgrunn
    },
    
    // Sekundærfarger
    secondary: {
      main: '#FFC107',      // Gul/oransje hovedfarge
      light: '#FFECB3',     // Lysere gul
      dark: '#FFA000',      // Mørkere gul/oransje
      contrastText: '#333', // Tekstfarge på gul bakgrunn
    },
    
    // Status farger
    status: {
      success: '#E8F5E9',   // Bakgrunn for suksess (grønn)
      warning: '#FFF9C4',   // Bakgrunn for advarsel (gul)
      error: '#FFEBEE',     // Bakgrunn for feil (rød)
      successText: '#2E7D32', // Tekst for suksess
      warningText: '#F57F17', // Tekst for advarsel
      errorText: '#C62828',   // Tekst for feil
    },
    
    // Grå nyanser
    grey: {
      light: '#F5F5F5',     // Lys grå (bakgrunn)
      medium: '#E0E0E0',    // Medium grå
      dark: '#666',         // Mørk grå for tekst
    },
    
    // Tekst farger
    text: {
      primary: '#333',      // Primær tekstfarge
      secondary: '#666',    // Sekundær tekstfarge
      disabled: '#999',     // Deaktivert tekst
    },
    
    // Bakgrunnsfarger
    background: {
      default: '#F5F5F5',   // Standard bakgrunn
      paper: '#FFF',        // Bakgrunn for kort/papir-elementer
      modal: '#FFF',        // Bakgrunn for modaler
    },
    
    // Komponentspesifikke farger
    components: {
      card: {
        border: 'transparent',
        shadow: 'rgba(0,0,0,0.1)',
        activeShadow: 'rgba(0,0,0,0.2)',
      },
      button: {
        primary: '#4CAF50',
        secondary: '#F0F0F0',
        hover: {
          primary: '#45A049',
          secondary: '#E0E0E0',
        }
      }
    }
  };