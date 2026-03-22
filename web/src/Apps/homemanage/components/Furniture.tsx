import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../../hooks';

interface Props { onClick: () => void; index: number; expanded: number | false; furniture: any; onEdit: (id: any) => void; onFind: (id: any) => void; onClone: (cat: any, model: any) => void; onDelete: (id: any) => void; }

const FurnitureItem: React.FC<Props> = ({ onClick, index, expanded, furniture, onEdit, onFind, onClone, onDelete }) => {
  const T = useAppColor('homemanage');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T08 = hexAlpha(T, 0.08);
  const T04 = hexAlpha(T, 0.04);

  const isExpanded = expanded === index;

  const actionBtnStyle: React.CSSProperties = {
    flex: 1, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 12,
    fontFamily: "'Oswald', sans-serif", letterSpacing: '0.06em', background: 'transparent', transition: 'background 0.2s',
  };

  const deleteBtnStyle: React.CSSProperties = {
    flex: 1, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderRadius: 6, border: '1px solid rgba(211,47,47,0.25)', cursor: 'pointer', color: '#ef5350', fontSize: 12,
    fontFamily: "'Oswald', sans-serif", letterSpacing: '0.06em', background: 'transparent', transition: 'background 0.2s',
  };

  return (
    <div style={{
      borderBottom: `1px solid ${T08}`,
      borderLeft: isExpanded ? `3px solid ${T}` : '3px solid transparent',
      background: isExpanded
        ? `linear-gradient(90deg, ${T20} 0%, ${T04} 100%)`
        : `linear-gradient(90deg, ${T04} 0%, transparent 100%)`,
      transition: 'border-left-color 0.15s, background 0.15s',
    }}>
      {/* Summary */}
      <div
        onClick={onClick}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', cursor: 'pointer', userSelect: 'none' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, background: T20, color: T, border: `1px solid ${hexAlpha(T, 0.25)}` }}>
            <FontAwesomeIcon icon={['fas', 'couch']} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {furniture.name}
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
              ID: {furniture.id} | Dist: {Math.round(furniture.dist)}
            </div>
          </div>
        </div>
        <FontAwesomeIcon icon={['fas', 'chevron-right']} style={{ color: T, fontSize: 12, flexShrink: 0, transition: 'transform 0.2s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }} />
      </div>

      {/* Actions */}
      {isExpanded && (
        <div style={{ display: 'flex', gap: 8, padding: '8px 16px 12px', borderTop: `1px solid ${T08}` }}>
          <div
            style={actionBtnStyle}
            onClick={() => onEdit(furniture.id)}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T20)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
          >
            <FontAwesomeIcon icon={['fas', 'arrows-up-down-left-right']} /> Move
          </div>
          <div
            style={actionBtnStyle}
            onClick={() => onFind(furniture.id)}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T20)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
          >
            <FontAwesomeIcon icon={['fas', 'magnifying-glass']} /> Find
          </div>
          <div
            style={actionBtnStyle}
            onClick={() => onClone(furniture.cat, furniture.model)}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T20)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
          >
            <FontAwesomeIcon icon={['fas', 'clone']} /> Clone
          </div>
          <div
            style={deleteBtnStyle}
            onClick={() => onDelete(furniture.id)}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(211,47,47,0.15)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
          >
            <FontAwesomeIcon icon={['fas', 'trash']} /> Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default FurnitureItem;
