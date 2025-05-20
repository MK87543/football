// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Overview from './components/overview.tsx'
import Header from './components/header.tsx'
import Test from './components/test002/real_test.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Header /> 
    <Overview />
    <App />*/}

    <Test />
  </StrictMode>
)
