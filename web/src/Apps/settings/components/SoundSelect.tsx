import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const T = '#208692';
const T50 = 'rgba(32,134,146,0.5)';
const T20 = 'rgba(32,134,146,0.2)';
const BG = '#0a0c10';
const CARD = 'rgba(16,20,28,0.97)';

interface Option { label: string; value: string; }
interface Props { label: string; color?: string; options: Option[]; selected: string; disabled?: boolean; onChange: (v: string) => void; playSound: (v: string) => void; }

export default function SoundSelect({ label, color, options, selected: initSelected, disabled, onChange, playSound }: Props) {
  const [showList, setShowList] = useState(false);
  const [selected, setSelected] = useState(initSelected);

  const changeSelected = (val: string) => { setShowList(false); setSelected(val); onChange(val); };
  const currentLabel = options.find(i => i.value === selected)?.label ?? selected;

  return (
    <div style={{ opacity: disabled ? 0.5 : 1, position: 'relative' }}>
      <div
        onClick={() => !disabled && setShowList(p => !p)}
        style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          cursor: disabled ? 'default' : 'pointer', background: showList ? 'rgba(32,134,146,0.07)' : 'transparent',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { if (!disabled && !showList) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
        onMouseLeave={e => { if (!showList) e.currentTarget.style.background = 'transparent'; }}
      >
        <div style={{ width: 38, height: 38, borderRadius: 10, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, flexShrink: 0 }}>
          <FontAwesomeIcon icon={['fas','headphones']} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: '#fff', fontFamily: 'Oswald', letterSpacing: '0.02em' }}>{label}</div>
          <div style={{ fontSize: 11, color: T, marginTop: 2, fontFamily: 'Oswald' }}>{currentLabel}</div>
        </div>
        <FontAwesomeIcon icon={['fas', showList ? 'chevron-up' : 'chevron-down']} style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }} />
      </div>

      {showList && (
        <>
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: 1 }} onClick={() => setShowList(false)} />
          <div style={{ position: 'absolute', left: 0, right: 0, zIndex: 2, background: CARD, border: `1px solid ${T50}`, borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.6)', maxHeight: 240, overflowY: 'auto' }}>
            {options.map((item, i) => {
              const isSelected = item.value === selected;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', background: isSelected ? T20 : 'transparent', transition: 'background 0.15s' }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ flex: 1, fontSize: 13, color: isSelected ? T : 'rgba(255,255,255,0.8)', fontFamily: 'Oswald', letterSpacing: '0.02em' }} onClick={() => changeSelected(item.value)}>
                    {item.label}
                    {isSelected && <FontAwesomeIcon icon="check" style={{ marginLeft: 8, fontSize: 11 }} />}
                  </div>
                  <button onClick={e => { e.stopPropagation(); playSound(item.value); }} style={{ background: 'none', border: `1px solid rgba(255,255,255,0.12)`, borderRadius: 8, color: 'rgba(255,255,255,0.55)', width: 30, height: 30, cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon="play" />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
