import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert } from '../../hooks';
import Nui from '../../util/Nui';
import { RootState } from '../../store';

const T = '#208692';
const T50 = 'rgba(32,134,146,0.5)';
const T20 = 'rgba(32,134,146,0.2)';
const BG = '#0a0c10';

const KEY_ROWS = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['*', 0, '#']];
const KEY_SUB: Record<string, string> = {
  '2': 'ABC', '3': 'DEF', '4': 'GHI', '5': 'JKL',
  '6': 'MNO', '7': 'PQRS', '8': 'TUV', '9': 'WXYZ', '0': '+',
};

export default function Keypad() {
  const showAlert = useAlert();
  const navigate = useNavigate();
  const limited = useSelector((state: RootState) => state.phone.limited);
  const contacts = useSelector((state: RootState) => state.data.data.contacts) ?? [];
  const player = useSelector((state: RootState) => state.data.data.player);
  const callData = useSelector((state: RootState) => state.call.call);
  const [dialNumber, setDialNumber] = useState('');
  const [isContact, setIsContact] = useState<any[]>([]);

  useEffect(() => {
    if (dialNumber !== '' && !limited) {
      setIsContact(contacts.filter((c: any) => c.number.startsWith(dialNumber.replace(/_/g, ''))));
    } else setIsContact([]);
  }, [dialNumber]);

  const btnClick = (value: number | string) => {
    if (value === '*' || value === '#') return;
    const tmp = dialNumber.replace(/-/g, '').replace(/_/g, '') + value;
    if (tmp.length <= 10) {
      if (tmp.length > 3 && tmp.length < 7) setDialNumber(tmp.replace(/(\d{3})(\d{1,3})/, '$1-$2'));
      else setDialNumber(tmp.replace(/(\d{3})(\d{3})(\d{1,4})/, '$1-$2-$3'));
    }
  };

  const startCall = async () => {
    const cleaned = dialNumber.replace(/_/g, '');
    if (cleaned.length === 12 && cleaned !== player?.Phone && callData == null) {
      try {
        const res = await Nui.send<boolean>('CreateCall', { number: cleaned, limited, isAnon: false });
        if (res) navigate(`/apps/phone/call/${cleaned}`);
        else showAlert('Unable To Start Call');
      } catch { showAlert('Unable To Start Call'); }
    } else if (cleaned === player?.Phone) {
      showAlert('Cannot Call Yourself');
    }
  };

  const canCall = dialNumber.replace(/_/g, '').length === 12 && callData == null;
  const contactMatch = isContact.length === 1 ? isContact[0].name : isContact.length > 1 ? 'Multiple Matches' : null;
  const isSpecial = (k: string | number) => k === '*' || k === '#';

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>

      {/* Display */}
      <div style={{
        flexShrink: 0,
        background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`,
        borderBottom: `1px solid ${T50}`,
        padding: '20px 20px 16px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      }}>
        {/* Contact name */}
        <div style={{
          fontSize: 11, fontFamily: 'Oswald', letterSpacing: '0.16em',
          color: contactMatch ? T : 'rgba(255,255,255,0)', transition: 'color 0.2s',
          textTransform: 'uppercase',
        }}>
          {contactMatch || '·'}
        </div>

        {/* Number + erase row */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center', gap: 12, height: 42 }}>
          <div style={{ width: 28, flexShrink: 0 }} />
          <span style={{
            fontFamily: 'Oswald', fontWeight: 300, letterSpacing: '0.22em',
            fontSize: 28,
            color: dialNumber ? '#fff' : 'rgba(255,255,255,0.22)',
            transition: 'color 0.15s',
            flex: 1, textAlign: 'center',
          }}>
            {dialNumber || 'dial a number'}
          </span>
          <button
            onClick={() => setDialNumber(dialNumber.slice(0, -1))}
            disabled={!dialNumber}
            style={{
              width: 28, height: 28, flexShrink: 0,
              background: 'none', border: 'none', padding: 0,
              color: dialNumber ? T50 : 'rgba(255,255,255,0)',
              fontSize: 17, cursor: dialNumber ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { if (dialNumber) e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.color = dialNumber ? T50 : 'rgba(255,255,255,0)'; }}
          >
            <FontAwesomeIcon icon="delete-left" />
          </button>
        </div>
      </div>

      {/* Keys */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '8px 16px 12px', gap: 8,
      }}>
        {KEY_ROWS.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 8 }}>
            {row.map((key) => {
              const special = isSpecial(key);
              const sub = KEY_SUB[String(key)];
              return (
                <button
                  key={key}
                  onClick={() => btnClick(key)}
                  disabled={special}
                  style={{
                    flex: 1, height: 64, borderRadius: 10,
                    background: special ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${special ? 'rgba(32,134,146,0.18)' : 'rgba(32,134,146,0.18)'}`,
                    color: special ? 'rgba(255,255,255,0.45)' : '#fff',
                    fontFamily: 'Oswald', cursor: special ? 'default' : 'pointer',
                    transition: 'all 0.12s',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 2,
                  }}
                  onMouseEnter={e => {
                    if (!special) {
                      e.currentTarget.style.background = T20;
                      e.currentTarget.style.borderColor = T50;
                      e.currentTarget.style.color = T;
                    }
                  }}
                  onMouseDown={e => {
                    if (!special) {
                      e.currentTarget.style.background = T50;
                      e.currentTarget.style.borderColor = T;
                      e.currentTarget.style.transform = 'scale(0.96)';
                    }
                  }}
                  onMouseUp={e => {
                    e.currentTarget.style.background = special ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(32,134,146,0.18)';
                    e.currentTarget.style.color = special ? 'rgba(255,255,255,0.45)' : '#fff';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = special ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(32,134,146,0.18)';
                    e.currentTarget.style.color = special ? 'rgba(255,255,255,0.45)' : '#fff';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <span style={{ fontSize: 22, fontWeight: 500, lineHeight: 1 }}>{key}</span>
                  {sub && (
                    <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.14em' }}>{sub}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}

        {/* Bottom row: empty | call | empty */}
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <div style={{ flex: 1 }} />
          <button
            onClick={startCall}
            disabled={!canCall}
            style={{
              flex: 1, height: 64, borderRadius: 10,
              background: canCall ? T : 'rgba(255,255,255,0.04)',
              border: `1px solid ${canCall ? T50 : 'rgba(255,255,255,0.07)'}`,
              color: canCall ? '#fff' : 'rgba(255,255,255,0.18)',
              fontSize: 22, cursor: canCall ? 'pointer' : 'default',
              boxShadow: canCall ? `0 4px 20px ${T}55` : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (canCall) e.currentTarget.style.filter = 'brightness(1.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.filter = 'none'; }}
          >
            <FontAwesomeIcon icon="phone" />
          </button>
          <div style={{ flex: 1 }} />
        </div>
      </div>
    </div>
  );
}
