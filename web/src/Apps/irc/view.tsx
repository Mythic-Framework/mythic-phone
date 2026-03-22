import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import Nui from '../../util/Nui';
import { Slugify } from '../../util/Parser';
import { LightboxImage, Confirm, Loader } from '../../components';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';

function renderMessage(text: string, T: string, showAlert: (msg: string) => void): React.ReactNode[] {
  const imgurRegex = /((https?:\/\/(www\.)?(i\.)?imgur\.com\/[a-zA-Z\d]+)(\.png|\.jpg|\.jpeg|\.gif)?)/gi;
  const videoRegex = /(https?:\/\/\S+\.(?:mp4))/gi;
  const urlRegex = /(https?:\/\/\S+)/gi;

  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  const tryMatch = (regex: RegExp, handler: (match: string, k: number) => React.ReactNode): boolean => {
    regex.lastIndex = 0;
    const m = regex.exec(remaining);
    if (!m) return false;
    if (m.index > 0) parts.push(<span key={key++}>{remaining.slice(0, m.index)}</span>);
    parts.push(handler(m[0], key++));
    remaining = remaining.slice(m.index + m[0].length);
    return true;
  };

  while (remaining.length > 0) {
    if (tryMatch(imgurRegex, (url, k) => <img key={k} src={url} style={{ display: 'block', maxWidth: 200, borderRadius: 6, marginTop: 4 }} alt="" />)) continue;
    if (tryMatch(videoRegex, (url, k) => <ReactPlayer key={k} volume={0.25} width="100%" controls url={url} />)) continue;
    if (tryMatch(urlRegex, (url, k) => (
      <a key={k} style={{ color: T, textDecoration: 'underline', cursor: 'pointer' }}
        onClick={() => { navigator.clipboard.writeText(url); showAlert('Link Copied To Clipboard'); }}>{url}</a>
    ))) continue;
    parts.push(<span key={key++}>{remaining}</span>);
    break;
  }

  return parts;
}

