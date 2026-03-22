import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChopItem from './component/ChopItem';
import { Modal } from '../../components';
import { useAppColor, hexAlpha } from '../../hooks';

interface Props { chopList: any; }

const ChopList: React.FC<Props> = ({ chopList }) => {
  const T = useAppColor('lsunderground');
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const T12 = hexAlpha(T, 0.12);

  const [open, setOpen] = useState<string | null>(null);
  const keys = Object.keys(chopList ?? {});

  return (
    <div style={{ height: '100%', background: '#0a0c10', overflowY: 'auto', overflowX: 'hidden' }}>
      {keys.length === 0 ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12 }}>
          <FontAwesomeIcon icon={['fas', 'car']} style={{ fontSize: 40, color: T12 }} />
          <div style={{ color: 'rgba(255,255,255,0.25)', fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}>No Chop Lists</div>
        </div>
      ) : (
        <div style={{ padding: '6px 10px' }}>
          {keys.map((k) => {
            const list = chopList[k];
            const isPublic = Boolean(list.public);
            const count = list.list?.length ?? 0;
            return (
              <div
                key={`choplist-${k}`}
                onClick={() => setOpen(k)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', marginBottom: 6, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = T20; e.currentTarget.style.borderColor = T50; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: T20, border: `1px solid ${T50}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T, fontSize: 15 }}>
                  <FontAwesomeIcon icon={['fas', isPublic ? 'users' : 'user']} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 14, color: '#fff', fontWeight: 500, letterSpacing: '0.03em' }}>
                    {Boolean(list.id) ? k : `${k} Chop List`}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2, letterSpacing: '0.02em' }}>
                    {isPublic ? 'Shared' : 'Personal'} — {count} {count === 1 ? 'Vehicle' : 'Vehicles'} Remaining
                  </div>
                </div>
                <FontAwesomeIcon icon={['fas', 'chevron-right']} style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, flexShrink: 0 }} />
              </div>
            );
          })}
        </div>
      )}

      {Boolean(open) && (
        <Modal open={Boolean(open)} title={`${open} Chop List`} closeLang="Close" onClose={() => setOpen(null)} appColor={T}>
          {(chopList[open!].list ?? [])
            .sort((a: any, b: any) => b.hv - a.hv)
            .map((chop: any, index: number) => (
              <ChopItem key={`chopitem-${index}`} chopRequest={chop} />
            ))}
        </Modal>
      )}
    </div>
  );
};

export default ChopList;
