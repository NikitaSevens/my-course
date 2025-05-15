import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider> {/* ✅ оборачиваем всё */}
      <App />
    </CartProvider>
  </StrictMode>,
)
