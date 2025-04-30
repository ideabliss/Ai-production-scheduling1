// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import './App.css'

import AppRoutes from './approutes/AppRoutes'; 

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;


