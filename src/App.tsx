import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Pong from './components/Pong';
import PrivateRoute from './components/PrivateRoute';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Pong" element={<PrivateRoute />} >
          <Route index element={<Pong />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

