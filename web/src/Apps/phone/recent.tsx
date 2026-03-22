import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nui from '../../util/Nui';
import { useAlert } from '../../hooks';
import { RootState } from '../../store';

const T = '#208692';
const T50 = 'rgba(32,134,146,0.5)';
const T20 = 'rgba(32,134,146,0.2)';

interface Props { call: any; expanded: number; index: number; onClick: (_event: any, newExpanded: boolean) => void; }

export default function RecentCall({ call, expanded, index, onClick }: Props) {
  const navigate = useNavigate();
  const showAlert = useAlert();
  const contacts = useSelector((state: RootState) => state.data.data.contacts) ?? [];
  const callData = useSelector((state: RootState) => state.call.call);
  const isContact = contacts.find((c: any) => c.number === call.number);
  const isOpen = expanded === index;
  const isLimited = call?.limited || call?.anonymous;

  const callContact = async () => {
    if (callData == null && !isLimited) {
      try {
        const res = await Nui.send<boolean>('CreateCall', { number: call.number, isAnon: false });
        if (res) navigate(`/apps/phone/call/${call.number}`);
        else showAlert('Unable To Start Call');
      } catch { showAlert('Unable To Start Call'); }
    }
  };

  const getMissed = (c: any) => c.duration >= -1;
  const getOutgoing = (c: any) => c.method;
  const missed = getMissed(call);
  const outgoing = getOutgoing(call);

  const callIcon = missed
    ? <FontAwesomeIcon icon={outgoing ? 'phone-arrow-up-right' : 'phone-missed'} style={{ color: '#e05555', fontSize: 11 }} />
    : <FontAwesomeIcon icon={outgoing ? 'phone-arrow-up-right' : 'phone-arrow-down-left'} style={{ color: outgoing ? T : '#5ec750', fontSize: 11 }} />;

  if (isLimited && outgoing) return null;

  const actionBtn = (icon: string, label: string, action: () => void) => (
    <div onClick={action} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, padding: '10px 0', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', transition: 'color 0.15s' }}
      onMouseEnter={e => (e.currentTarget.style.color = T)}
      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
    >
      <FontAwesomeIcon icon={icon as any} style={{ fontSize: 17 }} />
      <span style={{ fontSize: 10, fontFamily: 'Oswald', letterSpacing: '0.06em' }}>{label.toUpperCase()}</span>
    </div>
  );

  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: isOpen ? 'rgba(32,134,146,0.07)' : 'transparent', transition: 'background 0.2s' }}>
      <div onClick={e => !isLimited && onClick(e, !isOpen)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', cursor: isLimited ? 'default' : 'pointer' }}>
        {!isLimited && isContact?.avatar ? (
          <Avatar src={isContact.avatar} style={{ height: 40, width: 40, border: isContact.favorite ? '2px solid #f5c542' : `1px solid ${T50}` }} />
        ) : (
          <Avatar style={{ height: 40, width: 40, background: isContact?.color ?? 'rgba(255,255,255,0.08)', fontFamily: 'Oswald', fontSize: 16, border: 'none' }}>
            {isLimited ? '?' : (isContact ? isContact.name.charAt(0) : '#')}
          </Avatar>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: missed ? '#e05555' : '#fff', fontFamily: 'Oswald', letterSpacing: '0.02em' }}>
            {!isLimited && isContact ? isContact.name : 'Unknown Caller'}
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 2 }}>
            {callIcon}
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{!isLimited ? call.number : 'Unknown Number'}</span>
          </div>
        </div>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{new Date(+call.time).toLocaleDateString()}</span>
        {!isLimited && <FontAwesomeIcon icon={isOpen ? 'chevron-up' : 'chevron-down'} style={{ color: 'rgba(255,255,255,0.25)', fontSize: 10 }} />}
      </div>
      {isOpen && !isLimited && (
        <div style={{ display: 'flex', padding: '4px 16px 12px', borderTop: `1px solid ${T20}` }}>
          {actionBtn('phone', 'Call', callContact)}
          {actionBtn('comment-sms', 'Text', () => navigate(`/apps/messages/convo/${call.number}`))}
          {isContact
            ? actionBtn('user-pen', 'Edit', () => navigate(`/apps/contacts/edit/${isContact._id}`))
            : actionBtn('user-plus', 'Add', () => navigate(`/apps/contacts/add/${call.number}`))
          }
        </div>
      )}
    </div>
  );
}
