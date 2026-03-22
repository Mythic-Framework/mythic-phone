import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SendMessage, DeleteConvo, ReadConvo } from './actions';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import Nui from '../../util/Nui';
import { RootState, AppDispatch } from '../../store';

const BG = '#0a0c10';

export default function Convo() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { number } = useParams<{ number: string }>();
  const showAlert = useAlert();
  const T = useAppColor('messages');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);

  const contacts = useSelector((state: RootState) => state.data.data.contacts) ?? [];
  const allMsgs = useSelector((state: RootState) => state.data.data.messages) ?? [];
  const player = useSelector((state: RootState) => state.data.data.player);
  const callData = useSelector((state: RootState) => state.call.call);
  const isContact = contacts.find((c: any) => c.number === number);

  const [messages, setMessages] = useState<any[]>([]);
  const [pendingText, setPendingText] = useState('');
  const [menuAnchor, setMenuAnchor] = useState<null | { left: number; top: number }>(null);
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    setMessages([...allMsgs].filter((m: any) => m.number === number).sort((a: any, b: any) => b.time - a.time));
    if (allMsgs.filter((m: any) => m.number === number && m.unread).length > 0) {
      dispatch(ReadConvo(number!, allMsgs));
    }
  }, [allMsgs]);

  const callNumber = async () => {
    if (callData == null) {
      try {
        const res = await Nui.send<boolean>('CreateCall', { number, isAnon: false });
        if (res) navigate(`/apps/phone/call/${number}`);
        else showAlert('Unable To Start Call');
      } catch { showAlert('Unable To Start Call'); }
    }
  };

  const deleteConvo = () => {
    dispatch(DeleteConvo(number!, player?.Phone, allMsgs));
    showAlert('Conversation Deleted');
    navigate(-1);
    setMenuAnchor(null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingText.trim() !== '') {
      dispatch(SendMessage({ owner: player?.Phone, number, method: 1, time: Date.now(), message: pendingText }));
      setPendingText('');
    }
  };

  const renderMessage = (text: string) => {
    const imgRegex = /^https?:\/\/cdn\.discordapp\.com\/\S+(\.[a-zA-Z]{3})?$/i;
    const urlRegex = /(https?:\/\/\S+)/gi;
    const ircRegex = /ircinvite=(\d+)/gi;
    if (imgRegex.test(text)) return <img src={text} style={{ maxWidth: 180, borderRadius: 8, display: 'block' }} />;
    if (ircRegex.test(text)) {
      const id = text.split('=')[1];
      return <Link to={`/apps/irc/join/${id}`} style={{ color: T }}>IRC Invite: {id}</Link>;
    }
    if (urlRegex.test(text)) {
      const parts = text.split(urlRegex);
      return <>{parts.map((p, i) => urlRegex.test(p) ? <a key={i} href="#" style={{ color: T }}>{p}</a> : p)}</>;
    }
    return text;
  };

  const iconBtn = (onClick: () => void, icon: any) => (
    <button onClick={onClick} style={{
      width: 48, height: 48, borderRadius: 8, border: `1px solid ${T50}`,
      background: T20, color: T, fontSize: 16, cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.18s',
    }}
      onMouseEnter={e => (e.currentTarget.style.background = T50)}
      onMouseLeave={e => (e.currentTarget.style.background = T20)}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 8px', background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`, borderBottom: `1px solid ${T50}` }}>

        {/* Back button */}
        <div
          onClick={() => navigate(-1)}
          style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, background: 'transparent', transition: 'background 0.2s, border-color 0.2s', flexShrink: 0 }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}
        >
          <FontAwesomeIcon icon={['fas', 'arrow-left']} />
        </div>

        {/* Avatar + Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0, padding: '0 10px' }}>
          {isContact?.avatar ? (
            <Avatar src={isContact.avatar} style={{ height: 32, width: 32, flexShrink: 0, border: isContact.favorite ? '2px solid #f5c542' : `1px solid ${T50}` }} />
          ) : (
            <Avatar style={{ height: 32, width: 32, flexShrink: 0, background: isContact?.color ?? T, fontFamily: 'Oswald', fontSize: 14, border: `1px solid ${T50}` }}>
              {isContact ? isContact.name.charAt(0) : '#'}
            </Avatar>
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', fontFamily: 'Oswald', letterSpacing: '0.04em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {isContact ? isContact.name : number}
            </div>
            {isContact && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.03em' }}>{number}</div>}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <div
            onClick={callNumber}
            style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, background: 'transparent', transition: 'background 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}
          >
            <FontAwesomeIcon icon={['fas', 'phone']} />
          </div>
          <div
            onClick={e => setMenuAnchor({ left: e.currentTarget.getBoundingClientRect().left, top: e.currentTarget.getBoundingClientRect().bottom })}
            style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, background: 'transparent', transition: 'background 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}
          >
            <FontAwesomeIcon icon={['fas', 'ellipsis-vertical']} />
          </div>
        </div>

        <Menu anchorReference="anchorPosition" anchorPosition={menuAnchor ?? undefined} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}
          PaperProps={{ style: { background: 'rgba(14,18,24,0.97)', border: `1px solid ${T50}`, borderRadius: 12, backdropFilter: 'blur(20px)', minWidth: 180, boxShadow: '0 8px 40px rgba(0,0,0,0.6)' } }}>
          <MenuItem onClick={() => { navigate(isContact ? `/apps/contacts/edit/${isContact._id}` : `/apps/contacts/add/${number}`); setMenuAnchor(null); }} style={{ fontSize: 14 }}>
            {isContact ? 'View Contact' : 'Create Contact'}
          </MenuItem>
          <MenuItem onClick={deleteConvo} style={{ fontSize: 14, color: '#e05555' }}>Delete Conversation</MenuItem>
        </Menu>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column-reverse', padding: '10px 12px' }}>
        {messages.map((message: any, key: number) => {
          const isMine = message.method === 1;
          return (
            <div key={key} style={{ width: '100%', marginBottom: 14, display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%', padding: '10px 14px',
                borderRadius: isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: isMine ? hexAlpha(T, 0.22) : 'rgba(255,255,255,0.06)',
                border: isMine ? `1px solid ${T50}` : '1px solid rgba(255,255,255,0.08)',
                fontSize: 14, color: '#fff', wordBreak: 'break-word', lineHeight: 1.5,
              }}>
                {renderMessage(message.message)}
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)', marginTop: 4, paddingLeft: isMine ? 0 : 4, paddingRight: isMine ? 4 : 0 }}>
                {new Date(+message.time).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div style={{ padding: '8px 12px 10px', borderTop: `1px solid ${hexAlpha(T, 0.15)}`, flexShrink: 0, background: 'rgba(8,10,14,0.98)' }}>
        <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <textarea
            value={pendingText}
            onChange={e => setPendingText(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="Write a message..."
            rows={2}
            style={{
              flex: 1, background: inputFocused ? T20 : 'rgba(255,255,255,0.04)',
              border: `1px solid ${inputFocused ? T50 : hexAlpha(T, 0.2)}`,
              borderRadius: 14, padding: '10px 12px', color: '#fff', resize: 'none',
              fontSize: 13, fontFamily: 'Oswald', outline: 'none', caretColor: T,
              transition: 'all 0.2s', lineHeight: '1.4',
            }}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSubmit(e as any); } }}
          />
          <button type="submit" disabled={!pendingText.trim()} style={{
            width: 38, height: 38, borderRadius: 10, border: 'none', flexShrink: 0,
            background: pendingText.trim() ? T : 'rgba(255,255,255,0.05)',
            color: pendingText.trim() ? '#fff' : 'rgba(255,255,255,0.2)',
            fontSize: 14, cursor: pendingText.trim() ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', boxShadow: pendingText.trim() ? `0 3px 12px ${T}60` : 'none',
          }}>
            <FontAwesomeIcon icon="paper-plane" />
          </button>
        </form>
      </div>
    </div>
  );
}
