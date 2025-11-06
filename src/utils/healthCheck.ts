export const healthCheck = () => {
  const checks = {
    environment: import.meta.env.MODE,
    buildTime: new Date().toISOString(),
    baseUrl: import.meta.env.VITE_APP_URL,
    emailJsConfigured: !!(import.meta.env.VITE_EMAILJS_SERVICE_ID && 
                         import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
                         import.meta.env.VITE_EMAILJS_PUBLIC_KEY),
    // Add more checks as needed
  }
  
  console.log('🏥 Health Check:', checks)
  return checks
}

// Call this in your main App component
export const initializeApp = () => {
  if (import.meta.env.PROD) {
    healthCheck()
  }
}
