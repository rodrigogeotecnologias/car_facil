import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Polygon, Polyline, LayersControl } from 'react-leaflet';
import { Download, AlertCircle, CheckCircle, Info, MessageSquare, X, Send, Leaf, CheckSquare, XCircle, Map, FileDown, FileText, Receipt, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { mockProperty } from '../mockData/propertyData';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import SicarPageHeader from '../components/SicarPageHeader';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedPendency, setSelectedPendency] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState('form'); // form, processing, success
  const [motherName, setMotherName] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { text: 'Olá! Sou seu Assistente Ambiental. Como posso ajudar com o seu CAR?', isBot: true }
  ]);
  const [visibleLayers, setVisibleLayers] = useState({
    vegetacaoNativa: true,
    areaConsolidada: true,
    cursoDagua: true,
    app: true,
    reservaLegal: true
  });
  const [layerOpacity, setLayerOpacity] = useState({
    vegetacaoNativa: 0.5,
    areaConsolidada: 0.5,
    cursoDagua: 0.5,
    app: 0.5,
    reservaLegal: 0.5
  });
  const [basemap, setBasemap] = useState('osm'); // 'osm' ou 'satellite'
  const reportRef = useRef(null);

  // Chatbot questions
  const quickQuestions = [
    "O que é APP?",
    "O que é Reserva Legal?",
    "O que significa sobreposição?",
    "Como corrigir meu CAR?"
  ];

  const handleSendQuestion = (question) => {
    setChatMessages([...chatMessages, { text: question, isBot: false }]);
    
    // Simulate bot response
    setTimeout(() => {
      let reply = "Desculpe, não entendi.";
      if (question.includes("APP")) {
        reply = "APP significa Área de Preservação Permanente. São áreas que devem ser mantidas com vegetação nativa, como beiras de rios, nascentes e topos de morro, para proteger as águas e evitar desastres.";
      } else if (question.includes("Reserva Legal")) {
        reply = "Reserva Legal é uma porcentagem da sua propriedade que deve ser mantida com vegetação nativa. O tamanho varia dependendo da região e do bioma.";
      } else if (question.includes("sobreposição")) {
        reply = "Sobreposição acontece quando o mapa da sua propriedade está desenhado por cima do mapa de outra pessoa, de uma terra indígena ou de uma unidade de conservação. É preciso corrigir os limites para evitar conflitos.";
      } else if (question.includes("corrigir")) {
        reply = "Para corrigir, você precisa acessar o sistema oficial do CAR (SICAR) ou procurar um técnico/consultor ambiental para retificar os limites e informações enviadas.";
      }
      
      setChatMessages(prev => [...prev, { text: reply, isBot: true }]);
    }, 1000);
  };

  const handleConfirmRetification = () => {
    if (!motherName) {
      alert("Por favor, preencha o Nome da mãe para assinar o termo.");
      return;
    }
    setModalState('processing');
    setTimeout(() => {
      setModalState('success');
    }, 2500);
  };

  const generatePDF = () => {
    window.print();
  };

  const renderStatusIcon = (status, size = 64) => {
    const props = { size, style: { flexShrink: 0 } };
    if (status === 'success') return <CheckCircle {...props} color="var(--success)" />;
    if (status === 'warning') return <AlertCircle {...props} color="var(--warning)" />;
    if (status === 'danger') return <XCircle {...props} color="var(--danger)" />;
    return <Info {...props} color="var(--primary-light)" />;
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <SicarPageHeader />

      <div style={{ backgroundColor: '#e8f5e9', padding: '10px 15px', color: '#128242', fontWeight: 'bold', marginBottom: '20px', borderRadius: '4px' }}>
        Prazo para atendimento: 08/01/2027 às 23:59 (horário de Brasília)
      </div>

      {/* Header Bar */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Resumo da Revisão de Dados</h2>
        </div>
        <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Índice de Regularidade</span>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>
              {mockProperty.indiceRegularidade}<span style={{ fontSize: '1rem' }}>/100</span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end' }}>
              <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></span>
              Boa condição para análise
            </div>
          </div>

        </div>
      </div>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem' }}>
        
        {/* Left Column: Map and Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Tradutor Ambiental (Details) or Alert */}
          {selectedPendency ? (
            <div className="card animate-fade-in" style={{ borderLeft: `5px solid var(--${selectedPendency.status})` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {renderStatusIcon(selectedPendency.status, 32)}
                  {selectedPendency.tipo}
                </h3>
                <button onClick={() => setSelectedPendency(null)} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}>Fechar</button>
              </div>
              
              <div style={{ marginTop: '1rem' }}>
                <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius)' }}>
                  <strong>Termo Técnico:</strong> <span style={{ color: 'var(--text-muted)' }}>{selectedPendency.tituloTecnico}</span>
                  <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      <Leaf size={18} /> Tradutor Ambiental
                    </div>
                    <p style={{ fontSize: '1.1rem' }}>"{selectedPendency.explicacaoSimples}"</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <h4 style={{ color: 'var(--danger)', fontSize: '1rem' }}>Possíveis Impactos</h4>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
                      {selectedPendency.impactos.length > 0 ? (
                        selectedPendency.impactos.map((imp, idx) => <li key={idx}>{imp}</li>)
                      ) : (
                        <li>Nenhum impacto negativo esperado.</li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--primary)', fontSize: '1rem' }}>Recomendação</h4>
                    <p style={{ color: 'var(--text-muted)' }}>{selectedPendency.recomendacao}</p>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <button 
                    onClick={() => navigate('/analise')} 
                    className="btn btn-primary" 
                    style={{ fontSize: '1.1rem', padding: '0.75rem 2rem', backgroundColor: '#128242' }}
                  >
                    Entendi! Quero acessar o módulo de Análise do Governo
                  </button>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Ao clicar, você será direcionado para a aba de Análise Oficial do SICAR.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center animate-fade-in" style={{ padding: '1.5rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Info size={32} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
              <p style={{ margin: 0 }}>Clique em uma pendência ao lado para ver o detalhamento e as recomendações pelo Tradutor Ambiental.</p>
            </div>
          )}

          {/* TWO MAPS side-by-side */}
          <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {/* Map 1: Declaração */}
            <div className="card map-container" style={{ padding: 0, overflow: 'hidden', height: '350px' }}>
              <div style={{ backgroundColor: '#f0f0f0', padding: '5px 10px', fontWeight: 'bold', fontSize: '0.8rem', borderBottom: '1px solid #ccc', zIndex: 1000, position: 'relative' }}>Declaração</div>
              <MapContainer center={mockProperty.center} zoom={15} style={{ height: 'calc(100% - 30px)', width: '100%', zIndex: 1 }}>
                <LayersControl position="topright">
                  <LayersControl.BaseLayer name="OpenStreetMap">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer checked name="Satélite (Simulado)">
                    <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                  </LayersControl.BaseLayer>
                </LayersControl>
                <Polygon positions={mockProperty.limites} pathOptions={{ color: 'white', fillOpacity: 0, weight: 3, dashArray: '5, 5' }} />
                {visibleLayers.vegetacaoNativa && <Polygon positions={mockProperty.vegetacaoNativa} pathOptions={{ color: '#28a745', fillOpacity: layerOpacity.vegetacaoNativa, opacity: layerOpacity.vegetacaoNativa > 0 ? 1 : 0, weight: 1 }} />}
                {visibleLayers.areaConsolidada && <Polygon positions={mockProperty.areaConsolidada} pathOptions={{ color: '#e0e0e0', fillOpacity: layerOpacity.areaConsolidada, opacity: layerOpacity.areaConsolidada > 0 ? 1 : 0, weight: 1 }} />}
                {visibleLayers.cursoDagua && <Polyline positions={mockProperty.hidrografia} pathOptions={{ color: '#00ffff', opacity: layerOpacity.cursoDagua, weight: 4 }} />}
                {visibleLayers.app && <Polygon positions={mockProperty.appDeclarada} pathOptions={{ color: '#ffff00', fillOpacity: layerOpacity.app, opacity: layerOpacity.app > 0 ? 1 : 0, weight: 1 }} />}
                {visibleLayers.reservaLegal && <Polygon positions={mockProperty.reservaLegal} pathOptions={{ color: '#00ff00', fillOpacity: layerOpacity.reservaLegal, opacity: layerOpacity.reservaLegal > 0 ? 1 : 0, weight: 1 }} />}
              </MapContainer>
            </div>
            
            {/* Map 2: Informações de Referência */}
            <div className="card map-container" style={{ padding: 0, overflow: 'hidden', height: '350px' }}>
              <div style={{ backgroundColor: '#e8f5e9', padding: '5px 10px', fontWeight: 'bold', fontSize: '0.8rem', borderBottom: '1px solid #ccc', color: '#128242', zIndex: 1000, position: 'relative' }}>Informações de referência</div>
              <MapContainer center={mockProperty.center} zoom={15} style={{ height: 'calc(100% - 30px)', width: '100%', zIndex: 1 }}>
                <LayersControl position="topright">
                  <LayersControl.BaseLayer name="OpenStreetMap">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer checked name="Satélite (Simulado)">
                    <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                  </LayersControl.BaseLayer>
                </LayersControl>
                <Polygon positions={mockProperty.limites} pathOptions={{ color: 'white', fillOpacity: 0, weight: 3, dashArray: '5, 5' }} />
                {visibleLayers.vegetacaoNativa && <Polygon positions={mockProperty.vegetacaoNativaOficial} pathOptions={{ color: '#28a745', fillOpacity: layerOpacity.vegetacaoNativa, opacity: layerOpacity.vegetacaoNativa > 0 ? 1 : 0, weight: 1 }} />}
                {visibleLayers.areaConsolidada && <Polygon positions={mockProperty.areaConsolidadaOficial} pathOptions={{ color: '#e0e0e0', fillOpacity: layerOpacity.areaConsolidada, opacity: layerOpacity.areaConsolidada > 0 ? 1 : 0, weight: 1 }} />}
                {visibleLayers.cursoDagua && <Polyline positions={mockProperty.hidrografia} pathOptions={{ color: '#00ffff', opacity: layerOpacity.cursoDagua, weight: 4 }} />}
                {visibleLayers.app && <Polygon positions={mockProperty.appOficial} pathOptions={{ color: '#ffff00', fillOpacity: layerOpacity.app, opacity: layerOpacity.app > 0 ? 1 : 0, weight: 1 }} />}
                {visibleLayers.reservaLegal && <Polygon positions={mockProperty.reservaLegalOficial} pathOptions={{ color: '#00ff00', fillOpacity: layerOpacity.reservaLegal, opacity: layerOpacity.reservaLegal > 0 ? 1 : 0, weight: 1 }} />}
              </MapContainer>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="card animate-fade-in" style={{ padding: '0', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                <tr>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Tipo de área</th>
                  <th style={{ padding: '10px', textAlign: 'left', backgroundColor: '#fff3cd' }}>Área declarada (ha)</th>
                  <th style={{ padding: '10px', textAlign: 'left', backgroundColor: '#e2e3e5' }}>Informações de Referência (ha)</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Divergência</th>
                  <th style={{ padding: '10px', textAlign: 'center', width: '120px' }}>Habilitar camada</th>
                </tr>
              </thead>
              <tbody>
                {/* COBERTURA DO SOLO */}
                <tr style={{ backgroundColor: '#e9ecef' }}>
                  <td colSpan="5" style={{ padding: '8px 10px', fontWeight: 'bold' }}>Cobertura do solo</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#28a745' }}></div>Remanescente de vegetação nativa</div></td>
                  <td style={{ padding: '10px' }}>34,86 ha</td>
                  <td style={{ padding: '10px' }}>29,04 ha</td>
                  <td style={{ padding: '10px', color: 'red' }}>5,82 ha</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <input type="range" min="0" max="100" value={layerOpacity.vegetacaoNativa * 100} onChange={(e) => setLayerOpacity(prev => ({...prev, vegetacaoNativa: parseInt(e.target.value)/100}))} style={{ width: '40px' }} />
                      <button className="btn btn-outline" style={{ padding: '2px', border: 'none' }} onClick={() => setVisibleLayers(prev => ({...prev, vegetacaoNativa: !prev.vegetacaoNativa}))}>
                        {visibleLayers.vegetacaoNativa ? <Eye size={18} /> : <EyeOff size={18} color="var(--text-muted)" />}
                      </button>
                    </div>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#e0e0e0' }}></div>Área consolidada</div></td>
                  <td style={{ padding: '10px' }}>17,43 ha</td>
                  <td style={{ padding: '10px' }}>14,53 ha</td>
                  <td style={{ padding: '10px', color: 'red' }}>2,90 ha</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <input type="range" min="0" max="100" value={layerOpacity.areaConsolidada * 100} onChange={(e) => setLayerOpacity(prev => ({...prev, areaConsolidada: parseInt(e.target.value)/100}))} style={{ width: '40px' }} />
                      <button className="btn btn-outline" style={{ padding: '2px', border: 'none' }} onClick={() => setVisibleLayers(prev => ({...prev, areaConsolidada: !prev.areaConsolidada}))}>
                        {visibleLayers.areaConsolidada ? <Eye size={18} /> : <EyeOff size={18} color="var(--text-muted)" />}
                      </button>
                    </div>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#00ffff' }}></div>Curso d'água</div></td>
                  <td style={{ padding: '10px' }}>0,00 ha</td>
                  <td style={{ padding: '10px' }}>0,00 ha</td>
                  <td style={{ padding: '10px' }}>0,00 ha</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <input type="range" min="0" max="100" value={layerOpacity.cursoDagua * 100} onChange={(e) => setLayerOpacity(prev => ({...prev, cursoDagua: parseInt(e.target.value)/100}))} style={{ width: '40px' }} />
                      <button className="btn btn-outline" style={{ padding: '2px', border: 'none' }} onClick={() => setVisibleLayers(prev => ({...prev, cursoDagua: !prev.cursoDagua}))}>
                        {visibleLayers.cursoDagua ? <Eye size={18} /> : <EyeOff size={18} color="var(--text-muted)" />}
                      </button>
                    </div>
                  </td>
                </tr>

                {/* APP */}
                <tr style={{ backgroundColor: '#e9ecef' }}>
                  <td colSpan="5" style={{ padding: '8px 10px', fontWeight: 'bold' }}>Áreas de Preservação Permanente</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#ffff00' }}></div>Cursos d'água e nascentes</div></td>
                  <td style={{ padding: '10px' }}>13,28 ha</td>
                  <td style={{ padding: '10px' }}>24,90 ha</td>
                  <td style={{ padding: '10px', color: 'red' }}>11,62 ha</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <input type="range" min="0" max="100" value={layerOpacity.app * 100} onChange={(e) => setLayerOpacity(prev => ({...prev, app: parseInt(e.target.value)/100}))} style={{ width: '40px' }} />
                      <button className="btn btn-outline" style={{ padding: '2px', border: 'none' }} onClick={() => setVisibleLayers(prev => ({...prev, app: !prev.app}))}>
                        {visibleLayers.app ? <Eye size={18} /> : <EyeOff size={18} color="var(--text-muted)" />}
                      </button>
                    </div>
                  </td>
                </tr>

                {/* RESERVA LEGAL */}
                <tr style={{ backgroundColor: '#e9ecef' }}>
                  <td colSpan="5" style={{ padding: '8px 10px', fontWeight: 'bold' }}>Reserva Legal</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#00ff00' }}></div>Reserva Legal</div></td>
                  <td style={{ padding: '10px' }}>17,43 ha</td>
                  <td style={{ padding: '10px' }}>14,53 ha</td>
                  <td style={{ padding: '10px', color: 'red' }}>2,90 ha</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <input type="range" min="0" max="100" value={layerOpacity.reservaLegal * 100} onChange={(e) => setLayerOpacity(prev => ({...prev, reservaLegal: parseInt(e.target.value)/100}))} style={{ width: '40px' }} />
                      <button className="btn btn-outline" style={{ padding: '2px', border: 'none' }} onClick={() => setVisibleLayers(prev => ({...prev, reservaLegal: !prev.reservaLegal}))}>
                        {visibleLayers.reservaLegal ? <Eye size={18} /> : <EyeOff size={18} color="var(--text-muted)" />}
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Validation Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3>Resultados da Pré-Validação</h3>
          
          {mockProperty.pendencias.map(pendencia => (
            <div 
              key={pendencia.id} 
              className="card" 
              style={{ 
                cursor: 'pointer', 
                borderLeft: `4px solid var(--${pendencia.status})`,
                transition: 'transform 0.2s',
                transform: selectedPendency?.id === pendencia.id ? 'scale(1.02)' : 'scale(1)'
              }}
              onClick={() => setSelectedPendency(pendencia)}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flex: 1 }}>
                    {renderStatusIcon(pendencia.status, 64)}
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem' }}>{pendencia.tipo}</h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {pendencia.explicacaoSimples}
                      </p>
                      <div style={{ marginTop: '0.75rem', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Clique para traduzir a pendência <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Chat Button */}
      <button 
        className="btn btn-primary"
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', borderRadius: '50px', width: '60px', height: '60px', padding: 0, boxShadow: 'var(--shadow-lg)', zIndex: 1000 }}
        onClick={() => setChatOpen(!chatOpen)}
      >
        {chatOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* Chat Window */}
      {chatOpen && (
        <div className="card" style={{ position: 'fixed', bottom: '6rem', right: '2rem', width: '350px', height: '500px', display: 'flex', flexDirection: 'column', padding: 0, boxShadow: 'var(--shadow-lg)', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Leaf size={20} />
            <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>Assistente Ambiental</h3>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--bg-color)' }}>
            {chatMessages.map((msg, idx) => (
              <div key={idx} style={{ alignSelf: msg.isBot ? 'flex-start' : 'flex-end', maxWidth: '80%' }}>
                <div style={{ backgroundColor: msg.isBot ? 'white' : 'var(--primary-light)', color: msg.isBot ? 'var(--text-dark)' : 'white', padding: '0.75rem', borderRadius: '1rem', borderBottomLeftRadius: msg.isBot ? 0 : '1rem', borderBottomRightRadius: msg.isBot ? '1rem' : 0, boxShadow: 'var(--shadow-sm)', fontSize: '0.9rem' }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', backgroundColor: 'white', borderBottomLeftRadius: 'var(--radius-lg)', borderBottomRightRadius: 'var(--radius-lg)' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Dúvidas frequentes:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              {quickQuestions.map((q, i) => (
                <button key={i} className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '50px' }} onClick={() => handleSendQuestion(q)}>
                  {q}
                </button>
              ))}
            </div>
            {/* Input mock (not functional, just for show) */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="text" className="form-control" placeholder="Digite sua pergunta..." style={{ padding: '0.5rem' }} />
              <button className="btn btn-primary" style={{ padding: '0.5rem' }}><Send size={18} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
