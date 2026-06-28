import React, { useState } from 'react';
import { Lock, Unlock, TrendingUp, DollarSign, Sprout, AlertCircle, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { mockProperty, appState } from '../mockData/propertyData';
import { Link } from 'react-router-dom';

const Oportunidades = () => {
  const [activeTab, setActiveTab] = useState('painel');
  const [showApoioModal, setShowApoioModal] = useState(false);
  const [apoioSuccess, setApoioSuccess] = useState(false);
  const nota = appState.nota;
  const isRegular = nota === 100;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      <div className="card text-center" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--primary)', color: 'white' }}>
        <h1 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <TrendingUp size={32} /> Painel de Oportunidades
        </h1>
        <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>
          Descubra como o seu Cadastro Ambiental Rural (CAR) pode gerar dinheiro e benefícios para a sua propriedade.
        </p>
      </div>

      {/* Tabs de Navegação */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '0px' }}>
        <button 
          onClick={() => setActiveTab('painel')}
          style={{ 
            background: 'none', border: 'none', padding: '10px 5px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer',
            color: activeTab === 'painel' ? 'var(--primary)' : '#999',
            borderBottom: activeTab === 'painel' ? '3px solid var(--primary)' : '3px solid transparent',
            marginBottom: '-2px', transition: '0.3s'
          }}
        >
          Recompensas e Benefícios
        </button>
        <button 
          onClick={() => setActiveTab('regras')}
          style={{ 
            background: 'none', border: 'none', padding: '10px 5px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer',
            color: activeTab === 'regras' ? 'var(--primary)' : '#999',
            borderBottom: activeTab === 'regras' ? '3px solid var(--primary)' : '3px solid transparent',
            marginBottom: '-2px', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '6px'
          }}
        >
          <Info size={18} /> Como funciona a Pontuação?
        </button>
      </div>

      {activeTab === 'painel' && (
        <div className="dashboard-grid animate-fade-in">
          {/* Lado Esquerdo: Status Atual */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card text-center">
              <h3 style={{ marginTop: 0 }}>Seu Nível de Regularidade</h3>
              <div style={{ position: 'relative', width: '150px', height: '150px', margin: '1rem auto' }}>
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={isRegular ? "var(--success)" : "var(--warning)"}
                    strokeWidth="3"
                    strokeDasharray={`${nota}, 100`}
                  />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2rem', fontWeight: 'bold', color: isRegular ? 'var(--success)' : 'var(--warning)' }}>
                  {nota}
                </div>
              </div>
              
              {isRegular ? (
                <div style={{ color: 'var(--success)', backgroundColor: '#d4edda', padding: '1rem', borderRadius: 'var(--radius)', marginTop: '1rem' }}>
                  <strong>Parabéns!</strong> Sua propriedade está 100% regularizada. Todos os benefícios estão liberados!
                </div>
              ) : (
                <div style={{ color: '#856404', backgroundColor: '#fff3cd', padding: '1rem', borderRadius: 'var(--radius)', marginTop: '1rem', textAlign: 'left', border: '1px solid #ffeeba' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <AlertCircle size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong>Quase lá!</strong> Você está quase pronto para aproveitar oportunidades de gerar renda extra com o seu imóvel.
                      <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#856404' }}>Falta apenas resolver a divergência de APP identificada na sua área.</p>
                    </div>
                  </div>
                  <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <Link to="/tradutor/pendencias" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      Entender pendências <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lado Direito: Cards de Benefícios (Gamificados) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Card 1: Crédito Rural (Pronaf) - SEMPRE LIBERADO (Basta ter CAR ativo) */}
            <div className="card" style={{ position: 'relative', overflow: 'hidden', opacity: 1, transition: '0.3s', border: 'none', backgroundColor: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
                  <div style={{ backgroundColor: 'rgba(52, 152, 219, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                    <DollarSign size={32} color="#3498db" />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: 'inherit' }}>Crédito Rural (PRONAF)</h3>
                      <span style={{ backgroundColor: '#e1f5fe', color: '#0288d1', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>CAR Ativo</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>
                      O seu CAR cumpre o requisito ambiental básico! Verifique os demais critérios do Manual de Crédito Rural (ausência de embargos Ibama, terras indígenas, etc.) no portal <strong>Meu Imóvel Rural</strong> para solicitar seu financiamento.
                    </p>
                    <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Consultar Meu Imóvel Rural</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Cotas de Reserva Ambiental (CRA) */}
            <div className="card" style={{ position: 'relative', overflow: 'hidden', opacity: isRegular ? 1 : 0.8, transition: '0.3s', border: isRegular ? 'none' : '1px solid #ddd', backgroundColor: isRegular ? 'white' : '#fcfcfc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
                  <div style={{ backgroundColor: isRegular ? 'rgba(46, 204, 113, 0.1)' : '#eee', padding: '1rem', borderRadius: '50%' }}>
                    <Sprout size={32} color={isRegular ? "var(--success)" : "#999"} />
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: isRegular ? 'inherit' : '#777' }}>Venda de Cotas (CRA)</h3>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                      Você tem excedente de floresta nativa? Venda Cotas de Reserva Ambiental (CRA) para outros produtores e gere renda extra sem precisar plantar.
                    </p>
                    {isRegular && <button className="btn btn-primary" style={{ marginTop: '1rem', backgroundColor: 'var(--success)' }}>Simular Ganhos com CRA</button>}
                  </div>
                </div>
                {!isRegular && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '130px', paddingLeft: '1rem', borderLeft: '1px dashed #ccc' }}>
                    <Lock size={32} color="#999" style={{ marginBottom: '0.5rem' }} />
                    <strong style={{ color: '#999', fontSize: '0.8rem', textAlign: 'center' }}>Desbloqueie ao<br/>atingir 100 pontos</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Card 3: Pagamento por Serviços Ambientais (PSA) */}
            <div className="card" style={{ position: 'relative', overflow: 'hidden', opacity: isRegular ? 1 : 0.8, transition: '0.3s', border: isRegular ? 'none' : '1px solid #ddd', backgroundColor: isRegular ? 'white' : '#fcfcfc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
                  <div style={{ backgroundColor: isRegular ? 'rgba(155, 89, 182, 0.1)' : '#eee', padding: '1rem', borderRadius: '50%' }}>
                    <Unlock size={32} color={isRegular ? "#9b59b6" : "#999"} />
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: isRegular ? 'inherit' : '#777' }}>Pagamento por Serviços Ambientais (PSA)</h3>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>
                      {isRegular 
                        ? "O seu imóvel já está em conformidade com a Lei nº 14.119/2021 e com o Decreto nº 13.018. Isso significa que você já pode consultar os editais disponíveis (como o Floresta+ Amazônia) e verificar em quais deles as características da sua propriedade se encaixam."
                        : "Ao atingir 100 pontos, seu imóvel estará em conformidade com a Lei nº 14.119/2021 e com o Decreto nº 13.018. Isso significa que você poderá consultar os editais disponíveis (como o Floresta+ Amazônia) e verificar em quais deles as características da sua propriedade se encaixam."
                      }
                    </p>
                    {isRegular && (
                      <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                        <button className="btn btn-primary" style={{ backgroundColor: '#9b59b6' }}>Consultar Editais</button>
                        <button 
                          className="btn btn-secondary" 
                          style={{ border: '2px solid #9b59b6', color: '#9b59b6', backgroundColor: 'transparent' }} 
                          onClick={() => setShowApoioModal(true)}
                        >
                          Apoio Técnico
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {!isRegular && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '130px', paddingLeft: '1rem', borderLeft: '1px dashed #ccc' }}>
                    <Lock size={32} color="#999" style={{ marginBottom: '0.5rem' }} />
                    <strong style={{ color: '#999', fontSize: '0.8rem', textAlign: 'center' }}>Desbloqueie ao<br/>atingir 100 pontos</strong>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {activeTab === 'regras' && (
        <div className="animate-fade-in card" style={{ padding: '2.5rem' }}>
          <h2 style={{ marginTop: 0, color: '#333', fontSize: '1.5rem' }}>Critérios do Nível de Regularidade (0 a 100)</h2>
          <p style={{ color: '#666', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: '1.5' }}>
            Nossa pontuação <strong>traduz as regras complexas</strong> do Código Florestal e do Manual de Crédito Rural em um sistema de progressão simples e transparente. Veja como os pontos são distribuídos para formar a nota 100:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Regra 1 */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem', backgroundColor: '#f9f9f9', border: '1px solid #eee', borderRadius: '10px' }}>
              <div style={{ backgroundColor: '#e8f5e9', color: 'var(--success)', padding: '1rem', borderRadius: '50%', fontWeight: 'bold', fontSize: '1.2rem', minWidth: '70px', textAlign: 'center', border: '2px solid var(--success)' }}>
                +50
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Cadastro Ativo (Requisito Básico)</h3>
                  <CheckCircle2 size={20} color="var(--success)" style={{ marginBottom: '0.5rem' }} />
                </div>
                <p style={{ margin: 0, color: '#666' }}>O imóvel possui inscrição no SICAR e não se encontra "Cancelado" ou "Suspenso". Esta é a base legal (MCR Seç. 9) exigida para a solicitação primária de <strong>Crédito Rural</strong>.</p>
              </div>
            </div>

            {/* Regra 2 */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem', backgroundColor: '#f9f9f9', border: '1px solid #eee', borderRadius: '10px' }}>
              <div style={{ backgroundColor: '#e8f5e9', color: 'var(--success)', padding: '1rem', borderRadius: '50%', fontWeight: 'bold', fontSize: '1.2rem', minWidth: '70px', textAlign: 'center', border: '2px solid var(--success)' }}>
                +30
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Ausência de Embargos e Restrições</h3>
                  <CheckCircle2 size={20} color="var(--success)" style={{ marginBottom: '0.5rem' }} />
                </div>
                <p style={{ margin: 0, color: '#666' }}>O imóvel passou pela análise cruzada e não possui sobreposições com Terras Indígenas, Unidades de Conservação Públicas, nem embargos ativos no IBAMA por desmatamento.</p>
              </div>
            </div>

            {/* Regra 3 (Pendência Atual) */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem', backgroundColor: '#fff8e1', border: '1px solid #ffe082', borderRadius: '10px', position: 'relative' }}>
              <div style={{ backgroundColor: '#ffe082', color: '#f57f17', padding: '1rem', borderRadius: '50%', fontWeight: 'bold', fontSize: '1.2rem', minWidth: '70px', textAlign: 'center', border: '2px solid #f57f17' }}>
                +20
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Conformidade de APP e Reserva Legal</h3>
                  <span style={{ backgroundColor: '#f57f17', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>SUA PENDÊNCIA</span>
                </div>
                <p style={{ margin: 0, color: '#666' }}>As Áreas de Preservação Permanente (APP) e Reserva Legal (RL) devem estar 100% preservadas ou em recuperação (PRA). Atingir este nível desbloqueia benefícios premium como <strong>CRA e PSA</strong>.</p>
              </div>
            </div>

            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px', borderLeft: '4px solid #999', fontSize: '0.9rem', color: '#555' }}>
              <strong>Nota Técnica:</strong> O Sistema "CAR em Dia" utiliza esta pontuação como uma camada de gamificação e engajamento sobre os dados reais consumidos via API do SICAR.
            </div>

          </div>
        </div>
      )}

      {/* Modal de Apoio Técnico */}
      {showApoioModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card animate-fade-in" style={{ width: '90%', maxWidth: '500px', backgroundColor: 'white', position: 'relative' }}>
            {!apoioSuccess ? (
              <>
                <button 
                  onClick={() => setShowApoioModal(false)}
                  style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                >
                  ✕
                </button>
                <h3 style={{ marginTop: 0, color: '#333' }}>Apoio Técnico (SENAR/EMATER)</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Nossos parceiros entrarão em contato para auxiliar gratuitamente na submissão da sua propriedade em editais de Pagamento por Serviços Ambientais.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem' }}>Celular / WhatsApp</label>
                    <input type="text" placeholder="(DD) 99999-9999" className="form-input" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '0.85rem', color: '#555' }}>
                      <input type="checkbox" style={{ marginTop: '3px' }} />
                      Autorizo o compartilhamento dos dados ambientais do meu CAR com a equipe técnica.
                    </label>
                  </div>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => {
                      setTimeout(() => setApoioSuccess(true), 800);
                    }}
                    style={{ width: '100%', justifyContent: 'center', marginTop: '10px', backgroundColor: '#9b59b6' }}
                  >
                    Enviar Solicitação
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={64} color="var(--success)" style={{ margin: '0 auto', marginBottom: '1rem' }} />
                <h3 style={{ color: 'var(--success)' }}>Solicitação Enviada!</h3>
                <p style={{ color: '#666' }}>Um técnico especialista do SENAR entrará em contato com você em até 48 horas úteis.</p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    setShowApoioModal(false);
                    setApoioSuccess(false);
                  }}
                  style={{ marginTop: '1rem', backgroundColor: '#9b59b6' }}
                >
                  Concluir
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Oportunidades;
