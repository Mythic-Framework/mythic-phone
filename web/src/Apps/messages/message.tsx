import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { RootState } from '../../store';
import { useAppColor, hexAlpha } from '../../hooks';

interface Props { message: any; unread: number; }

export default function MessagePreview({ message, unread }: Props) {
  const navigate = useNavigate();
  const T = useAppColor('messages');
  const T50 = hexAlpha(T, 0.5);
  const T06 = hexAlpha(T, 0.06);
  const T10 = hexAlpha(T, 0.10);
  const contacts = useSelector((state: RootState) => state.data.data.contacts) ?? [];
  const isContact = contacts.find((c: any) => c.number === message.number);
  const displayName = isContact ? isContact.name : message.number;
  const initials = isContact ? isContact.name.charAt(0) : '#';

  return (
    <div
      onClick={() => navigate(`/apps/messages/convo/${message.number}`)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px',
        background: unread > 0 ? T06 : 'transparent',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        cursor: 'pointer', transition: 'background 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = T10)}
      onMouseLeave={e => (e.currentTarget.style.background = unread > 0 ? T06 : 'transparent')}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        {isContact?.avatar ? (
          <Avatar src={isContact.avatar} style={{ height: 48, width: 48, border: isContact.favorite ? '2px solid #f5c542' : `2px solid ${T50}` }} />
        ) : (
          <Avatar style={{ height: 48, width: 48, background: isContact?.color ?? T, fontFamily: 'Oswald', fontSize: 18, border: isContact?.favorite ? '2px solid #f5c542' : `1px solid ${T50}` }}>
            {initials}
          </Avatar>
        )}
        {unread > 0 && (
          <div style={{
            position: 'absolute', top: -3, right: -3,
            minWidth: 17, height: 17, borderRadius: 9,
            background: '#e05555', color: '#fff',
            fontSize: 10, fontFamily: 'Oswald', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 4px', border: '1.5px solid #0a0c10',
          }}>{unread}</div>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <span style={{ fontSize: 15, color: unread > 0 ? '#fff' : 'rgba(255,255,255,0.8)', fontFamily: 'Oswald', fontWeight: unread > 0 ? 700 : 400, letterSpacing: '0.03em' }}>
            {displayName}
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', flexShrink: 0, marginLeft: 8 }}>
            {new Date(+message.time).toLocaleDateString()}
          </span>
        </div>
        <div style={{ fontSize: 12, color: unread > 0 ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {message.message}
        </div>
      </div>
      {unread > 0 && (
        <div style={{ width: 3, height: 36, borderRadius: 2, background: T, flexShrink: 0 }} />
      )}
    </div>
  );
}
