import { BrowserRouter } from 'react-router-dom'

import { configureAxiosRequestInterceptors } from './services/ServiceConfig'
import AppContent from './AppContent'

function App() {
  configureAxiosRequestInterceptors()

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
