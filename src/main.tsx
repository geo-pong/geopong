import {createRoot } from 'react-dom/client'
import { AuthProvider } from './components/AuthProvider'
import App from './App'
import './styles/index.css'

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <AuthProvider>
      <App />
  </AuthProvider>
);
