import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './layout.css'
import Sidebar from './components/Sidebar'
import SicarHeader from './components/SicarHeader'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
import Consulta from './pages/Consulta'
import Dashboard from './pages/Dashboard'
import CentralMensagens from './pages/CentralMensagens'
import Tutoriais from './pages/Tutoriais'
import Oportunidades from './pages/Oportunidades'

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="sicar-main-content">
          <SicarHeader />
          <div className="sicar-content-container">
            <Routes>
              <Route path="/" element={<Navigate to="/mensagens" replace />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/consulta" element={<Consulta />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mensagens" element={<CentralMensagens />} />
              <Route path="/tutoriais" element={<Tutoriais />} />
              <Route path="/oportunidades" element={<Oportunidades />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
