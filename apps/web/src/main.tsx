import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router'
import App from './App'
import { StoreProvider } from './store'
import { aplicarMovimento, lerReduzido } from './lib/movimento'
import './index.css'

aplicarMovimento(lerReduzido())

// VITE_HASH=1 gera a versão publicada como Artifact, que não aceita rotas por endereço.
const Router = import.meta.env.VITE_HASH ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <StoreProvider>
        <App />
      </StoreProvider>
    </Router>
  </StrictMode>,
)
