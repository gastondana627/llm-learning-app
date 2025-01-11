import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Canvas from './pages/Canvas';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthProvider from './context/AuthContext';

function App() {
    return (
      <AuthProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/canvas/:spaceId" element={<Canvas />} />
            <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
    );
}

export default App;