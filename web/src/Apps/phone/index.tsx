import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Keypad from './keypad';
import RecentList from './recent-index';
import ContactsList from './contacts';
import { readCalls } from './action';
import { RootState, AppDispatch } from '../../store';
import { useAppColor, hexAlpha } from '../../hooks';

const BG = '#0a0c10';
const TABS = ['Recent', 'Keypad', 'Contacts'];
const ICONS = ['clock-rotate-left', 'hashtag', 'address-book'];

export default function Phone() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const T = useAppColor('phone');
  const T20 = hexAlpha(T, 0.2);
  const limited = useSelector((state: RootState) => state.phone.limited);
  const callData = useSelector((state: RootState) => state.call.call);
  const callHistory = useSelector((state: RootState) => state.data.data.calls) ?? [];
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (callHistory.filter((c: any) => Boolean(c) && c.unread).length > 0) dispatch(readCalls());
  }, [callHistory]);

  useEffect(() => {
    if (callData != null && callData.state !== 1) navigate(`/apps/phone/call/${callData.number}`);
  }, []);

  if (limited) return <div style={{ height: '100%', background: BG }}><Keypad /></div>;

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {TABS.map((_, i) => (
          <div key={i} style={{ height: '100%', display: activeTab === i ? 'block' : 'none' }}>
            {activeTab === i && (i === 0 ? <RecentList /> : i === 1 ? <Keypad /> : <ContactsList />)}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', height: 52, borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(8,10,14,0.97)', flexShrink: 0 }}>
        {TABS.map((label, i) => {
          const active = activeTab === i;
          return (
            <div key={i} onClick={() => setActiveTab(i)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, cursor: 'pointer', transition: 'all 0.2s', color: active ? T : 'rgba(255,255,255,0.35)', borderTop: active ? `2px solid ${T}` : '2px solid transparent' }}>
              <FontAwesomeIcon icon={ICONS[i] as any} style={{ fontSize: 14 }} />
              <span style={{ fontSize: 9, fontFamily: 'Oswald', letterSpacing: '0.1em' }}>{label.toUpperCase()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
