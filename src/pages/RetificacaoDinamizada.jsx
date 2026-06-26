import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Polyline, LayersControl } from 'react-leaflet';
import { mockProperty } from '../mockData/propertyData';
import { X, CheckCircle, Eye, EyeOff, Info, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SicarPageHeader from '../components/SicarPageHeader';

const RetificacaoDinamizada = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [motherName, setMotherName] = useState('');
  const [modalState, setModalState] = useState('form'); // 'form', 'processing', 'success'
  
  const [visibleLayers, setVisibleLayers] = useState({
    rvn: true,
    consolidada: true,
    agua: true,
    app: true,
    rl: true
  });

  const [layerOpacity, setLayerOpacity] = useState({
    rvn: 0.5,
    consolidada: 0.5,
    agua: 0.5,
    app: 0.5,
    rl: 0.5
  });

  const handleConfirm = () => {
    if (!motherName) {
      alert("Por favor, insira o nome da mãe do proprietário para assinar eletronicamente a retificação.");
      return;
    }
    
    setModalState('processing');
    setTimeout(() => {
      setModalState('success');
    }, 2000);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    if (modalState === 'success') {
      navigate('/tradutor/regularizacao');
    }
    setTimeout(() => {
      setModalState('form');
      setMotherName('');
    }, 300);
  };

  const toggleLayer = (layer) => {
    setVisibleLayers(prev => ({...prev, [layer]: !prev[layer]}));
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '2rem' }}>
      
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{mockProperty.nome} - {mockProperty.municipio}/{mockProperty.uf}</h4>
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Resultado da Revisão de Dados</p>
      </div>

      <div style={{ border: '1px solid #c0392b', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white' }}>
        <div style={{ backgroundColor: '#f9f9f9', padding: '10px 15px', borderBottom: '1px solid #eee', fontWeight: 'bold', color: '#666', fontSize: '0.85rem' }}>
          Módulo de Retificação Dinamizada do SICAR
        </div>
        <div style={{ padding: '1rem', fontSize: '0.85rem', color: '#555' }}>
          <p style={{ margin: 0 }}>Informamos que o cadastro {mockProperty.numeroCar} foi revisado a partir das informações de referência constante no SICAR pelo Módulo de Análise Dinamizada do SICAR.</p>
          <p style={{ margin: '0.5rem 0 0 0' }}>Abaixo são exibidos o mapa da declaração realizada pelo proprietário/possuidor e o mapa da base de referência do SICAR. Em seguida, são exibidas informações resumidas das divergências identificadas entre a declaração vigente e as bases de referência do SICAR. Ao final é apresentado um quadro com as explicações sobre as seguintes opções: manter a declaração vigente ou concordar e aceitar a sugestão de retificação automática do cadastro, de acordo com a base SICAR.</p>
        </div>
      </div>

      {/* Mapas Comparativos */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Mapa 1: Declaração */}
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', height: '350px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ backgroundColor: '#ffc107', padding: '5px 10px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Declaração</span>
          </div>
          <MapContainer center={mockProperty.center} zoom={15} style={{ flex: 1, width: '100%', zIndex: 1 }}>
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Satélite">
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
              </LayersControl.BaseLayer>
            </LayersControl>
            
            <Polygon positions={mockProperty.limites} pathOptions={{ color: 'white', fillOpacity: 0, weight: 2, dashArray: '5, 5' }} />
            {visibleLayers.rvn && <Polygon positions={mockProperty.vegetacaoNativa} pathOptions={{ color: '#8bc34a', fillColor: '#8bc34a', fillOpacity: layerOpacity.rvn, opacity: layerOpacity.rvn > 0 ? 1 : 0, weight: 1 }} />}
            {visibleLayers.consolidada && <Polygon positions={mockProperty.areaConsolidada} pathOptions={{ color: '#e0e0e0', fillColor: '#e0e0e0', fillOpacity: layerOpacity.consolidada, opacity: layerOpacity.consolidada > 0 ? 1 : 0, weight: 1 }} />}
            {visibleLayers.rl && <Polygon positions={mockProperty.reservaLegal} pathOptions={{ color: '#4caf50', fillColor: '#4caf50', fillOpacity: layerOpacity.rl, opacity: layerOpacity.rl > 0 ? 1 : 0, weight: 1 }} />}
            {visibleLayers.agua && <Polyline positions={mockProperty.hidrografia} pathOptions={{ color: '#00bcd4', opacity: layerOpacity.agua, weight: 3 }} />}
            {visibleLayers.app && <Polygon positions={mockProperty.appDeclarada} pathOptions={{ color: '#ffff00', fillColor: '#ffff00', fillOpacity: layerOpacity.app, opacity: layerOpacity.app > 0 ? 1 : 0, weight: 1 }} />}
          </MapContainer>
        </div>

        {/* Mapa 2: Oficial */}
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', height: '350px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ backgroundColor: '#c8e6c9', padding: '5px 10px', fontSize: '0.8rem', fontWeight: 'bold', color: '#128242', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Informações de referência</span>
          </div>
          <MapContainer center={mockProperty.center} zoom={15} style={{ flex: 1, width: '100%', zIndex: 1 }}>
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Satélite">
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
              </LayersControl.BaseLayer>
            </LayersControl>
            
            <Polygon positions={mockProperty.limites} pathOptions={{ color: 'white', fillOpacity: 0, weight: 2, dashArray: '5, 5' }} />
            {visibleLayers.rvn && <Polygon positions={mockProperty.vegetacaoNativaOficial} pathOptions={{ color: '#8bc34a', fillColor: '#8bc34a', fillOpacity: layerOpacity.rvn, opacity: layerOpacity.rvn > 0 ? 1 : 0, weight: 1 }} />}
            {visibleLayers.consolidada && <Polygon positions={mockProperty.areaConsolidadaOficial} pathOptions={{ color: '#e0e0e0', fillColor: '#e0e0e0', fillOpacity: layerOpacity.consolidada, opacity: layerOpacity.consolidada > 0 ? 1 : 0, weight: 1 }} />}
            {visibleLayers.rl && <Polygon positions={mockProperty.reservaLegalOficial} pathOptions={{ color: '#4caf50', fillColor: '#4caf50', fillOpacity: layerOpacity.rl, opacity: layerOpacity.rl > 0 ? 1 : 0, weight: 1 }} />}
            {visibleLayers.agua && <Polyline positions={mockProperty.hidrografia} pathOptions={{ color: '#00bcd4', opacity: layerOpacity.agua, weight: 3 }} />}
            {visibleLayers.app && <Polygon positions={mockProperty.appOficial} pathOptions={{ color: '#ffff00', fillColor: '#ffff00', fillOpacity: layerOpacity.app, opacity: layerOpacity.app > 0 ? 1 : 0, weight: 1 }} />}
          </MapContainer>
        </div>
      </div>

      {/* Tabela de Divergências Única */}
      <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '10px 15px', textAlign: 'left', borderBottom: '2px solid #ddd', width: '35%' }}>Tipo de área</th>
              <th style={{ padding: '10px 15px', textAlign: 'left', borderBottom: '2px solid #ddd', backgroundColor: '#fcf8e3' }}>Área declarada (ha)</th>
              <th style={{ padding: '10px 15px', textAlign: 'left', borderBottom: '2px solid #ddd', backgroundColor: '#dff0d8' }}>Informações de Referência (ha)</th>
              <th style={{ padding: '10px 15px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Divergência</th>
              <th style={{ padding: '10px 15px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Habilitar camada</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" style={{ backgroundColor: '#f9f9f9', padding: '5px 15px', fontWeight: 'bold', fontSize: '0.8rem', color: '#666' }}>Cobertura do solo</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}><div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#8bc34a' }}></div> Remanescente de vegetação nativa</div></td>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', backgroundColor: '#fcf8e3' }}>34,86 ha</td>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', backgroundColor: '#dff0d8' }}>29,04 ha</td>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', color: '#c0392b' }}>5,82 ha</td>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', textAlign: 'center', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <input type="range" min="0" max="100" value={layerOpacity.rvn * 100} onChange={(e) => setLayerOpacity(prev => ({...prev, rvn: parseInt(e.target.value)/100}))} style={{ width: '40px' }} />
                  <button onClick={() => toggleLayer('rvn')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    {visibleLayers.rvn ? <Eye size={16} color="#666" style={{verticalAlign: 'middle'}} /> : <EyeOff size={16} color="#ccc" style={{verticalAlign: 'middle'}} />}
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}><div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#e0e0e0' }}></div> Área consolidada</div></td>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', backgroundColor: '#fcf8e3' }}>17,43 ha</td>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', backgroundColor: '#dff0d8' }}>14,53 ha</td>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', color: '#c0392b' }}>2,90 ha</td>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', textAlign: 'center', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <input type="range" min="0" max="100" value={layerOpacity.consolidada * 100} onChange={(e) => setLayerOpacity(prev => ({...prev, consolidada: parseInt(e.target.value)/100}))} style={{ width: '40px' }} />
                  <button onClick={() => toggleLayer('consolidada')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    {visibleLayers.consolidada ? <Eye size={16} color="#666" style={{verticalAlign: 'middle'}} /> : <EyeOff size={16} color="#ccc" style={{verticalAlign: 'middle'}} />}
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}><div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#00bcd4' }}></div> Curso d'água</div></td>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', backgroundColor: '#fcf8e3' }}>0,00 ha</td>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', backgroundColor: '#dff0d8' }}>0,00 ha</td>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>0,00 ha</td>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', textAlign: 'center', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <input type="range" min="0" max="100" value={layerOpacity.agua * 100} onChange={(e) => setLayerOpacity(prev => ({...prev, agua: parseInt(e.target.value)/100}))} style={{ width: '40px' }} />
                  <button onClick={() => toggleLayer('agua')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    {visibleLayers.agua ? <Eye size={16} color="#666" style={{verticalAlign: 'middle'}} /> : <EyeOff size={16} color="#ccc" style={{verticalAlign: 'middle'}} />}
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ backgroundColor: '#f9f9f9', padding: '5px 15px', fontWeight: 'bold', fontSize: '0.8rem', color: '#666' }}>Áreas de Preservação Permanente</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}><div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#ffeb3b' }}></div> Cursos d'água e nascentes</div></td>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', backgroundColor: '#fcf8e3' }}>13,28 ha</td>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', backgroundColor: '#dff0d8' }}>24,90 ha</td>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', color: '#c0392b' }}>11,62 ha</td>
              <td style={{ padding: '10px 15px', borderBottom: '1px solid #eee', textAlign: 'center', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <input type="range" min="0" max="100" value={layerOpacity.app * 100} onChange={(e) => setLayerOpacity(prev => ({...prev, app: parseInt(e.target.value)/100}))} style={{ width: '40px' }} />
                  <button onClick={() => toggleLayer('app')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    {visibleLayers.app ? <Eye size={16} color="#666" style={{verticalAlign: 'middle'}} /> : <EyeOff size={16} color="#ccc" style={{verticalAlign: 'middle'}} />}
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="5" style={{ backgroundColor: '#f9f9f9', padding: '5px 15px', fontWeight: 'bold', fontSize: '0.8rem', color: '#666' }}>Reserva Legal</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 15px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#4caf50' }}></div> Reserva Legal</div></td>
              <td style={{ padding: '10px 15px', backgroundColor: '#fcf8e3' }}>17,43 ha</td>
              <td style={{ padding: '10px 15px', backgroundColor: '#dff0d8' }}><div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>14,53 ha <Info size={14} color="#1e88e5" style={{ cursor: 'pointer' }}/></div></td>
              <td style={{ padding: '10px 15px', color: '#c0392b' }}>2,90 ha</td>
              <td style={{ padding: '10px 15px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <input type="range" min="0" max="100" value={layerOpacity.rl * 100} onChange={(e) => setLayerOpacity(prev => ({...prev, rl: parseInt(e.target.value)/100}))} style={{ width: '40px' }} />
                  <button onClick={() => toggleLayer('rl')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    {visibleLayers.rl ? <Eye size={16} color="#666" style={{verticalAlign: 'middle'}} /> : <EyeOff size={16} color="#ccc" style={{verticalAlign: 'middle'}} />}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Botões de Ação (Cards) */}
      <div style={{ marginTop: '1rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#333' }}>Você deseja retificar seu cadastro?</h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          {/* Card 1: Aceitar Sugestão */}
          <div 
            onClick={() => setIsModalOpen(true)}
            style={{ border: '2px solid #4caf50', borderRadius: '8px', padding: '1.5rem', backgroundColor: 'white', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f8e9'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            <div style={{ backgroundColor: '#4caf50', color: 'white', padding: '8px', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Sim, conforme sugestão do sistema
            </div>
            <p style={{ fontSize: '0.8rem', color: '#555', margin: 0, textAlign: 'justify' }}>
              Após a revisão de dados do cadastro, verificamos que existem diferenças entre a sua declaração e a base de referência do SICAR. O sistema irá apresentar o detalhamento, por etapas, dos resultados da verificação dinamizada, possibilitando visualizar o detalhamento dos resultados da comparação entre as informações declaradas vigentes e as informações da base de referência do SICAR. A concordância com a sugestão do sistema possibilita a retificação automática com base nos insumos da plataforma.
            </p>
          </div>

          {/* Card 2: Retificar por Etapas */}
          <div 
            style={{ border: '2px solid #2196f3', borderRadius: '8px', padding: '1.5rem', backgroundColor: 'white', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e3f2fd'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            <div style={{ backgroundColor: '#2196f3', color: 'white', padding: '8px', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Parcialmente, desejo retificar por etapas
            </div>
            <p style={{ fontSize: '0.8rem', color: '#555', margin: 0, textAlign: 'justify' }}>
              Após a revisão de dados do cadastro, verificamos que existem diferenças entre a sua declaração e a informação de referência do SICAR. O sistema irá apresentar o detalhamento, por etapas, dos resultados da verificação dinamizada. Em cada etapa você poderá optar por realizar a alteração de acordo com a sugestão do sistema ou manter sua declaração atual e direcionar seu cadastro para a análise de equipe do órgão competente.
            </p>
          </div>

          {/* Card 3: Manter Cadastro Atual */}
          <div 
            style={{ border: '2px solid #9e9e9e', borderRadius: '8px', padding: '1.5rem', backgroundColor: 'white', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            <div style={{ backgroundColor: '#f5f5f5', color: '#333', padding: '8px', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem', border: '1px solid #ddd', marginBottom: '1rem' }}>
              Não, desejo manter meu cadastro atual
            </div>
            <p style={{ fontSize: '0.8rem', color: '#555', margin: 0, textAlign: 'justify' }}>
              Após a revisão de dados do cadastro, verificamos que existem diferenças entre a área de cobertura do solo da declaração e a área de cobertura do solo da informação de referência e/ou sobreposição com áreas restritas. Caso não concorde com esta revisão, é possível manter a declaração atual do cadastro e direcioná-lo para a análise de equipe técnica do órgão competente.
            </p>
          </div>
        </div>
      </div>

      {/* MODAL DE ASSINATURA ELETRÔNICA - Reutilizado e simplificado */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', width: '90%', maxWidth: '700px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#333', fontSize: '1.25rem' }}>Confirmação</h3>
              <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                <X size={24} />
              </button>
            </div>

            {modalState === 'form' && (
              <div style={{ padding: '2rem 3rem' }}>
                <div style={{ border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1.5rem' }}>
                  <div style={{ backgroundColor: '#f9f9f9', padding: '10px 15px', borderBottom: '1px solid #ddd', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    Dados do cadastrante
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>CPF</label>
                        <input type="text" value={mockProperty.proprietario.cpf} disabled style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f5f5f5' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>Nome</label>
                        <input type="text" value={mockProperty.proprietario.nome} disabled style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f5f5f5' }} />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>Data de Nascimento</label>
                        <input type="text" value="20/02/1980" disabled style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f5f5f5' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>Nome da mãe <span style={{ color: 'red' }}>*</span></label>
                        <input 
                          type="text" 
                          value={motherName}
                          onChange={(e) => setMotherName(e.target.value)}
                          placeholder="Nome da mãe do cadastrante" 
                          style={{ width: '100%', padding: '0.75rem', border: '1px solid #c0392b', borderRadius: '4px' }} 
                        />
                        <span style={{ fontSize: '0.7rem', color: '#c0392b' }}>Este campo é obrigatório</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#555', textAlign: 'center', marginBottom: '1.5rem' }}>
                  Concordo com a base de referência e desejo que meu cadastro seja retificado de acordo com estas bases.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button 
                    onClick={handleConfirm}
                    className="btn btn-primary" 
                    style={{ backgroundColor: '#128242', padding: '0.75rem 3rem', fontSize: '1rem', fontWeight: 'bold' }}
                  >
                    ✓ Confirmar
                  </button>
                </div>
              </div>
            )}

            {modalState === 'processing' && (
              <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '2rem' }}>
                  {/* Animating cogs would go here. For now, simple text */}
                  <div style={{ display: 'inline-block', padding: '20px', borderRadius: '50%', backgroundColor: '#f0f0f0', color: '#666' }}>
                    <CheckSquare size={64} style={{ opacity: 0.5 }} />
                  </div>
                </div>
                <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Retificação em processamento</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>A retificação do seu imóvel está sendo processada.</p>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Durante essa etapa você não pode visualizar/editar as informações.</p>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Por gentileza, aguarde.</p>
              </div>
            )}

            {modalState === 'success' && (
              <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '2rem' }}>
                  <CheckCircle size={64} color="#4caf50" style={{ margin: '0 auto' }} />
                </div>
                <h3 style={{ margin: '0 0 1rem 0', color: '#4caf50' }}>Sucesso!</h3>
                <p style={{ color: '#666', fontSize: '1rem', marginBottom: '2rem' }}>Seu cadastro foi retificado com sucesso!</p>
                
                <button 
                  onClick={handleClose}
                  className="btn btn-primary" 
                  style={{ backgroundColor: '#128242', padding: '0.75rem 3rem', fontSize: '1rem' }}
                >
                  ✓ OK
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default RetificacaoDinamizada;
