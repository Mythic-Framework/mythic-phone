import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteEmail } from './action';
import { useAppColor, hexAlpha } from '../../hooks';

interface Props { email: any; }

const Email: React.FC<Props> = ({ email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const T = useAppColor('email');
  const T20 = hexAlpha(T, 0.2);

  const onClick = () => navigate(`/apps/email/view/${email._id}`);

  useEffect(() => {
    let intrvl: any = null;
    if (email.flags?.expires != null) {
      intrvl = setInterval(() => {
        if (email.flags.expires < Date.now()) dispatch(DeleteEmail(email._id) as any);
      }, 2500);
    }
    return () => { clearInterval(intrvl); };
  }, []);

  const initial = email.sender?.charAt(0)?.toUpperCase() ?? '?';
  const timeStr = new Date(+email.time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

  return (
    <div
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'background 0.15s' }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <div style={{
        width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 16,
        background: email.unread ? T20 : 'rgba(255,255,255,0.08)',
        border: email.unread ? `1px solid ${T}` : '1px solid rgba(255,255,255,0.12)',
        color: email.unread ? T : 'rgba(255,255,255,0.5)',
      }}>
        {initial}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
          <span style={{
            fontFamily: "'Oswald', sans-serif", fontWeight: email.unread ? 600 : 400, fontSize: 14,
            color: email.unread ? '#fff' : 'rgba(255,255,255,0.55)', letterSpacing: '0.02em',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {email.sender}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, marginLeft: 8 }}>
            {email.flags != null && <FontAwesomeIcon icon={['fas', 'flag']} style={{ fontSize: 11, color: T }} />}
            <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{timeStr}</span>
            {email.unread && <div style={{ width: 7, height: 7, borderRadius: '50%', background: T }} />}
          </div>
        </div>
        <div style={{
          fontFamily: "'Oswald', sans-serif", fontWeight: email.unread ? 500 : 300, fontSize: 13,
          color: email.unread ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {email.subject}
        </div>
      </div>
    </div>
  );
};

export default Email;
