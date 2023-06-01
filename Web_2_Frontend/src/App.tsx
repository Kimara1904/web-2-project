import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { configureAxiosRequestInterceptors } from './services/ServiceConfig'
import AppContent from './AppContent'
import { DashContextProvider } from './store/dashboard-context'

function App() {
  configureAxiosRequestInterceptors()

  return (
    <BrowserRouter>
      <DashContextProvider>
        <GoogleOAuthProvider clientId='1060180117045-3epcaoih3vu0roaqg8ollocu0lbarodf.apps.googleusercontent.com'>
          <AppContent />
        </GoogleOAuthProvider>
      </DashContextProvider>
    </BrowserRouter>
  )
}

export default App
