import React from 'react';
import { Lock, Unlock, TrendingUp, DollarSign, Sprout, AlertCircle, ArrowRight } from 'lucide-react';
import { mockProperty } from '../mockData/propertyData';
import { Link } from 'react-router-dom';

const Oportunidades = () => {
  const nota = mockProperty.indiceRegularidade;
  const isRegular = nota === 100;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      <div className="card text-center" style={{ marginBottom: '2rem', backgroundColor: 'var(--primary)', color: 'white' }}>
        <h1 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <TrendingUp size={32} /> Painel de Oportunidades
        </h1>
        <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>
          Descubra como o seu Cadastro Ambiental Rural (CAR) pode gerar dinheiro e benefícios para a sua propriedade.
        </p>
      </div>

      <div className="dashboard-grid">
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
              <div style={{ color: 'var(--warning)', backgroundColor: '#fff3cd', padding: '1rem', borderRadius: 'var(--radius)', marginTop: '1rem', textAlign: 'left' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <AlertCircle size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Quase lá!</strong> Você está a apenas {100 - nota} pontos de liberar benefícios financeiros incríveis.
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#666' }}>Falta apenas resolver a sobreposição de APP identificada na sua área.</p>
                  </div>
                </div>
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <Link to="/dashboard" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Resolver Pendências <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lado Direito: Cards de Benefícios (Gamificados) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Card 1: Crédito Rural (Pronaf) */}
          <div className="card" style={{ position: 'relative', overflow: 'hidden', opacity: isRegular ? 1 : 0.7, transition: '0.3s' }}>
            {!isRegular && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.8)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
                <Lock size={48} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
                <strong style={{ color: 'var(--text-muted)' }}>Desbloqueie ao atingir 100 pontos</strong>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ backgroundColor: 'rgba(52, 152, 219, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                <DollarSign size={32} color="#3498db" />
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>Crédito Rural (PRONAF)</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  Tenha acesso a linhas de financiamento com as menores taxas de juros do mercado para investir em maquinário e custeio.
                </p>
                {isRegular && <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Solicitar Linha de Crédito</button>}
              </div>
            </div>
          </div>

          {/* Card 2: Cotas de Reserva Ambiental (CRA) */}
          <div className="card" style={{ position: 'relative', overflow: 'hidden', opacity: isRegular ? 1 : 0.7, transition: '0.3s' }}>
            {!isRegular && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.8)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
                <Lock size={48} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
                <strong style={{ color: 'var(--text-muted)' }}>Desbloqueie ao atingir 100 pontos</strong>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ backgroundColor: 'rgba(46, 204, 113, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                <Sprout size={32} color="var(--success)" />
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>Venda de Cotas (CRA)</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  Você tem excedente de floresta nativa? Venda Cotas de Reserva Ambiental (CRA) para outros produtores e gere renda extra sem precisar plantar.
                </p>
                {isRegular && <button className="btn btn-primary" style={{ marginTop: '1rem', backgroundColor: 'var(--success)' }}>Simular Ganhos com CRA</button>}
              </div>
            </div>
          </div>

          {/* Card 3: Pagamento por Serviços Ambientais (PSA) */}
          <div className="card" style={{ position: 'relative', overflow: 'hidden', opacity: isRegular ? 1 : 0.7, transition: '0.3s' }}>
            {!isRegular && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.8)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
                <Lock size={48} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
                <strong style={{ color: 'var(--text-muted)' }}>Desbloqueie ao atingir 100 pontos</strong>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ backgroundColor: 'rgba(155, 89, 182, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                <Unlock size={32} color="#9b59b6" />
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>Pagamento por Serviços Ambientais</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  Receba dinheiro do governo ou de ONGs por proteger nascentes e conservar a biodiversidade da sua propriedade.
                </p>
                {isRegular && <button className="btn btn-primary" style={{ marginTop: '1rem', backgroundColor: '#9b59b6' }}>Inscrever no Edital</button>}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Oportunidades;
