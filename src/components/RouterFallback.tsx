import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function RouterFallback() {
  const location = useLocation()
  
  useEffect(() => {
    // Fix for GitHub Pages SPA routing
    if (location.pathname !== window.location.pathname) {
      window.history.replaceState(null, '', location.pathname)
    }
    
    // Scroll to top on route change
    window.scrollTo(0, 0)
  }, [location])
  
  return null
}
