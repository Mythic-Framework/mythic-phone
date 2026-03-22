import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Email from './Email';
import { useAppColor, hexAlpha } from '../../hooks';

const EmailIndex: React.FC = () => {
  const dispatch = useDispatch();
  const T = useAppColor('email');
  const T20 = hexAlpha(T, 0.2);
  const T25 = hexAlpha(T, 0.25);
  const emails = useSelector((state: any) => state.data.data.emails);
  const sorted = emails ? [...emails].sort((a: any, b: any) => b.time - a.time) : [];
  const unreadCount = sorted.filter((e: any) => e.unread).length;

  return (
    <div style={{ height: '100%', background: 'rgba(10,13,18,0.98)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px',
        background: `linear-gradient(135deg, ${T20} 0%, rgba(10,13,18,0) 100%)`,
        borderBottom: `1px solid ${T25}`,
        fontFamily: "'Oswald', sans-serif", fontSize: 19, fontWeight: 600,
        letterSpacing: '0.08em', color: '#fff',
      }}>
        <FontAwesomeIcon icon={['fas', 'envelope']} style={{ color: T, fontSize: 18 }} />
        Email
        <span style={{ marginLeft: 'auto', fontSize: 12, color: unreadCount > 0 ? T : 'rgba(255,255,255,0.25)', fontWeight: 400 }}>
          {unreadCount > 0 ? `${unreadCount} unread` : sorted.length > 0 ? `${sorted.length} messages` : ''}
        </span>
      </div>
      {sorted.length > 0 ? (
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {sorted.map((email: any, index: number) => (
            <Email key={`email-${index}`} email={email} />
          ))}
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ fontSize: 48, color: T20 }}><FontAwesomeIcon icon={['fas', 'inbox']} /></div>
          <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>No Emails</div>
        </div>
      )}
    </div>
  );
};

export default EmailIndex;
