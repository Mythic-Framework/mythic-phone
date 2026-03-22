import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Contact from './contact';
import { deleteContact } from './actions';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import { RootState, AppDispatch } from '../../store';

const BG = '#0a0c10';

export default function Contacts() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const showAlert = useAlert();
  const T = useAppColor('contacts');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T12 = hexAlpha(T, 0.12);
  const contacts = useSelector((state: RootState) => state.data.data.contacts) ?? [];
  const [expanded, setExpanded] = useState<string | number>(-1);
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);

  const handleClick = (index: string | number) => (_event: any, newExpanded: boolean) => {
    setExpanded(newExpanded ? index : -1);
  };

  const fit = (name: string, number: string) => {
    if (!search) return true;
    const t = search.toLowerCase();
    return name.toLowerCase().includes(t) || number.includes(t);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
    showAlert('Contact Deleted');
  };

  const sorted = (arr: any[]) =>
    [...arr].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  const favs = sorted(contacts.filter((c: any) => c.favorite && fit(c.name, c.number)));
  const others = sorted(contacts.filter((c: any) => !c.favorite && fit(c.name, c.number)));

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 8px 0 16px', height: 56,
        background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`,
        borderBottom: `1px solid ${T50}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff' }}>
          <FontAwesomeIcon icon={['fas', 'address-book']} style={{ fontSize: 16, color: T }} />
          Contacts
        </div>
        <div
          style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, background: 'transparent', transition: 'background 0.2s, border-color 0.2s' }}
          onClick={() => navigate('/apps/contacts/add')}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}
        >
          <FontAwesomeIcon icon={['fas', 'plus']} />
        </div>
      </div>

      <div style={{ padding: '12px 14px', flexShrink: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: focused ? T20 : 'rgba(255,255,255,0.05)',
          border: `1px solid ${focused ? T50 : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 14, padding: '8px 14px', transition: 'all 0.2s',
          boxShadow: focused ? `0 0 0 3px ${T12}` : 'none',
        }}>
          <FontAwesomeIcon icon="magnifying-glass" style={{ color: focused ? T : 'rgba(255,255,255,0.3)', fontSize: 13, transition: 'color 0.2s' }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            placeholder="Search contacts..."
            style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 14, fontFamily: 'Oswald', fontWeight: 300, width: '100%', caretColor: T }} />
          {search && <FontAwesomeIcon icon="xmark" onClick={() => setSearch('')} style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, cursor: 'pointer' }} />}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {contacts.length > 0 && (
          <>
            {favs.length > 0 && (
              <>
                <div style={{ padding: '6px 16px 4px', fontSize: 10, color: T, fontFamily: 'Oswald', letterSpacing: '0.12em' }}>FAVORITES</div>
                {favs.map((c: any) => (
                  <Contact key={c._id} contact={c} expanded={expanded} index={c._id} onClick={handleClick(c._id)} onDelete={() => handleDelete(c._id)} />
                ))}
              </>
            )}
            {others.length > 0 && (
              <>
                <div style={{ padding: '6px 16px 4px', fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'Oswald', letterSpacing: '0.12em' }}>ALL CONTACTS</div>
                {others.map((c: any) => (
                  <Contact key={c._id} contact={c} expanded={expanded} index={c._id} onClick={handleClick(c._id)} onDelete={() => handleDelete(c._id)} />
                ))}
              </>
            )}
          </>
        )}
      </div>

      {contacts.length === 0 && (
        <div style={{ position: 'absolute', top: 56, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10, pointerEvents: 'none' }}>
          <FontAwesomeIcon icon={['fas', 'address-book']} style={{ fontSize: 48, color: T12 }} />
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 16, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.25)' }}>NO CONTACTS</div>
        </div>
      )}
    </div>
  );
}
