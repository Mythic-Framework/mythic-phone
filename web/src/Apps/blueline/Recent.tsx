import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from '../../components';
import { useAppColor, hexAlpha } from '../../hooks';
import { RootState } from '../../store';

function formatDuration(ms: number) {
  const h = Math.floor(ms / 3600000); const m = Math.floor((ms % 3600000) / 60000); const s = Math.floor((ms % 60000) / 1000); const ms2 = ms % 1000;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}:${String(ms2).padStart(3,'0')}`;
}

export default function BluelineRecent() {
  const T = useAppColor('blueline');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T08 = hexAlpha(T, 0.08);
  const T15 = hexAlpha(T, 0.15);
  const alias = useSelector((state: RootState) => state.data.data.player?.Callsign);
  const tracks = useSelector((state: RootState) => state.data.data.tracks_pd) ?? [];
  const races = useSelector((state: RootState) => (state as any).pdRace?.races ?? []).filter((r: any) => r.state == 2).sort((a: any, b: any) => b.time - a.time);
  const [selected, setSelected] = useState<any>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  if (races.length === 0) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'rgba(255,255,255,0.25)', fontSize: 13, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      <FontAwesomeIcon icon={['fas', 'trophy']} style={{ fontSize: 32, color: T20 }} />
      No Recent Trials
    </div>
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'transparent', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
      {races.map((race: any, k: number) => {
        const track = tracks.find((t: any) => t._id == race.track);
        if (!track) return null;
        const open = expanded === k;
        const participated = race.racers[alias] != null;

        return (
          <div key={k}
            style={{ borderBottom: `1px solid ${T15}`, background: 'transparent', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = T08)}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>

            <div onClick={() => setExpanded(open ? null : k)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer', userSelect: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 15, color: '#fff', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 5 }}>
                  {race.name}
                  {participated && <span style={{ color: 'gold' }}>*</span>}
                </span>
                <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{track.Name}</span>
              </div>
              <FontAwesomeIcon icon={['fas', 'chevron-right']} style={{ fontSize: 12, color: T, transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }} />
            </div>

            {open && (
              <div style={{ padding: '0 16px 12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['Host', race.host], ['Track', `${track.Name} — ${track.Distance}`]].map(([label, val]) => (
                  <div key={label as string} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{label}</span>
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{val}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
                  <button
                    onClick={() => setSelected(race)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 6, border: `1px solid ${T20}`, background: 'transparent', color: T, fontSize: 11, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
                    <FontAwesomeIcon icon={['fas', 'trophy']} /> View Results
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <Modal open={selected != null} title="Race Results" onClose={() => setSelected(null)} closeLang="Close" appColor={T}>
        {selected && (
          <div>
            {Object.keys(selected.racers).filter((r: string) => selected.racers[r].finished).sort((a: string, b: string) => selected.racers[a]?.place - selected.racers[b]?.place).map((name: string) => (
              <div key={name} style={{ padding: '8px 0', borderBottom: `1px solid ${T15}` }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff' }}>#{selected.racers[name].place} {name}</div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Fastest Lap: {formatDuration(selected.racers[name].fastest.lapEnd - selected.racers[name].fastest.lapStart)}</div>
              </div>
            ))}
            {Object.keys(selected.racers).filter((r: string) => !selected.racers[r].finished).map((name: string) => (
              <div key={name} style={{ padding: '8px 0', borderBottom: `1px solid ${T15}` }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>{name}</div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>DNF</div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
