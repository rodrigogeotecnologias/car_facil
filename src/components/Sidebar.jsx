import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Mail, FileText, CheckSquare, Users, Leaf, X, Send, Wand2, ArrowRightLeft } from 'lucide-react'

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || (path === '/' && location.pathname === '/dashboard');
  }

  return (
    <div className="sicar-sidebar">
      <div className="sicar-sidebar-header" style={{ display: 'flex', justifyContent: 'center' }}>
        <img src="/logo_car.png" alt="SICAR" style={{ maxHeight: '55px', width: 'auto', mixBlendMode: 'multiply' }} />
      </div>
      
      <div className="sicar-sidebar-menu">
        <Link to="#" className="sicar-sidebar-item">
          <Home size={20} />
          Página Inicial
        </Link>
        
        <Link to="/mensagens" className={`sicar-sidebar-item ${isActive('/mensagens') ? 'active' : ''}`}>
          <Mail size={20} />
          <span>Central de Mensagens</span>
          <span style={{ backgroundColor: '#e74c3c', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto' }}>1</span>
        </Link>

        <Link to="#" className="sicar-sidebar-item">
          <ArrowRightLeft size={20} />
          Retificação
        </Link>

        <Link to="#" className="sicar-sidebar-item">
          <CheckSquare size={20} />
          Análise
        </Link>

        <Link to="/dashboard" className={`sicar-sidebar-item ${isActive('/dashboard') ? 'active' : ''}`}>
          <Wand2 size={20} />
          Tradutor
        </Link>

        <Link to="/oportunidades" className={`sicar-sidebar-item ${isActive('/oportunidades') ? 'active' : ''}`}>
          <Leaf size={20} />
          Oportunidades
        </Link>

        <Link to="#" className="sicar-sidebar-item">
          <Users size={20} />
          Gerenciar Vínculos
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
