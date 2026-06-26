import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, AlertCircle, ArrowRight, HelpCircle } from 'lucide-react';
import SicarPageHeader from '../components/SicarPageHeader';
import { mockProperty } from '../mockData/propertyData';

const Analise = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{mockProperty.nome} - {mockProperty.municipio}/{mockProperty.uf}</h4>
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{mockProperty.numeroCar}</p>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
          <div style={{ backgroundColor: '#128242', color: 'white', padding: '10px', borderRadius: '4px', textAlign: 'center', width: '100px' }}>
            <AlertCircle size={24} style={{ marginBottom: '5px' }} />
            <div style={{ fontSize: '0.7rem' }}>Solicitação de Cancelamento do CAR</div>
          </div>
          <div style={{ backgroundColor: '#128242', color: 'white', padding: '10px', borderRadius: '4px', textAlign: 'center', width: '100px' }}>
            <FileText size={24} style={{ marginBottom: '5px' }} />
            <div style={{ fontSize: '0.7rem' }}>Bases de Referência</div>
          </div>
          <div style={{ backgroundColor: '#128242', color: 'white', padding: '10px', borderRadius: '4px', textAlign: 'center', width: '100px' }}>
            <Download size={24} style={{ marginBottom: '5px' }} />
            <div style={{ fontSize: '0.7rem' }}>Baixar arquivo .RET</div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
          <p style={{ margin: 0, color: '#128242', fontWeight: 'bold', fontSize: '0.9rem' }}>Prazo para atendimento: 08/01/2024 às 23:59 (horário de Brasília)</p>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.85rem' }}>Fase do Processo: Revisado, aguardando aceite pelo proprietário</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#f5f5f5', padding: '10px 15px', borderBottom: '1px solid #ddd', fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>
          Revisão dos dados
        </div>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button 
              onClick={() => navigate('/retificacao')}
              className="btn btn-primary" 
              style={{ backgroundColor: '#5cb85c', border: '1px solid #4cae4c', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              <FileText size={16} style={{ marginRight: '5px' }} /> Acessar Módulo de Retificação Dinamizada
            </button>
          </div>
          
          <div style={{ backgroundColor: '#dff0d8', border: '1px solid #d6e9c6', color: '#3c763d', padding: '1rem', borderRadius: '4px', fontSize: '0.85rem', marginBottom: '1rem' }}>
            A revisão dos dados foi processada!
          </div>
          
          <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>
            É necessário acessar o Módulo de Retificação Dinamizada para realizar a comparação dos dados e aceitar ou rejeitar a retificação do cadastro de acordo com as bases de referências do SICAR.
          </p>
        </div>
      </div>

      {/* INTEGRAÇÃO DO HUB: O Botão do Tradutor */}
      <div style={{ backgroundColor: '#fff3cd', border: '1px solid #ffeeba', borderRadius: '8px', padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{ backgroundColor: '#ffc107', color: 'white', padding: '10px', borderRadius: '50%' }}>
          <HelpCircle size={28} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#856404' }}>Dificuldades para entender os relatórios técnicos?</h4>
          <p style={{ margin: '0 0 1rem 0', color: '#856404', fontSize: '0.9rem' }}>
            Sabemos que os documentos oficias podem ser complexos. Utilize o nosso <strong>Tradutor Ambiental</strong> para visualizar sua pendência de forma simples e ilustrada antes de prosseguir com a retificação.
          </p>
          <button 
            onClick={() => navigate('/tradutor/pendencias')}
            className="btn btn-outline" 
            style={{ backgroundColor: 'white', borderColor: '#ffc107', color: '#856404', fontWeight: 'bold' }}
          >
            Acessar Tradutor Ambiental <ArrowRight size={16} style={{ marginLeft: '5px' }} />
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#f5f5f5', padding: '10px 15px', borderBottom: '1px solid #ddd', fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>
          Documentos recebidos
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Documento</th>
              <th style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Data do recebimento</th>
              <th style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid #eee' }}>Relatório da Revisão de Dados</td>
              <td style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid #eee' }}>08/03/2023</td>
              <td style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid #eee' }}>
                <button style={{ backgroundColor: '#eee', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                  <Download size={14} />
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid #eee' }}>Notificação da revisão de dados</td>
              <td style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid #eee' }}>08/03/2023</td>
              <td style={{ padding: '12px 15px', textAlign: 'center', borderBottom: '1px solid #eee' }}>
                <button style={{ backgroundColor: '#eee', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                  <Download size={14} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Analise;