const IRCView: React.FC = () => {
  const showAlert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const T = useAppColor('irc');
  const T20 = hexAlpha(T, 0.2);
  const T10 = hexAlpha(T, 0.1);
  const T08 = hexAlpha(T, 0.08);
  const T30 = hexAlpha(T, 0.3);
  const T40 = hexAlpha(T, 0.4);

  const { channel } = useParams<{ channel: string }>();
  const allMsgs = useSelector((state: any) => state.data.data[`irc-${Slugify(channel!)}`]);
  const player = useSelector((state: any) => state.data.data.player);
  const channelData = useSelector((state: any) => state.data.data.ircChannels).find((c: any) => c.slug === channel);

  const [leaveOpen, setLeaveOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pendingText, setPendingText] = useState('');

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const raw = await Nui.send('GetIRCMessages', Slugify(channel!));
        if (!raw) { setLoading(false); return; }
        const text = await raw.text();
        if (!text || text.trim() === '') { setLoading(false); return; }
        const res = JSON.parse(text);
        if (res) {
          setMessages(res);
          dispatch({ type: 'SET_DATA', payload: { type: `irc-${channel}`, data: res } });
        }
      } catch (err) { console.log(err); }
      setLoading(false);
    };

    if (allMsgs) {
      // Spread into a new array before sorting — .sort() mutates in place and
      // allMsgs is a direct reference to Redux state, which triggers the
      // "state mutation detected between dispatches" invariant error.
      setMessages(
        [...allMsgs]
          .filter((m: any) => m.time >= channelData?.joined)
          .sort((a: any, b: any) => b.time - a.time)
      );
    } else {
      if (channelData) getMessages();
    }
  }, [allMsgs]);

  const onLeave = async () => {
    try {
      const res = await (await Nui.send('LeaveIRCChannel', channel)).json();
      if (res) {
        showAlert('You Left The Channel');
        navigate(-1);
        dispatch({ type: 'REMOVE_DATA', payload: { type: 'ircChannels', id: channel, key: 'slug' } });
      } else showAlert('Unable To Leave Channel');
    } catch (err) { console.log(err); showAlert('Unable To Leave Channel'); }
  };

  const onSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pendingText.trim() !== '') {
      try {
        const msg = { message: pendingText, channel, time: Date.now(), from: player.Alias.irc };
        const res = await (await Nui.send('SendIRCMessage', msg)).json();
        if (res) {
          dispatch({ type: 'ADD_DATA', payload: { type: `irc-${channel}`, first: true, data: msg } });
          setPendingText('');
        } else showAlert('Unable To Send Message');
      } catch (err) { console.log(err); showAlert('Unable To Send Message'); }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSubmit(); }
  };

  if (channelData == null) return (
    <div style={{ height: '100%', background: 'rgba(10,13,18,0.98)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Oswald', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
      Invalid Channel
    </div>
  );

  return (
    <div style={{ height: '100%', background: 'rgba(10,13,18,0.98)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px 0 4px', height: 52, background: `linear-gradient(135deg, ${T20} 0%, rgba(10,13,18,0) 100%)`, borderBottom: `1px solid ${T20}` }}>
        <div
          onClick={() => navigate(-1)}
          style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, cursor: 'pointer', color: 'rgba(255,255,255,0.4)', flexShrink: 0, transition: 'color 0.15s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#fff')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)')}>
          <FontAwesomeIcon icon={['fas', 'arrow-left']} style={{ fontSize: 15 }} />
        </div>
        <span style={{ flex: 1, fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 16, color: T, letterSpacing: '0.08em' }}>
          #{channelData.slug}
        </span>
        <div
          onClick={() => setLeaveOpen(true)}
          style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, cursor: 'pointer', color: 'rgba(224,85,85,0.6)', border: '1px solid rgba(224,85,85,0.2)', fontSize: 14, flexShrink: 0, transition: 'all 0.15s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(224,85,85,0.1)'; (e.currentTarget as HTMLElement).style.color = '#e05555'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(224,85,85,0.5)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(224,85,85,0.6)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(224,85,85,0.2)'; }}>
          <FontAwesomeIcon icon="right-from-bracket" />
        </div>
      </div>

      {/* Messages */}
      {loading ? (
        <div style={{ flex: 1 }}><Loader text="Loading Messages" /></div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column-reverse', overflowX: 'hidden', overflowY: 'auto', padding: '8px 0', scrollbarWidth: 'thin', scrollbarColor: `${T20} transparent` }}>
          {messages.map((message: any, key: number) => {
            const isSelf = message.from === player.Alias?.irc;
            return (
              <div key={`msg-${key}`}
                style={{ display: 'flex', gap: 10, padding: '6px 14px', transition: 'background 0.1s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: T20, border: `1px solid ${T30}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 13, color: T, flexShrink: 0, marginTop: 2 }}>
                  {(message.from ?? '?').charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 13, color: isSelf ? '#fff' : T, letterSpacing: '0.03em' }}>
                      {message.from}
                    </span>
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.02em' }}>
                      {new Date(+message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, wordBreak: 'break-word', fontFamily: 'sans-serif' }}>
                    {renderMessage(message.message, T, showAlert)}
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ textAlign: 'center', padding: '20px 16px', fontFamily: "'Oswald', sans-serif", fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: hexAlpha(T, 0.4), borderBottom: `1px solid ${T08}`, marginBottom: 4 }}>
            — #{channelData.slug} —
          </div>
        </div>
      )}

      {/* Input */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'stretch', gap: 8, padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
        <textarea
          style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 13, fontFamily: 'sans-serif', resize: 'none', outline: 'none', lineHeight: 1.5, transition: 'border-color 0.15s' }}
          placeholder={`Message #${channelData.slug}`}
          rows={2}
          value={pendingText}
          onChange={e => setPendingText(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={e => (e.currentTarget.style.borderColor = T40)}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />
        <div
          onClick={() => onSubmit()}
          style={{ width: 40, borderRadius: 8, border: `1px solid ${T40}`, background: T10, color: T, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: pendingText.trim() === '' ? 'default' : 'pointer', fontSize: 16, flexShrink: 0, opacity: pendingText.trim() === '' ? 0.25 : 1, pointerEvents: pendingText.trim() === '' ? 'none' : 'auto', transition: 'all 0.15s' }}
          onMouseEnter={e => { if (pendingText.trim()) (e.currentTarget as HTMLElement).style.background = T20; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T10; }}>
          <FontAwesomeIcon icon="paper-plane" />
        </div>
      </div>

      <Confirm title="Leave Channel?" open={leaveOpen} confirm="Leave" decline="Cancel" onConfirm={onLeave} onDecline={() => setLeaveOpen(false)} />
    </div>
  );
};

export default IRCView;
