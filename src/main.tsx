import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {AllDisplay} from './App.tsx' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AllDisplay />
  </StrictMode>,
)
