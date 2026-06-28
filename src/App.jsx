import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
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
import RetificacaoDinamizada from './pages/RetificacaoDinamizada'
import Analise from './pages/Analise'
import Teleprompter from './pages/Teleprompter'
import DemoAutoPilot from './components/DemoAutoPilot'

function AppContent() {
  const location = useLocation();
  const isTeleprompter = location.pathname === '/teleprompter';

  return (
    <div className={!isTeleprompter ? "app-layout" : ""}>
      {!isTeleprompter && <Sidebar />}
      <main className={!isTeleprompter ? "sicar-main-content" : ""}>
        {!isTeleprompter && <SicarHeader />}
        <div className={!isTeleprompter ? "sicar-content-container" : ""}>
          <Routes>
            <Route path="/" element={<Navigate to="/oportunidades" replace />} />
            <Route path="/teleprompter" element={<Teleprompter />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/consulta" element={<Consulta />} />
            <Route path="/dashboard" element={<Navigate to="/tradutor/pendencias" replace />} />
            <Route path="/tradutor/pendencias" element={<Dashboard />} />
            <Route path="/retificacao" element={<RetificacaoDinamizada />} />
            <Route path="/analise" element={<Analise />} />
            <Route path="/mensagens" element={<CentralMensagens />} />
            <Route path="/tutoriais" element={<Tutoriais />} />
            <Route path="/oportunidades" element={<Oportunidades />} />
          </Routes>
        </div>
        {!isTeleprompter && <DemoAutoPilot />}
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
