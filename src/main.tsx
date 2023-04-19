import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './styles/index.css'

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <Router>
    <App />
  </Router>
);
