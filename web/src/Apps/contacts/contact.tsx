import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nui from '../../util/Nui';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import { RootState } from '../../store';

interface Props {
  contact: any;
  expanded: string | number;
  index: string | number;
  onClick: (_event: any, newExpanded: boolean) => void;
  onDelete?: () => void;
}

export default function Contact({ contact, expanded, index, onClick, onDelete }: Props) {
  const navigate = useNavigate();
  const T = useAppColor('contacts');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T07 = hexAlpha(T, 0.07);
  const callData = useSelector((state: RootState) => state.call.call);
  const isOpen = expanded === index;

  const callContact = async () => {
    if (callData == null) {
      try {
        const res = await Nui.send<boolean>('CreateCall', { number: contact.number, isAnon: false });
        if (res) navigate(`/apps/phone/call/${contact.number}`);
      } catch {}
    }
  };

  const actionBtn = (icon: string, label: string, onClickFn: () => void, color?: string) => (
    <div
      onClick={onClickFn}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, padding: '10px 0', cursor: 'pointer', color: color ?? 'rgba(255,255,255,0.7)', transition: 'color 0.15s' }}
      onMouseEnter={e => (e.currentTarget.style.color = color ?? T)}
      onMouseLeave={e => (e.currentTarget.style.color = color ?? 'rgba(255,255,255,0.7)')}
    >
      <FontAwesomeIcon icon={icon as any} style={{ fontSize: 18 }} />
      <span style={{ fontSize: 10, fontFamily: 'Oswald', letterSpacing: '0.06em' }}>{label.toUpperCase()}</span>
    </div>
  );

  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      background: isOpen ? T07 : 'transparent',
      transition: 'background 0.2s',
    }}>
      <div
        onClick={e => onClick(e, !isOpen)}
        style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', cursor: 'pointer', gap: 12 }}
      >
        {contact.avatar ? (
          <Avatar src={contact.avatar} style={{ height: 42, width: 42, border: contact.favorite ? '2px solid #f5c542' : `2px solid ${T50}` }} />
        ) : (
          <Avatar style={{ height: 42, width: 42, background: contact.color ?? T, border: contact.favorite ? '2px solid #f5c542' : 'none', fontSize: 18, fontFamily: 'Oswald' }}>
            {contact.name.charAt(0)}
          </Avatar>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, color: '#fff', fontFamily: 'Oswald', letterSpacing: '0.02em' }}>{contact.name}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{contact.number}</div>
        </div>
        {contact.favorite && <FontAwesomeIcon icon="star" style={{ color: '#f5c542', fontSize: 11 }} />}
        <FontAwesomeIcon icon='chevron-right' style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, transition: 'transform 0.2s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }} />
      </div>
      {isOpen && (
        <div style={{ display: 'flex', padding: '4px 16px 14px', borderTop: `1px solid ${T20}` }}>
          {actionBtn('phone', 'Call', callContact)}
          {actionBtn('comment-sms', 'Text', () => navigate(`/apps/messages/convo/${contact.number}`))}
          {actionBtn('user-pen', 'Edit', () => navigate(`/apps/contacts/edit/${contact._id}`))}
          {onDelete && actionBtn('user-minus', 'Delete', onDelete, '#e05555')}
        </div>
      )}
    </div>
  );
}
