import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../hooks';
import AlertComponent from './components/Alert';

const Notifications: React.FC = () => {
  const T = useAppColor('leoassist');
  const T20 = hexAlpha(T, 0.2);
  const alerts = useSelector((state: any) => state.data.data.leoAlerts) ?? [];

  if (alerts.length === 0) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'rgba(255,255,255,0.25)', fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      <FontAwesomeIcon icon={['fas', 'bell-slash']} style={{ fontSize: 32, color: T20 }} />
      No Active Alerts
    </div>
  );

  return (
    <div style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden', padding: '8px 10px', scrollbarWidth: 'thin', scrollbarColor: `${hexAlpha(T, 0.5)} transparent` }}>
      {[...alerts].sort((a: any, b: any) => b.time - a.time).map((alert: any, key: number) => (
        <AlertComponent key={key} alert={alert} />
      ))}
    </div>
  );
};

export default Notifications;
