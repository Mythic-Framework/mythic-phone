import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { endCall } from './action';
import { RootState, AppDispatch } from '../../store';

const T = '#208692';
const T50 = 'rgba(32,134,146,0.5)';
const BG = '#0a0c10';

export default function Call() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { number } = useParams<{ number: string }>();

  const contacts = useSelector((state: RootState) => state.data.data.contacts);
  const callData = useSelector((state: RootState) => state.call.call);
  const callLimited = useSelector((state: RootState) => state.call.callLimited);
  const limited = useSelector((state: RootState) => state.phone.limited);
  const isContact = contacts?.find((c: any) => c.number === number);

  const [isEnding, setIsEnding] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (callData == null) { setIsEnding(true); timer = setTimeout(() => navigate(-1), 2500); }
    return () => { if (timer) clearTimeout(timer); };
  }, [callData]);

  useEffect(() => {
    if (!isEnding && callData?.state > 0) {
      const t = setInterval(() => setElapsed(p => p + 1), 1000);
      return () => clearInterval(t);
    }
  }, [isEnding, callData?.state]);

  const formatTime = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const statusLabel = isEnding ? 'Call Ended' : callData ? (callData.state > 0 ? `Active · ${formatTime(elapsed)}` : 'Calling...') : 'Pending';
  const displayName = callLimited ? 'Unknown Number' : isContact && !limited ? isContact.name : number;

  return (
    <div style={{ height: '100%', background: `radial-gradient(ellipse at 50% 0%, rgba(32,134,146,0.15) 0%, ${BG} 70%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '14% 0 10%' }}>
      {/* Contact info */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        {isContact && !callLimited && isContact.avatar ? (
          <Avatar src={isContact.avatar} style={{ height: 96, width: 96, border: isContact.favorite ? '3px solid #f5c542' : `3px solid ${T50}`, boxShadow: `0 0 40px ${T}40` }} />
        ) : (
          <div style={{
            height: 96, width: 96, borderRadius: '50%',
            background: `radial-gradient(circle, rgba(32,134,146,0.3), rgba(32,134,146,0.08))`,
            border: `2px solid ${T50}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 40, color: T, boxShadow: `0 0 40px ${T}30`,
          }}>
            <FontAwesomeIcon icon="phone" />
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 28, color: '#fff', fontFamily: 'Oswald', fontWeight: 400, letterSpacing: '0.02em' }}>{displayName}</div>
          <div style={{ fontSize: 14, color: isEnding ? '#e05555' : callData?.state > 0 ? T : 'rgba(255,255,255,0.5)', marginTop: 8, fontFamily: 'Oswald', letterSpacing: '0.08em' }}>
            {statusLabel.toUpperCase()}
          </div>
        </div>
      </div>

      {/* End call button */}
      <button
        onClick={() => { if (callData != null && !isEnding) dispatch(endCall()); }}
        disabled={callData == null}
        style={{
          width: 68, height: 68, borderRadius: '50%',
          background: isEnding ? 'rgba(255,255,255,0.08)' : '#c0392b',
          border: 'none', color: '#fff', fontSize: 26,
          cursor: callData == null ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: isEnding ? 'none' : '0 4px 24px rgba(192,57,43,0.5)',
          transition: 'all 0.2s', transform: 'rotate(135deg)',
        }}
        onMouseEnter={e => { if (callData != null && !isEnding) e.currentTarget.style.transform = 'rotate(135deg) scale(1.1)'; }}
        onMouseLeave={e => (e.currentTarget.style.transform = 'rotate(135deg)')}
      >
        <FontAwesomeIcon icon="phone" />
      </button>
    </div>
  );
}
