import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const findElementByText = (tag, text) => {
  const elements = Array.from(document.querySelectorAll(tag));
  const matches = elements.filter(el => el.textContent.toLowerCase().includes(text.toLowerCase()));
  // Ordena pelo tamanho do texto para pegar o elemento mais interno (mais específico)
  matches.sort((a, b) => a.textContent.length - b.textContent.length);
  return matches[0];
};

const DemoAutoPilot = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isClicking, setIsClicking] = useState(false);
  const navigate = useNavigate();

  const moveCursorTo = (x, y) => {
    setCursorPos({ x, y });
  };

  const simulateClick = (element) => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 200);
    if (element) {
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1
      });
      element.dispatchEvent(event);
    }
  };

  const runDemo = async () => {
    // Abre a janela do teleprompter tentando forçar a posição na segunda tela (à direita da tela principal)
    const leftPos = window.screen.width;
    window.open('/teleprompter', 'Teleprompter', `width=1000,height=800,left=${leftPos},top=0,toolbar=no,scrollbars=yes`);

    setIsPlaying(true);
    localStorage.setItem('demo_start', Date.now().toString());
    
    // Garante que o teste começa do zero e no lugar certo
    navigate('/oportunidades');
    window.scrollTo(0, 0); // Garante que começa no topo
    setCursorPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Scroll mais orgânico e cinematográfico usando Easing
    const naturalScroll = async (targetYOffset, duration = 2000) => {
      const startY = window.scrollY;
      const startTime = performance.now();
      return new Promise(resolve => {
        const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const animateScroll = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          window.scrollTo({ top: startY + (targetYOffset * ease(progress)) });
          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          } else {
            setTimeout(resolve, 500);
          }
        };
        requestAnimationFrame(animateScroll);
      });
    };

    const naturalScrollElement = async (elementId, targetYOffset, duration = 2000) => {
      const el = document.getElementById(elementId);
      if (!el) {
        console.warn('Scroll element not found:', elementId);
        return;
      }
      const startY = el.scrollTop;
      const startTime = performance.now();
      return new Promise(resolve => {
        const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const animateScroll = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          el.scrollTop = startY + (targetYOffset * ease(progress));
          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          } else {
            setTimeout(resolve, 500);
          }
        };
        requestAnimationFrame(animateScroll);
      });
    };

    const smoothScrollToElement = async (el) => {
      const rect = el.getBoundingClientRect();
      // Calcula o quanto precisa rolar para deixar o elemento no centro da tela
      const targetYOffset = rect.top - (window.innerHeight / 2) + (rect.height / 2);
      
      if (Math.abs(targetYOffset) > 50) {
        // Duração proporcional à distância, min 800ms, max 2000ms
        const duration = Math.min(Math.max(Math.abs(targetYOffset) * 1.5, 800), 2000); 
        await naturalScroll(targetYOffset, duration);
      } else {
        await sleep(500); // Se já está na tela, só espera
      }
    };

    const goToAndClick = async (elementSelector, textMatch = null, forceNavigateTo = null) => {
      let el = null;
      if (textMatch) {
        el = findElementByText(elementSelector, textMatch);
      } else {
        el = document.querySelector(elementSelector);
      }
      
      if (!el) {
        console.warn(`Element not found: ${elementSelector} ${textMatch || ''}`);
        return null;
      }

      await smoothScrollToElement(el);
      
      const rect = el.getBoundingClientRect();
      moveCursorTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
      
      await sleep(1000); 
      simulateClick(el);
      
      if (forceNavigateTo) {
        await sleep(200);
        navigate(forceNavigateTo);
      }
      
      await sleep(500); 
      return el;
    };

    const typeText = async (elementSelector, text) => {
      const el = document.querySelector(elementSelector);
      if (!el) return;
      
      const rect = el.getBoundingClientRect();
      moveCursorTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
      await sleep(1000);
      simulateClick(el);
      
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
      let currentText = "";
      for (let i = 0; i < text.length; i++) {
        currentText += text[i];
        nativeInputValueSetter.call(el, currentText);
        const ev2 = new Event('input', { bubbles: true});
        el.dispatchEvent(ev2);
        await sleep(100);
      }
      await sleep(500);
    };

    try {
      await sleep(1000);
      
      // Helpers de scroll antigos foram substituídos pelo naturalScroll
      
      // -- CENA 1: TELA OPORTUNIDADES (BLOQUEADAS) --
      localStorage.setItem('demo_scene', '1-' + Date.now());
      navigate('/oportunidades');
      setCursorPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      await sleep(4000); // aumentado para 4s
      
      // Mostra a nota 80 e as oportunidades bloqueadas
      await naturalScroll(400, 2000);
      await sleep(2500); // aumentado para 2.5s
      await naturalScroll(-window.scrollY, 1500);
      await sleep(2000); // aumentado para 2s
      
      // Abre a aba "Como funciona a pontuação?"
      await goToAndClick('button', 'como funciona a pontuação');
      await sleep(2500); // aumentado para 2.5s
      await naturalScroll(450, 3500); // Rola devagar para ler as regras
      await sleep(4500); // aumentado para 4.5s
      
      // -- CENA 2: MENSAGENS (WHATSAPP) --
      // Volta pro topo e navega pro menu de mensagens
      await naturalScroll(-window.scrollY, 1500);
      await goToAndClick('a', 'mensagens', '/mensagens');
      await sleep(2000);
      localStorage.setItem('demo_scene', '2-' + Date.now()); // Vira a cena APÓS carregar a tela de mensagens
      
      const selectEl = document.querySelector('select');
      if (selectEl) {
        const nativeSelectValueSetter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, "value").set;
        
        moveCursorTo(selectEl.getBoundingClientRect().left + 20, selectEl.getBoundingClientRect().top + 10);
        await sleep(800);
        
        // 1. Simula SMS (O Celular aparece na tela neste momento)
        simulateClick(selectEl);
        await sleep(300);
        nativeSelectValueSetter.call(selectEl, 'sms');
        selectEl.dispatchEvent(new Event('change', { bubbles: true }));
        await sleep(1000);
        
        // 2. Agora que o celular apareceu, rola a tela para focar nele inteiro
        await naturalScroll(450, 2000);
        await sleep(1000);
        
        // 3. Reposiciona o mouse no seletor (que subiu na tela devido ao scroll)
        moveCursorTo(selectEl.getBoundingClientRect().left + 20, selectEl.getBoundingClientRect().top + 10);
        await sleep(800);
        
        // 4. Simula Telegram
        simulateClick(selectEl);
        await sleep(300);
        nativeSelectValueSetter.call(selectEl, 'telegram');
        selectEl.dispatchEvent(new Event('change', { bubbles: true }));
        await sleep(2000);
        
        // 5. Simula WhatsApp
        simulateClick(selectEl);
        await sleep(300);
        nativeSelectValueSetter.call(selectEl, 'whatsapp');
        selectEl.dispatchEvent(new Event('change', { bubbles: true }));
        await sleep(1500);
      }

      // Scroll super cuidadoso apenas DENTRO do celular para ler a notificação
      await naturalScrollElement('chat-container', 300, 4000);
      await sleep(3500);

      await goToAndClick('a', 'analise', '/analise');
      
      // -- CENA 3: TELA ANÁLISE (REALIDADE ATUAL) --
      localStorage.setItem('demo_scene', '3-' + Date.now());
      await sleep(2500);
      // Rola a página revelando a tela complexa e encontrando o banner amarelo
      await naturalScroll(400, 2000);
      await sleep(3500); // 3.5 segundos: Tempo exato para o narrador terminar de falar sobre o susto e apresentar a solução
      await goToAndClick('button', 'acessar tradutor ambiental', '/tradutor/pendencias');
      
      // -- CENA 4: TELA TRADUTOR --
      localStorage.setItem('demo_scene', '4-' + Date.now());
      await sleep(2000);
      await goToAndClick('h4', 'divergência');
      
      // Fica parado focando na tradução e no começo dos mapas conforme solicitado, sem descer tudo
      await sleep(4500); 
      
      // O goToAndClick já vai rolar sutilmente para enquadrar o botão verde e clicar
      await goToAndClick('button', 'corrigir limites', '/retificacao');
      
      // -- CENA 5: TELA RETIFICAÇÃO (RÁPIDA) --
      localStorage.setItem('demo_scene', '5-' + Date.now());
      await sleep(2500);
      
      // Rola tudo de uma vez rápido pra mostrar a tela inteira (ela já existe no sistema)
      await naturalScroll(800, 1500);
      await sleep(500);
      await naturalScroll(800, 1500);
      await sleep(800);
      await naturalScroll(-500, 1000); // Sobe um pouquinho pro card ficar no meio
      
      await goToAndClick('div', 'sim, conforme sugestão'); 
      
      // A assinatura continua fazendo parte da narração da Cena 5
      await sleep(1500);
      await typeText('input[placeholder*="Nome da mãe"]', 'Maria Silva');
      
      await goToAndClick('button', 'confirmar');
      
      await sleep(3500);
      await goToAndClick('button', 'ok');
      
      // -- CENA 6: ASSINATURA E RECOMPENSA --
      localStorage.setItem('demo_scene', '6-' + Date.now()); // Vira a cena APÓS o modal de sucesso fechar e voltar pra nota 100
      
      // TELA OPORTUNIDADES (Liberada)
      await sleep(2000);
      await naturalScroll(300, 2000);
      
      moveCursorTo(window.innerWidth - 100, 100);
      
    } catch (e) {
      console.error('Demo script error:', e);
    }
    
    setIsPlaying(false);
  };

  return (
    <>
      {!isPlaying && (
        <button 
          onClick={runDemo}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            zIndex: 10000,
            padding: '10px 20px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            cursor: 'pointer'
          }}
        >
          ▶ Iniciar Simulação do Mouse
        </button>
      )}

      {isPlaying && (
        <div 
          style={{
            position: 'fixed',
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            width: '24px',
            height: '24px',
            backgroundColor: 'rgba(231, 76, 60, 0.6)',
            border: '3px solid #c0392b',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 99999,
            transform: `translate(-50%, -50%) scale(${isClicking ? 0.7 : 1})`,
            transition: 'left 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), top 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.2s',
            boxShadow: isClicking ? '0 0 15px rgba(231, 76, 60, 0.8)' : '0 2px 5px rgba(0,0,0,0.2)',
          }}
        />
      )}
    </>
  );
};

export default DemoAutoPilot;
