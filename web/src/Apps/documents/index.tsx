import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DocumentList from './components/DocumentList';
import { useAppColor, hexAlpha } from '../../hooks';

const BG = '#0a0c10';

const DocumentsIndex: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const T = useAppColor('documents');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const documents = useSelector((state: any) => state.data.data.myDocuments);
  const [tab, setTab] = useState<number>(0);
  const tabs = ['My Documents', 'Shared With Me'];

  const tabBarStyle: React.CSSProperties = {
    flexShrink: 0, display: 'flex', height: 46,
    background: 'rgba(8,10,14,0.98)', borderTop: `1px solid ${T20}`,
  };
  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', fontSize: 10, fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.08em', textTransform: 'uppercase', userSelect: 'none',
    color: active ? T : 'rgba(255,255,255,0.35)',
    borderTop: active ? `2px solid ${T}` : '2px solid transparent',
    background: active ? T20 : 'transparent', transition: 'all 0.2s',
  });

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 8px 0 16px', height: 56,
        background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`,
        borderBottom: `1px solid ${T50}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff' }}>
          <FontAwesomeIcon icon={['fas', 'file-lines']} style={{ color: T, fontSize: 16 }} />
          Documents
        </div>
        <div
          style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, transition: 'background 0.2s' }}
          onClick={() => navigate('/apps/documents/view/doc/new')}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T20)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
        >
          <FontAwesomeIcon icon={['fas', 'plus']} />
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ height: '100%' }} role="tabpanel" hidden={tab !== 0}>{tab === 0 && <DocumentList documents={documents} />}</div>
        <div style={{ height: '100%' }} role="tabpanel" hidden={tab !== 1}>{tab === 1 && <DocumentList documents={documents} showShared />}</div>
      </div>
      <div style={tabBarStyle}>
        {tabs.map((label, i) => (
          <div key={i} onClick={() => setTab(i)} style={tabStyle(tab === i)}>{label}</div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsIndex;
