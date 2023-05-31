import { BrowserRouter } from 'react-router-dom'

import { configureAxiosRequestInterceptors } from './services/ServiceConfig'
import AppContent from './AppContent'
import { DashContextProvider } from './store/dashboard-context'

function App() {
  configureAxiosRequestInterceptors()

  return (
    <BrowserRouter>
      <DashContextProvider>
        <AppContent />
      </DashContextProvider>
    </BrowserRouter>
  )
}

export default App
