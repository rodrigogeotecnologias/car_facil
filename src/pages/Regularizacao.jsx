import React, { useState } from 'react';
import { Leaf, Info, MessageSquare, X, Send, ChevronRight, CheckCircle, Trees } from 'lucide-react';
import SicarPageHeader from '../components/SicarPageHeader';
import { mockProperty } from '../mockData/propertyData';

const Regularizacao = () => {
  const [selectedOpcao, setSelectedOpcao] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState('form');
  const [motherName, setMotherName] = useState('');

  const handleConfirmPra = () => {
    if (!motherName) {
      alert("Por favor, preencha o Nome da mãe para assinar o termo.");
      return;
    }
    setModalState('processing');
    setTimeout(() => {
      setModalState('success');
    }, 2500);
  };

  // Exemplo de opções de PRA
  const opcoesPra = [
    {
      id: 'cra',
      tituloLegal: 'Adesão à Cota de Reserva Ambiental (CRA)',
      tituloSimples: 'Aluguel de Floresta Preservada',
      descricao: 'Você compra ou aluga um título de uma área florestal preservada em outra propriedade do mesmo estado para compensar o desmatamento na sua.',
      vantagens: ['Não perde área produtiva (pasto/lavoura)', 'Regularização imediata no sistema'],
      desvantagens: ['Custo financeiro para pagar o aluguel anual'],
      status: 'success'
    },
    {
      id: 'regeneracao',
      tituloLegal: 'Regeneração Natural da Vegetação Nativa',
      tituloSimples: 'Isolar a área (Deixar a natureza agir)',
      descricao: 'Consiste em cercar a área desmatada e impedir a entrada de gado ou fogo, deixando que as sementes que já estão na terra brotem sozinhas.',
      vantagens: ['Muito barato', 'Menos esforço de manejo'],
      desvantagens: ['Demora anos para a área ficar regular', 'Perda da área para a produção agrícola'],
      status: 'warning'
    },
    {
      id: 'plantio',
      tituloLegal: 'Recomposição por Plantio de Espécies Nativas',
      tituloSimples: 'Plantio de Mudas Tradicional',
      descricao: 'Você deverá comprar mudas de árvores nativas da região e plantá-las na área degradada, cuidando até que a floresta se forme.',
      vantagens: ['Recuperação visual rápida da fazenda'],
      desvantagens: ['Alto custo de mão-de-obra e compra de mudas', 'Risco de mortalidade das plantas'],
      status: 'warning'
    },
    {
      id: 'saf',
      tituloLegal: 'Sistema Agroflorestal (SAF)',
      tituloSimples: 'Cultivo Misto (Plantação com Árvores)',
      descricao: 'Permite misturar o plantio de árvores nativas com lavouras rentáveis (ex: cacau, café, palmito, açaí), unindo produção com preservação.',
      vantagens: ['Gera renda enquanto recupera a floresta'],
      desvantagens: ['Manejo complexo, exige conhecimento técnico especial'],
      status: 'success'
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <SicarPageHeader />

      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Opções de Regularização Ambiental (PRA)</h2>
          <p style={{ color: 'var(--text-muted)' }}>O seu imóvel possui áreas desmatadas. Escolha como deseja resolver essa pendência perante a Lei Ambiental.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem' }}>
        {/* Lado Esquerdo: Lista de Opções */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {opcoesPra.map(opcao => (
            <div 
              key={opcao.id}
              className="card"
              style={{ 
                cursor: 'pointer',
                borderLeft: `5px solid var(--${opcao.status})`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                transform: selectedOpcao?.id === opcao.id ? 'scale(1.02)' : 'scale(1)',
                boxShadow: selectedOpcao?.id === opcao.id ? 'var(--shadow-md)' : 'var(--shadow-sm)'
              }}
              onClick={() => setSelectedOpcao(opcao)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem', textTransform: 'uppercase' }}>
                    Termo no Governo: <strong>{opcao.tituloLegal}</strong>
                  </p>
                  <h3 style={{ color: 'var(--primary)', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Trees size={24} />
                    {opcao.tituloSimples}
                  </h3>
                  <p style={{ margin: 0, color: '#444' }}>{opcao.descricao}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)', paddingLeft: '1rem' }}>
                  <ChevronRight size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lado Direito: Detalhamento da Opção */}
        <div>
          {selectedOpcao ? (
            <div className="card animate-fade-in" style={{ borderTop: `5px solid var(--${selectedOpcao.status})`, position: 'sticky', top: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: 'var(--text-dark)' }}>Detalhes da Escolha</h3>
                <button className="btn btn-outline" style={{ padding: '2px 8px' }} onClick={() => setSelectedOpcao(null)}>Fechar</button>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle size={18} /> Vantagens</h4>
                <ul style={{ paddingLeft: '1.5rem', margin: 0, color: 'var(--text-muted)' }}>
                  {selectedOpcao.vantagens.map((v, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{v}</li>)}
                </ul>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--danger)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '5px' }}><Info size={18} /> Desvantagens / Desafios</h4>
                <ul style={{ paddingLeft: '1.5rem', margin: 0, color: 'var(--text-muted)' }}>
                  {selectedOpcao.desvantagens.map((d, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{d}</li>)}
                </ul>
              </div>

              <button 
                onClick={() => { setIsModalOpen(true); setModalState('form'); setMotherName(''); }}
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '1rem', backgroundColor: '#128242' }}
              >
                Escolher esta opção e assinar termo do PRA
              </button>
            </div>
          ) : (
            <div className="card text-center animate-fade-in" style={{ padding: '2rem 1rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-color)', position: 'sticky', top: '20px' }}>
              <Trees size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p>Clique em uma das opções de regularização ao lado para ver as vantagens, desvantagens e selecionar a melhor para a sua fazenda.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Botão do Chat Assistente (Cópia simplificada) */}
      <button 
        className="btn btn-primary"
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', borderRadius: '50px', width: '60px', height: '60px', padding: 0, boxShadow: 'var(--shadow-lg)', zIndex: 1000 }}
        onClick={() => setChatOpen(!chatOpen)}
      >
        {chatOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* Janela de Chat (Mock) */}
      {chatOpen && (
        <div className="card" style={{ position: 'fixed', bottom: '6rem', right: '2rem', width: '350px', height: '500px', display: 'flex', flexDirection: 'column', padding: 0, boxShadow: 'var(--shadow-lg)', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Leaf size={20} />
            <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>Assistente Ambiental</h3>
          </div>
          <div style={{ flex: 1, padding: '1rem', backgroundColor: 'var(--bg-color)', overflowY: 'auto' }}>
            <div style={{ backgroundColor: 'white', padding: '0.75rem', borderRadius: '1rem', borderBottomLeftRadius: 0, boxShadow: 'var(--shadow-sm)', fontSize: '0.9rem', marginBottom: '1rem', maxWidth: '80%' }}>
              Olá! Qual opção de plantio você gostaria de entender melhor? Posso te ajudar a calcular o custo de uma cota de reserva (CRA).
            </div>
          </div>
          <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', backgroundColor: 'white', borderBottomLeftRadius: 'var(--radius-lg)', borderBottomRightRadius: 'var(--radius-lg)', display: 'flex', gap: '0.5rem' }}>
            <input type="text" className="form-control" placeholder="Digite..." style={{ padding: '0.5rem' }} />
            <button className="btn btn-primary" style={{ padding: '0.5rem' }}><Send size={18} /></button>
          </div>
        </div>
      )}

      {/* SICAR Modal Simulation - PRA */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
          <div className="card animate-fade-in" style={{ width: '500px', backgroundColor: 'white', borderRadius: '8px', padding: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #ddd' }}>
              <h3 style={{ margin: 0, color: '#333' }}>Adesão ao PRA</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="#666" /></button>
            </div>
            
            <div style={{ padding: '1.5rem' }}>
              {modalState === 'form' && (
                <>
                  <p style={{ marginBottom: '1rem', color: '#555', fontSize: '0.9rem' }}>
                    Para formalizar sua adesão ao Programa de Regularização Ambiental na modalidade <strong>{selectedOpcao?.tituloLegal}</strong>, confirme seus dados.
                  </p>
                  
                  <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '1rem', backgroundColor: '#f9f9f9' }}>
                    <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#333' }}>Dados do cadastrante</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>CPF</label>
                        <input type="text" className="form-control" value="452.203.010-04" disabled style={{ backgroundColor: '#eee', color: '#999' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>Nome</label>
                        <input type="text" className="form-control" value="Raimundo Nonato" disabled style={{ backgroundColor: '#eee', color: '#999' }} />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>Data de Nascimento</label>
                        <input type="text" className="form-control" value="12/05/1968" disabled style={{ backgroundColor: '#eee', color: '#999' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>Nome da mãe <span style={{ color: 'red' }}>*</span></label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Nome da mãe do cadastrante" 
                          value={motherName}
                          onChange={(e) => setMotherName(e.target.value)}
                          style={{ border: '1px solid #d9534f' }} 
                        />
                        <span style={{ fontSize: '0.7rem', color: '#d9534f' }}>Este campo é obrigatório</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <button onClick={handleConfirmPra} className="btn btn-primary" style={{ backgroundColor: '#128242', padding: '0.5rem 2rem' }}>
                      ✓ Assinar Termo do PRA
                    </button>
                  </div>
                </>
              )}

              {modalState === 'processing' && (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '1rem' }}>
                    <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem', border: '0.25em solid #128242', borderRightColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                  </div>
                  <h3 style={{ color: '#333' }}>Gerando Termo de Adesão</h3>
                  <p style={{ color: '#666', fontSize: '0.85rem' }}>Aguarde enquanto geramos o protocolo de adesão ao PRA no SICAR.</p>
                </div>
              )}

              {modalState === 'success' && (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ width: '60px', height: '60px', backgroundColor: '#4caf50', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <CheckCircle size={40} color="white" />
                  </div>
                  <h3 style={{ color: '#333' }}>Adesão Concluída!</h3>
                  <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Você aderiu com sucesso ao PRA. O protocolo e os próximos passos foram enviados para a Central de Mensagens.</p>
                  <button onClick={() => { setIsModalOpen(false); setSelectedOpcao(null); }} className="btn btn-primary" style={{ backgroundColor: '#128242', padding: '0.5rem 2rem' }}>
                    ✓ Ok
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Regularizacao;
