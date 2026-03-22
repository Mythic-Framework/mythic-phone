import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import { RootState } from '../../store';

const BG = '#0a0c10';

export default function NewMessage() {
  const navigate = useNavigate();
  const showAlert = useAlert();
  const T = useAppColor('messages');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T12 = hexAlpha(T, 0.12);
  const T08 = hexAlpha(T, 0.08);
  const T07 = hexAlpha(T, 0.07);

  const contacts = useSelector((state: RootState) => state.data.data.contacts) ?? [];
  const [rawNumber, setRawNumber] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [filtered, setFiltered] = useState<any[]>(contacts);
  const [rawFocused, setRawFocused] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    setFiltered(contacts.filter((c: any) => c.name.toUpperCase().includes(searchVal.toUpperCase())));
  }, [searchVal, contacts]);

  const sendToRaw = () => {
    if (/([0-9]){3}-([0-9]){3}-([0-9]){4}/.test(rawNumber)) navigate(`/apps/messages/convo/${rawNumber}`);
    else showAlert('Not A Valid Number');
  };

  const sorted = (arr: any[]) => [...arr].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  const allSorted = sorted([...filtered.filter((c: any) => c.favorite), ...filtered.filter((c: any) => !c.favorite)]);

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>

      {/* Header — matches index.tsx pattern */}
      <div style={{
        flexShrink: 0, height: 56, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 8px 0 16px',
        background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`,
        borderBottom: `1px solid ${T50}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff' }}>
          <FontAwesomeIcon icon={['fas', 'pen-to-square']} style={{ fontSize: 16, color: T }} />
          New Message
        </div>
        <div
          onClick={() => navigate(-1)}
          style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, background: 'transparent', transition: 'background 0.2s, border-color 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}
        >
          <FontAwesomeIcon icon={['fas', 'arrow-left']} />
        </div>
      </div>

      {/* Direct number entry */}
      <div style={{ padding: '14px 14px 12px', borderBottom: `1px solid ${T12}`, flexShrink: 0 }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: 'Oswald', letterSpacing: '0.12em', marginBottom: 8 }}>SEND TO NUMBER</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 10,
            background: rawFocused ? T20 : 'rgba(255,255,255,0.04)',
            border: `1px solid ${rawFocused ? T50 : hexAlpha(T, 0.25)}`,
            borderRadius: 30, padding: '0 14px', transition: 'all 0.2s',
          }}>
            <FontAwesomeIcon icon="hashtag" style={{ color: rawFocused ? T : hexAlpha(T, 0.5), fontSize: 12, flexShrink: 0, transition: 'color 0.2s' }} />
            <input
              value={rawNumber} onChange={e => setRawNumber(e.target.value)}
              onFocus={() => setRawFocused(true)} onBlur={() => setRawFocused(false)}
              placeholder="000-000-0000"
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 13, fontFamily: 'Oswald', caretColor: T, padding: '10px 0' }}
            />
          </div>
          <button onClick={sendToRaw} style={{
            width: 44, height: 44, borderRadius: 12, border: 'none',
            background: rawNumber ? T : 'rgba(255,255,255,0.05)',
            color: rawNumber ? '#fff' : 'rgba(255,255,255,0.25)',
            fontSize: 15, cursor: rawNumber ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', flexShrink: 0,
          }}>
            <FontAwesomeIcon icon="paper-plane" />
          </button>
        </div>
      </div>

      {/* Contacts */}
      {contacts.length > 0 ? (
        <>
          {/* Search */}
          <div style={{ padding: '12px 14px 8px', flexShrink: 0, borderBottom: `1px solid ${T08}` }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: searchFocused ? T20 : 'rgba(255,255,255,0.04)',
              border: `1px solid ${searchFocused ? T50 : hexAlpha(T, 0.25)}`,
              borderRadius: 30, padding: '9px 14px', transition: 'all 0.2s',
            }}>
              <FontAwesomeIcon icon="magnifying-glass" style={{ color: searchFocused ? T : hexAlpha(T, 0.5), fontSize: 12, flexShrink: 0, transition: 'color 0.2s' }} />
              <input
                value={searchVal} onChange={e => setSearchVal(e.target.value)}
                onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
                placeholder="Search contacts..."
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 13, fontFamily: 'Oswald', caretColor: T }}
              />
              {searchVal && (
                <FontAwesomeIcon icon="xmark" onClick={() => setSearchVal('')}
                  style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, cursor: 'pointer' }} />
              )}
            </div>
          </div>

          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: 'Oswald', letterSpacing: '0.12em', padding: '8px 16px 4px', flexShrink: 0 }}>
            CONTACTS — {allSorted.length}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
            {allSorted.map((c: any) => (
              <div key={c._id} onClick={() => navigate(`/apps/messages/convo/${c.number}`)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px',
                  cursor: 'pointer', borderBottom: `1px solid ${T07}`,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = T08)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <Avatar src={c.avatar} style={{ height: 42, width: 42, background: c.color ?? T, fontFamily: 'Oswald', fontSize: 16, border: c.favorite ? '2px solid #f5c542' : `1px solid ${T50}` }}>
                  {!c.avatar && c.name.charAt(0)}
                </Avatar>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: '#fff', fontFamily: 'Oswald', letterSpacing: '0.02em' }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>{c.number}</div>
                </div>
                {c.favorite && <FontAwesomeIcon icon="star" style={{ color: '#f5c542', fontSize: 11 }} />}
                <FontAwesomeIcon icon="chevron-right" style={{ color: hexAlpha(T, 0.4), fontSize: 11 }} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.25)', fontFamily: 'Oswald', fontSize: 15, letterSpacing: '0.1em',
        }}>NO CONTACTS</div>
      )}
    </div>
  );
}
