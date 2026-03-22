import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Contact from '../contacts/contact';
import { RootState } from '../../store';

const BG = '#0a0c10';
const T = '#208692';

export default function PhoneContacts() {
  const contacts = useSelector((state: RootState) => state.data.data.contacts) ?? [];
  const [expanded, setExpanded] = useState<string | number>(-1);

  const handleClick = (index: string | number) => (_event: any, newExpanded: boolean) => {
    setExpanded(newExpanded ? index : -1);
  };

  const favs = [...contacts].filter((c: any) => c.favorite).sort((a: any, b: any) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  const others = [...contacts].filter((c: any) => !c.favorite).sort((a: any, b: any) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  if (contacts.length === 0) {
    return <div style={{ background: BG, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'Oswald', fontSize: 15, letterSpacing: '0.08em' }}>NO CONTACTS</div>;
  }

  return (
    <div style={{ background: BG, height: '100%', overflowY: 'auto' }}>
      {favs.length > 0 && (
        <>
          <div style={{ padding: '6px 16px 4px', fontSize: 10, color: T, fontFamily: 'Oswald', letterSpacing: '0.12em' }}>FAVORITES</div>
          {favs.map((c: any) => <Contact key={c._id} contact={c} expanded={expanded} index={c._id} onClick={handleClick(c._id)} />)}
        </>
      )}
      {others.length > 0 && (
        <>
          <div style={{ padding: '6px 16px 4px', fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'Oswald', letterSpacing: '0.12em' }}>ALL CONTACTS</div>
          {others.map((c: any) => <Contact key={c._id} contact={c} expanded={expanded} index={c._id} onClick={handleClick(c._id)} />)}
        </>
      )}
    </div>
  );
}
