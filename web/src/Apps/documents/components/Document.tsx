import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../../hooks';

interface Props { document: any; }

const Document: React.FC<Props> = ({ document }) => {
  const T = useAppColor('documents');
  const T20 = hexAlpha(T, 0.2);
  const T10 = hexAlpha(T, 0.1);
  const T08 = hexAlpha(T, 0.08);
  const T04 = hexAlpha(T, 0.04);
  const T50 = hexAlpha(T, 0.5);

  return (
    <Link
      to={`/apps/documents/view/${document._id}/v`}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '11px 16px',
        borderBottom: `1px solid ${T08}`,
        borderLeft: '3px solid transparent',
        background: `linear-gradient(90deg, ${T04} 0%, transparent 100%)`,
        textDecoration: 'none',
        transition: 'background 0.15s, border-left-color 0.15s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T10; (e.currentTarget as HTMLElement).style.borderLeftColor = T; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `linear-gradient(90deg, ${T04} 0%, transparent 100%)`; (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent'; }}
    >
      <div style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, background: T10, color: T, border: `1px solid ${hexAlpha(T, 0.25)}` }}>
        <FontAwesomeIcon icon={['fas', 'file-lines']} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.03em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {document.title}
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
          Last Edited {document.time ? new Date(document.time * 1000).toLocaleDateString() : ''}
        </div>
      </div>
      <FontAwesomeIcon icon={['fas', 'chevron-right']} style={{ color: T, fontSize: 11, opacity: 0.5, flexShrink: 0 }} />
    </Link>
  );
};

export default Document;
