import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NumericFormat as NumberFormat } from 'react-number-format';
import Nui from '../../util/Nui';
import { useAlert, useMyStates, useAppColor, hexAlpha } from '../../hooks';

const PingEm: React.FC = () => {
  const hasState = useMyStates();
  const showAlert = useAlert();
  const T = useAppColor('pingem');
  const T20 = hexAlpha(T, 0.2);
  const T18 = hexAlpha(T, 0.18);
  const T40 = hexAlpha(T, 0.4);
  const T07 = hexAlpha(T, 0.07);
  const T10 = hexAlpha(T, 0.1);
  const [target, setTarget] = useState<number | string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setTarget(+e.target.value);

  const onPing = async () => {
    try {
      let res = await (await Nui.send('PingEm:Send', { target, type: false })).json();
      showAlert(res ? 'Sent Ping' : 'Unable To Send Ping');
    } catch { showAlert('Unable To Send Ping'); }
  };

  const onAnonPing = async () => {
    try {
      let res = await (await Nui.send('PingEm:Send', { target, type: true })).json();
      showAlert(res ? 'Sent Ping' : 'Unable To Send Ping');
    } catch { showAlert('Unable To Send Ping'); }
  };

  return (
    <div style={{
      height: '100%',
      background: `radial-gradient(ellipse at 20% 50%, ${T18} 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(32,134,146,0.12) 0%, transparent 55%), linear-gradient(160deg, rgba(10,13,18,0.98) 0%, rgba(16,20,28,0.97) 100%)`,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${T07} 1px, transparent 1px), linear-gradient(90deg, ${T07} 1px, transparent 1px)`, backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '12%', left: '50%', transform: 'translateX(-50%)', fontSize: 64, color: hexAlpha(T, 0.18), pointerEvents: 'none' }}>
        <FontAwesomeIcon icon="location-crosshairs" />
      </div>
      <div style={{ position: 'absolute', width: '78%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px 18px', background: 'rgba(12,16,22,0.92)', border: `1px solid ${T40}`, borderRadius: 18, backdropFilter: 'blur(20px)', boxShadow: `0 12px 48px rgba(0,0,0,0.6), 0 0 0 1px ${T10}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${T20}` }}>
          <FontAwesomeIcon icon="location-crosshairs" style={{ color: T, fontSize: 14 }} />
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: '0.12em', color: T, textTransform: 'uppercase' }}>Ping&apos;Em</span>
        </div>
        <NumberFormat fullWidth required label="Target State ID" name="target" style={{ marginBottom: 16 }} type="tel" customInput={TextField} value={target} onChange={onChange} />
        <Button fullWidth variant="contained" onClick={onPing}
          style={{ background: T, color: '#fff', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', borderRadius: 10, padding: '9px 0' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}>
          Send Ping
        </Button>
        {hasState('PHONE_VPN') && (
          <Button fullWidth variant="outlined" color="warning" onClick={onAnonPing} style={{ marginTop: 10, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.08em', borderRadius: 10, padding: '9px 0' }}>
            <FontAwesomeIcon icon={['fas', 'user-secret']} style={{ marginRight: 8 }} />
            Send Anonymous Ping
          </Button>
        )}
      </div>
    </div>
  );
};

export default PingEm;
