import React from 'react';
import { XCircle, Map, FileDown, FileText, Receipt } from 'lucide-react';
import { mockProperty } from '../mockData/propertyData';

const SicarPageHeader = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <h1 className="sicar-page-title" style={{ fontSize: '1.8rem', color: '#128242', marginBottom: '10px' }}>
            {mockProperty.nome}
          </h1>
          <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '10px' }}>
            {mockProperty.numeroCar}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <a href="#" style={{ color: '#128242', fontSize: '0.8rem', textDecoration: 'underline' }}>Alterar Imóvel Selecionado</a>
            <a href="#" style={{ color: '#128242', fontSize: '0.8rem', textDecoration: 'underline' }}>Complementar dados do Proprietário/Possuidor</a>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', width: '80px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <XCircle size={24} style={{ marginBottom: '5px' }} />
            <span style={{ fontSize: '0.6rem', textAlign: 'center', lineHeight: '1.2' }}>Solicitação de Cancelamento</span>
          </button>
          <button style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', width: '80px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Map size={24} style={{ marginBottom: '5px' }} />
            <span style={{ fontSize: '0.6rem', textAlign: 'center', lineHeight: '1.2' }}>Bases de Referência</span>
          </button>
          <button style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', width: '80px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <FileDown size={24} style={{ marginBottom: '5px' }} />
            <span style={{ fontSize: '0.6rem', textAlign: 'center', lineHeight: '1.2' }}>Baixar o arquivo .RET</span>
          </button>
          <button style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', width: '80px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <FileText size={24} style={{ marginBottom: '5px' }} />
            <span style={{ fontSize: '0.6rem', textAlign: 'center', lineHeight: '1.2' }}>Ficha do Imóvel</span>
          </button>
          <button style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', width: '80px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Receipt size={24} style={{ marginBottom: '5px' }} />
            <span style={{ fontSize: '0.6rem', textAlign: 'center', lineHeight: '1.2' }}>Recibo de Inscrição</span>
          </button>
        </div>
      </div>

      <div className="sicar-progress-bar">
        <div className="sicar-step completed"><div className="sicar-step-circle">✓</div><span className="sicar-step-label">Inscrição</span></div>
        <div className="sicar-step completed"><div className="sicar-step-circle">✓</div><span className="sicar-step-label">Revisão dos dados</span></div>
        <div className="sicar-step active"><div className="sicar-step-circle" style={{ border: '3px solid black', backgroundColor: 'white' }}><div style={{ width: '10px', height: '10px', backgroundColor: 'black', borderRadius: '50%' }}></div></div><span className="sicar-step-label" style={{ fontWeight: 'bold', color: 'black' }}>Retificação Dinamizada</span></div>
        <div className="sicar-step"><div className="sicar-step-circle" style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>L</div><span className="sicar-step-label">Análise</span></div>
        <div className="sicar-step"><div className="sicar-step-circle" style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>L</div><span className="sicar-step-label">Atendimento da Análise</span></div>
        <div className="sicar-step"><div className="sicar-step-circle" style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>L</div><span className="sicar-step-label">Regularidade Ambiental</span></div>
        <div className="sicar-step"><div className="sicar-step-circle" style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>L</div><span className="sicar-step-label">Cota de Reserva Ambiental</span></div>
      </div>
    </>
  );
};

export default SicarPageHeader;
