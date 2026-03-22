import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Recent from './recent';
import { RootState } from '../../store';

const BG = '#0a0c10';
const T = '#208692';

export default function RecentList() {
  const calls = useSelector((state: RootState) => state.data.data.calls) ?? [];
  const [expanded, setExpanded] = useState<number>(-1);

  const handleClick = (index: number) => (_event: any, newExpanded: boolean) => {
    setExpanded(newExpanded ? index : -1);
  };

  const validCalls = calls.filter(Boolean);

  if (validCalls.length === 0) {
    return <div style={{ background: BG, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'Oswald', fontSize: 15, letterSpacing: '0.08em' }}>NO RECENT CALLS</div>;
  }

  return (
    <div style={{ background: BG, height: '100%', overflowY: 'auto' }}>
      {[...validCalls].sort((a: any, b: any) => b.time - a.time).map((call: any, key: number) => (
        <Recent key={key} expanded={expanded} index={key} call={call} onClick={handleClick(key)} />
      ))}
    </div>
  );
}
