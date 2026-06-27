import React, { useState } from 'react';
import SicarPageHeader from '../components/SicarPageHeader';
import { Mail, MailOpen, Leaf, Send, Check, CheckCheck, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const CentralMensagens = () => {
  const [viewMode, setViewMode] = useState('sicar'); // 'sicar', 'whatsapp', 'telegram', 'sms'

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <SicarPageHeader />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h2 style={{ color: '#333', fontSize: '1.2rem', margin: 0 }}>Mensagens</h2>
        
        {/* Channel Selector (Chave Seletora) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#f9f9f9', padding: '10px 20px', borderRadius: '30px', border: '1px solid #eaeaea' }}>
          <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#555' }}>
            Quero receber comunicação por:
          </span>
          <select 
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            style={{ 
              padding: '8px 15px', 
              borderRadius: '20px', 
              border: '2px solid #27ae60', 
              backgroundColor: 'white', 
              fontSize: '0.9rem',
              fontWeight: 'bold',
              color: '#27ae60',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="sicar">Apenas no Sistema SICAR</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
            <option value="sms">SMS</option>
          </select>
        </div>
      </div>

      {viewMode === 'sicar' ? (
        /* Tabela Padrão SICAR */
        <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
                <th style={{ padding: '12px 15px', width: '50px' }}></th>
                <th style={{ padding: '12px 15px', fontWeight: 'bold', color: '#333' }}>Data</th>
                <th style={{ padding: '12px 15px', fontWeight: 'bold', color: '#333' }}>Hora</th>
                <th style={{ padding: '12px 15px', fontWeight: 'bold', color: '#333' }}>Assunto</th>
              </tr>
            </thead>
            <tbody>

              <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: '#fcfcfc' }}>
                <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                  <div style={{ backgroundColor: '#4caf50', border: '2px solid #4caf50', width: '28px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px' }}>
                    <Mail size={16} color="white" strokeWidth={3} />
                  </div>
                </td>
                <td style={{ padding: '12px 15px', color: '#555' }}>22/07/2026</td>
                <td style={{ padding: '12px 15px', color: '#555' }}>14:56:21</td>
                <td style={{ padding: '12px 15px', color: '#333' }}>Prazo para atendimento da notificação sobre a revisão de dados</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                  <div style={{ backgroundColor: 'white', border: '2px solid #333', width: '28px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px' }}>
                    <MailOpen size={16} color="#333" strokeWidth={3} />
                  </div>
                </td>
                <td style={{ padding: '12px 15px', color: '#555' }}>22/07/2026</td>
                <td style={{ padding: '12px 15px', color: '#555' }}>14:56:19</td>
                <td style={{ padding: '12px 15px', color: '#333' }}>Revisão de dados do CAR</td>
              </tr>
            </tbody>
          </table>
          <div style={{ padding: '15px', display: 'flex', justifyContent: 'center', borderTop: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button style={{ border: '1px solid #ccc', backgroundColor: 'white', padding: '5px 10px', color: '#999', cursor: 'not-allowed' }}>«</button>
              <button style={{ border: '1px solid #ccc', backgroundColor: 'white', padding: '5px 10px', color: '#999', cursor: 'not-allowed' }}>‹</button>
              <button style={{ border: '1px solid #27ae60', backgroundColor: '#e8f5e9', padding: '5px 10px', color: '#27ae60', fontWeight: 'bold' }}>1</button>
              <button style={{ border: '1px solid #ccc', backgroundColor: 'white', padding: '5px 10px', color: '#999', cursor: 'not-allowed' }}>›</button>
              <button style={{ border: '1px solid #ccc', backgroundColor: 'white', padding: '5px 10px', color: '#999', cursor: 'not-allowed' }}>»</button>
            </div>
          </div>
        </div>
      ) : (
        /* Mockup do Celular Multi-Canal */
        <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
          <div style={{ 
            width: '375px', height: '667px', backgroundColor: '#efeae2', 
            borderRadius: '40px', border: '12px solid #333', position: 'relative', 
            overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            display: 'flex', flexDirection: 'column'
          }}>
            {/* Camera Notch */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '25px', backgroundColor: '#333', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', zIndex: 10 }}></div>
            
            {/* Top Bar Adaptativa */}
            <div style={{ 
              backgroundColor: viewMode === 'whatsapp' ? '#075e54' : viewMode === 'telegram' ? '#5682a3' : '#f4f4f4', 
              color: viewMode === 'sms' ? '#333' : 'white', 
              padding: '40px 1rem 10px 1rem', display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 5,
              borderBottom: viewMode === 'sms' ? '1px solid #ddd' : 'none',
              transition: '0.3s'
            }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: viewMode === 'sms' ? '#ddd' : 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: viewMode === 'whatsapp' ? '#075e54' : viewMode === 'telegram' ? '#5682a3' : '#666' }}>
                {viewMode === 'whatsapp' && <Leaf size={24} />}
                {viewMode === 'telegram' && <Send size={20} style={{ transform: 'translateX(-2px)' }} />}
                {viewMode === 'sms' && <Smartphone size={24} />}
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem' }}>
                  CAR em Dia
                </strong>
                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{viewMode === 'sms' ? 'SMS' : 'online'}</span>
              </div>
            </div>
            
            {/* Chat Content */}
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, overflowY: 'auto' }}>
              <div style={{ alignSelf: 'center', backgroundColor: '#e1f5fe', padding: '0.25rem 0.75rem', borderRadius: '10px', fontSize: '0.8rem', color: '#555', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
                22 de Julho de 2026
              </div>
              
              <div className="animate-fade-in" style={{ backgroundColor: 'white', padding: '0.8rem 1rem', borderRadius: '0 15px 15px 15px', maxWidth: '90%', alignSelf: 'flex-start', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', position: 'relative' }}>
                <p style={{ margin: '0 0 0.2rem 0', color: '#333' }}>Olá, Seu Raimundo! 👋</p>
                <p style={{ margin: 0, color: '#333' }}>O SICAR acabou de concluir a <strong>revisão de dados do CAR</strong> da sua fazenda.</p>
                
                <div style={{ fontSize: '0.7rem', color: '#999', textAlign: 'right', marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px' }}>
                  14:56:19 {viewMode !== 'sms' && <CheckCheck size={14} color={viewMode === 'whatsapp' ? "#34b7f1" : "#5682a3"} />}
                </div>
              </div>

              <div className="animate-fade-in" style={{ backgroundColor: 'white', padding: '0.8rem 1rem', borderRadius: '0 15px 15px 15px', maxWidth: '90%', alignSelf: 'flex-start', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', position: 'relative', animationDelay: '0.5s' }}>
                <p style={{ margin: '0 0 0.5rem 0', color: '#333' }}>⚠️ Identificamos uma pendência na sua Área de Preservação Permanente (APP).</p>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>Mas não se preocupe! Você tem um prazo para atendimento até 08/01/2027. Acesse nosso Tradutor Ambiental para resolver isso de forma simples e evitar multas:</p>
                
                <div style={{ backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '10px', marginTop: '10px', borderLeft: '4px solid #128242' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#128242', display: 'block' }}>Central do Proprietário - Tradutor Ambiental</span>
                  <Link to="/tradutor/pendencias" style={{ fontSize: '0.85rem', color: '#3498db', textDecoration: 'none', wordBreak: 'break-all' }}>https://car-em-dia.gov.br/tradutor/pendencias</Link>
                </div>
                
                <div style={{ fontSize: '0.7rem', color: '#999', textAlign: 'right', marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px' }}>
                  14:56:21 {viewMode !== 'sms' && <Check size={14} color="#999" />}
                </div>
              </div>


            </div>

            {/* Input Mock */}
            <div style={{ backgroundColor: '#f0f0f0', padding: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ backgroundColor: 'white', flex: 1, borderRadius: '20px', padding: '10px 15px', color: '#999', fontSize: '0.9rem' }}>
                {viewMode === 'sms' ? 'Mensagem de texto' : 'Mensagem...'}
              </div>
              <div style={{ 
                backgroundColor: viewMode === 'whatsapp' ? '#00897b' : viewMode === 'telegram' ? '#5682a3' : '#ff9800', 
                width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0,
                transition: '0.3s'
              }}>
                <Send size={18} style={{ transform: 'translateX(-2px)' }} />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CentralMensagens;
