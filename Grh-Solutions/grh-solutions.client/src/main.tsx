import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ParametrosProvider } from './contexts/useParamether.provider.tsx'

createRoot(document.getElementById('root')!).render(
  <ParametrosProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ParametrosProvider>

)
