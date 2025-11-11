import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

// Register service worker for PWA with automatic updates
const updateSW = registerSW({
  onNeedRefresh() {
    // Automatically reload to get the latest version
    // This ensures users always have the newest code and prevents data access issues
    console.log('New version available, updating automatically...')
    updateSW(true)
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  },
  immediate: true
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
