import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf, Bell, X, Send } from 'lucide-react'

const Header = () => {
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <Leaf className="logo-icon" size={28} />
            <span>CAR Fácil</span>
          </Link>
          <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/" className="btn btn-outline" style={{ border: 'none' }}>Início</Link>
            <Link to="/tutoriais" className="btn btn-outline" style={{ border: 'none' }}>Tutoriais</Link>
            <Link to="/oportunidades" className="btn btn-outline" style={{ border: 'none', color: 'var(--success)' }}>💸 Oportunidades</Link>
            
            {/* Central de Comunicação (Sininho) */}
            <button 
              onClick={() => setWhatsappOpen(true)} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', color: '#555' }}
              title="Central de Comunicação (Avisos do Governo)"
            >
              <Bell size={24} />
              <span style={{ position: 'absolute', top: '0px', right: '0px', backgroundColor: 'var(--danger)', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
            </button>

            <Link to="/consulta" className="btn btn-outline">Consultar Situação</Link>
            <Link to="/cadastro" className="btn btn-primary">Novo Cadastro</Link>
          </nav>
        </div>
      </header>

      {/* WhatsApp Modal Simulation (Central de Comunicação) */}
      {whatsappOpen && (
        <div style={{ position: 'absolute', top: '80px', right: '5%', zIndex: 2000 }}>
          <div className="animate-fade-in" style={{ width: '360px', height: '550px', backgroundColor: '#efeae2', borderRadius: '12px', border: '1px solid #ddd', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
            {/* Top Bar WhatsApp */}
            <div style={{ backgroundColor: '#075e54', color: 'white', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#075e54' }}>
                <Leaf size={24} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem' }}>Governo - CAR Fácil</strong>
                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Central de Comunicação</span>
              </div>
              <button onClick={() => setWhatsappOpen(false)} style={{ background: 'none', border: 'none', color: 'white', marginLeft: 'auto', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            
            {/* Chat Content */}
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: 'calc(100% - 140px)', overflowY: 'auto' }}>
              <div style={{ alignSelf: 'center', backgroundColor: '#e1f5fe', padding: '0.25rem 0.75rem', borderRadius: '10px', fontSize: '0.8rem', color: '#555' }}>
                Hoje
              </div>
              <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0 15px 15px 15px', maxWidth: '90%', alignSelf: 'flex-start', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                <p style={{ margin: '0 0 0.5rem 0' }}>Olá, Seu Raimundo! 👋</p>
                <p style={{ margin: '0 0 0.5rem 0' }}>A nossa **Análise Dinamizada** concluiu a verificação do CAR da sua fazenda (*Fazenda haCARthon*).</p>
                <p style={{ margin: '0 0 0.5rem 0' }}>⚠️ Identificamos uma pendência na sua Área de Preservação Permanente (APP).</p>
                <p style={{ margin: 0, fontWeight: 'bold' }}>Mas não se preocupe! Você tem um prazo para atendimento até 08/01/2027. Acesse nosso Tradutor Ambiental para entender isso de forma simples e evitar multas:</p>
                <a href="#" onClick={(e) => { e.preventDefault(); setWhatsappOpen(false); navigate('/tradutor/pendencias'); }} style={{ display: 'block', marginTop: '0.5rem', wordBreak: 'break-all', color: '#3498db' }}>https://car-facil.gov.br/tradutor/pendencias</a>
                <div style={{ fontSize: '0.7rem', color: '#999', textAlign: 'right', marginTop: '0.5rem' }}>08:30</div>
              </div>

              <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0 15px 15px 15px', maxWidth: '90%', alignSelf: 'flex-start', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                <p style={{ margin: '0 0 0.5rem 0' }}>🌲 **Notificação Oficial**</p>
                <p style={{ margin: '0 0 0.5rem 0' }}>O sistema identificou áreas desmatadas na sua propriedade que precisam de regularização (Adesão ao PRA).</p>
                <p style={{ margin: 0, fontWeight: 'bold' }}>Clique no link abaixo para conhecer as opções disponíveis de forma simplificada:</p>
                <a href="#" onClick={(e) => { e.preventDefault(); setWhatsappOpen(false); navigate('/tradutor/regularizacao'); }} style={{ display: 'block', marginTop: '0.5rem', wordBreak: 'break-all', color: '#3498db' }}>https://car-facil.gov.br/tradutor/regularizacao</a>
                <div style={{ fontSize: '0.7rem', color: '#999', textAlign: 'right', marginTop: '0.5rem' }}>09:15</div>
              </div>
            </div>

            {/* Input Mock */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#f0f0f0', padding: '10px', display: 'flex', gap: '10px' }}>
              <div style={{ backgroundColor: 'white', flex: 1, borderRadius: '20px', padding: '10px', color: '#999', fontSize: '0.9rem' }}>Mensagem...</div>
              <div style={{ backgroundColor: '#00897b', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Send size={18} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
