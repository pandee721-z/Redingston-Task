import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Backlog from './pages/Backlog'
import NewLayout from './layout/DashboardLayout'
import { ViewProvider } from './context/ViewContext';
import { PrimeReactProvider } from 'primereact/api';


import 'primeicons/primeicons.css';


const App = () => {
  return (
    <PrimeReactProvider>
      <ViewProvider>
        <Router>
          <Routes>
            <Route path="/" element={<NewLayout />} />
          </Routes>
        </Router>
      </ViewProvider>
    </PrimeReactProvider>
  )
}

export default App;
