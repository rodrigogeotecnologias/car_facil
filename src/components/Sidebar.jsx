import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Mail, FileText, CheckSquare, Users, Leaf, X, Send, Wand2, ArrowRightLeft } from 'lucide-react'
import logoCarEmDia from '../assets/logo_car_em_dia_fixed.png'

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path) && path !== '/';
  }

  return (
    <div className="sicar-sidebar">
      <div className="sicar-sidebar-header" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 10px' }}>
        <img src={logoCarEmDia} alt="CAR em Dia" style={{ height: '55px', maxWidth: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
      </div>
      
      <div className="sicar-sidebar-menu">
        <Link to="#" className="sicar-sidebar-item">
          <Home size={20} />
          Página Inicial
        </Link>
        
        <Link to="/mensagens" className={`sicar-sidebar-item ${location.pathname === '/mensagens' ? 'active' : ''}`} style={{ fontWeight: 'bold' }}>
          <Mail size={20} />
          <span>Central de Mensagens</span>
          <span style={{ backgroundColor: '#e74c3c', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto' }}>1</span>
        </Link>

        <Link to="#" className="sicar-sidebar-item">
          <ArrowRightLeft size={20} />
          Retificação
        </Link>

        <Link to="/analise" className={`sicar-sidebar-item ${location.pathname === '/analise' || location.pathname === '/retificacao' ? 'active' : ''}`} style={{ fontWeight: 'bold' }}>
          <CheckSquare size={20} />
          Análise
        </Link>

        <Link to="/tradutor/pendencias" className={`sicar-sidebar-item ${location.pathname.startsWith('/tradutor') ? 'active' : ''}`} style={{ fontWeight: 'bold' }}>
          <Wand2 size={20} />
          Tradutor Ambiental
        </Link>

        <Link to="/oportunidades" className={`sicar-sidebar-item ${isActive('/oportunidades') ? 'active' : ''}`} style={{ fontWeight: 'bold' }}>
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
