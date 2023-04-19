import { Route, Routes } from 'react-router-dom';

import Pong from './components/Pong'
import Login from './components/Login'
import './styles/App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Pong" element={<Pong />} />
    </Routes>
  )
}

export default App
