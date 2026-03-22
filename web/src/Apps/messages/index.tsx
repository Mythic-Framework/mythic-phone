import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Message from './message';
import { RootState } from '../../store';
import { useAppColor, hexAlpha } from '../../hooks';

const BG = '#0a0c10';

export default function Messages() {
  const navigate = useNavigate();
  const T = useAppColor('messages');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T12 = hexAlpha(T, 0.12);
  const allMsgs = useSelector((state: RootState) => state.data.data.messages) ?? [];
  const [convos, setConvos] = useState<any[]>([]);

  useEffect(() => {
    const tConv: Record<string, any> = {};
    [...allMsgs].sort((a: any, b: any) => b.time - a.time).forEach((msg: any) => {
      if (!tConv[msg.number] || msg.time > tConv[msg.number].time) tConv[msg.number] = msg;
    });
    setConvos(Object.values(tConv).sort((a, b) => b.time - a.time));
  }, [allMsgs]);

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 16px', height: 56, background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`, borderBottom: `1px solid ${T50}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff' }}>
          <FontAwesomeIcon icon={['fas', 'comments']} style={{ fontSize: 16, color: T }} />
          Messages
        </div>
        <div style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, background: 'transparent', transition: 'background 0.2s' }}
          onClick={() => navigate('/apps/messages/new')}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
          <FontAwesomeIcon icon={['fas', 'plus']} />
        </div>
      </div>
      <div style={{ padding: '8px 16px', flexShrink: 0, borderBottom: `1px solid ${hexAlpha(T, 0.1)}` }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em' }}>
          {convos.length} CONVERSATION{convos.length !== 1 ? 'S' : ''}
        </span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
        {convos.length > 0 ? (
          convos.map((convo: any) => (
            <Message key={convo.number} message={convo} unread={allMsgs.filter((m: any) => m.number === convo.number && m.unread).length} />
          ))
        ) : (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, pointerEvents: 'none' }}>
            <FontAwesomeIcon icon={['fas', 'comments']} style={{ fontSize: 48, color: T12 }} />
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.25)' }}>NO MESSAGES</div>
          </div>
        )}
      </div>
    </div>
  );
}
