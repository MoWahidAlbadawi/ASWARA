import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// customize mui theme 
import { ThemeProvider } from '@mui/material'
import {theme} from '@/services/theme.ts'
// menu context
import { MenuContextProvider } from './context/MenuContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <MenuContextProvider>
    <App />
    </MenuContextProvider>
    </ThemeProvider>
  </StrictMode>,
)
