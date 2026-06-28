import React, { useState, useEffect } from 'react';

const scriptScenes = [
  { 
    id: 1, 
    title: "Cena 1: Oportunidades",
    text: "No Brasil, ter uma pendência no CAR não é só um risco de multa, é deixar dinheiro na mesa! Hoje, produtores perdem acesso a crédito verde e Pagamentos por Serviços Ambientais (PSA) simplesmente por não entenderem a burocracia ambiental. Por isso criamos o CAR em Dia, uma solução inovadora projetada para rodar nativamente dentro do sistema oficial do Governo, o SICAR. Nós gamificamos as regras complexas. O produtor entende exatamente o que falta para atingir a Nota 100 de conformidade.", 
    duration: 23000 
  },
  { 
    id: 2, 
    title: "Cena 2: Multi-Canal",
    text: "E para resolver as pendências, a nossa jornada não começa num portal complicado, começa onde o produtor está! O Governo envia a notificação pelo canal de preferência dele: SMS, Telegram ou WhatsApp. E a mensagem já vem com um link de acesso imediato, sem necessidade de logins difíceis.", 
    duration: 23000 
  },
  { 
    id: 3, 
    title: "Cena 3: A Realidade",
    text: "Ao clicar, ele cai na tela oficial de Análise do SICAR. Aquele monte de termo técnico assusta. Mas é aí que a nossa mágica acontece: adicionamos o botão 'Tradutor Ambiental', que pega esse documento oficial e descomplica na hora!", 
    duration: 10000 
  },
  { 
    id: 4, 
    title: "Cena 4: O Tradutor",
    text: "O relatório governamental vira linguagem de campo! Com ilustrações claras e mapas interativos e fáceis de ler, o produtor entende exatamente onde está o erro na sua propriedade e como a retificação vai acontecer.", 
    duration: 20000 
  },
  { 
    id: 5, 
    title: "Cena 5: A Retificação",
    text: "E para resolver? Ele não precisa contratar um consultor caro! Nós aproveitamos o Módulo de Retificação que já existe no Governo, mas com o produtor já empoderado pela tradução! Basta revisar, aceitar a sugestão automática do sistema, assinar eletronicamente e pronto!", 
    duration: 17000 
  },
  { 
    id: 6, 
    title: "Cena 6: Recompensa",
    text: "O cadastro é atualizado na hora! A nota de conformidade sobe para o nível máximo, e ele desbloqueia instantaneamente as oportunidades de PSA que estavam travadas. CAR em Dia: O compliance ambiental descomplicado e recompensador!", 
    duration: 22000 
  }
];

const Teleprompter = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'demo_start') {
        startTeleprompter();
      }
      if (e.key === 'demo_scene') {
        const sceneNum = parseInt(e.newValue.split('-')[0], 10);
        setCurrentSceneIndex(sceneNum - 1);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const startTeleprompter = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setCurrentSceneIndex(0);
      setIsPlaying(true);
    }, 100);
  };

  const renderSceneText = () => {
    if (currentSceneIndex >= scriptScenes.length) {
      return <h1 style={{ color: '#27ae60', fontSize: '2.5rem', textAlign: 'center' }}>Fim da Apresentação! 🏆</h1>;
    }

    const scene = scriptScenes[currentSceneIndex];

    return (
      <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        <style>
          {`
            @keyframes smoothFadeIn {
              from { opacity: 0; transform: translateY(15px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
        <h2 style={{ color: '#999', fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
          {scene.title}
        </h2>
        <div 
          key={currentSceneIndex} 
          style={{ 
            fontSize: '2.4rem', 
            lineHeight: '1.5', 
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'left',
            animation: 'smoothFadeIn 0.8s ease-out forwards'
          }}
        >
          {scene.text}
        </div>
      </div>
    );
  };

  return (
    <div style={{ 
      backgroundColor: '#111', 
      minHeight: '100vh', 
      width: '100vw',
      color: 'white', 
      display: 'flex', 
      flexDirection: 'column'
    }}>
      <div style={{ padding: '20px', backgroundColor: '#000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#27ae60', margin: 0, fontSize: '1.5rem' }}>CAR em Dia - Teleprompter</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          {!isPlaying && (
            <div style={{ color: '#aaa', fontStyle: 'italic', display: 'flex', alignItems: 'center', marginRight: '20px' }}>
              Aguardando início na outra aba...
            </div>
          )}
          <button 
            onClick={startTeleprompter}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#3498db', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '1rem', 
              fontWeight: 'bold', 
              cursor: 'pointer' 
            }}
          >
            Forçar Início Manual
          </button>
        </div>
      </div>
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {renderSceneText()}
      </div>
      
      <div style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        height: '5px', 
        backgroundColor: '#27ae60', 
        transition: 'width 1s linear',
        width: isPlaying && currentSceneIndex < scriptScenes.length 
          ? `${((currentSceneIndex) / scriptScenes.length) * 100}%` 
          : '100%'
      }}></div>
    </div>
  );
};

export default Teleprompter;
