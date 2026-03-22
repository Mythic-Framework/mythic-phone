import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nui from '../../util/Nui';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import { Modal } from '../../components';
import { RootState, AppDispatch } from '../../store';

export default function RedlinePending() {
  const showAlert = useAlert();
  const dispatch = useDispatch<AppDispatch>();
  const T = useAppColor('redline');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T08 = hexAlpha(T, 0.08);
  const T15 = hexAlpha(T, 0.15);
  const T05 = hexAlpha(T, 0.05);
  const cid = useSelector((state: RootState) => state.data.data.player?.ID);
  const alias = useSelector((state: RootState) => state.data.data.player?.Alias?.redline);
  const inRace = useSelector((state: RootState) => (state as any).race?.inRace);
  const tracks = useSelector((state: RootState) => state.data.data.tracks) ?? [];
  const races = useSelector((state: RootState) => (state as any).race?.races ?? [])
    .filter((r: any) => r.state != -1 && r.state != 2 && tracks.find((t: any) => t._id == r.track))
    .sort((a: any, b: any) => b.time - a.time);

  const [selected, setSelected] = useState<any>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const joinRace = async (id: string) => { try { const res = await (await Nui.send('JoinRace', id)).json(); showAlert(res ? 'Joined Race' : 'Unable to Join Race'); if (res) dispatch({ type: 'I_RACE', payload: { state: true } }); } catch { showAlert('Unable to Join Race'); } };
  const leaveRace = async (id: string) => { try { const res = await (await Nui.send('LeaveRace', id)).json(); showAlert(res ? 'Left Race' : 'Unable to Leave Race'); if (res) dispatch({ type: 'I_RACE', payload: { state: false } }); } catch { showAlert('Unable to Leave Race'); } };
  const cancelRace = async (id: string) => { try { const res = await (await Nui.send('CancelRace', id)).json(); showAlert(res ? 'Cancelled Race' : 'Unable to Cancel Race'); if (res) dispatch({ type: 'I_RACE', payload: { state: false } }); } catch { showAlert('Unable to Cancel Race'); } };
  const startRace = async (id: string) => { try { const res = await (await Nui.send('StartRace', id)).json(); showAlert(!res?.failed ? 'Starting Race' : res.message); } catch { showAlert('Unable to Start Race'); } };
  const endRace = async (id: string) => { try { const res = await (await Nui.send('EndRace', id)).json(); showAlert(res ? 'Race Ended' : 'Unable to End Race'); } catch { showAlert('Unable to End Race'); } };

  const btnStyle = (danger = false): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px',
    borderRadius: 6, background: 'transparent', fontSize: 11,
    fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em',
    textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.15s, border-color 0.15s',
    border: danger ? '1px solid rgba(224,82,82,0.3)' : `1px solid ${T20}`,
    color: danger ? '#e05252' : T,
  });

  if (races.length === 0) return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'rgba(255,255,255,0.25)', fontSize: 13, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', height: '100%' }}>
      <FontAwesomeIcon icon={['fas', 'clock']} style={{ fontSize: 32, color: T20 }} />
      No Pending Races
    </div>
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'transparent', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
      {races.map((race: any, k: number) => {
        const track = tracks.find((t: any) => t._id == race.track);
        const open = expanded === k;
        const isHost = race.host_id == cid;
        const isJoined = race.racers[alias] != null;

        return (
          <div key={k} style={{ borderBottom: `1px solid ${T15}`, background: 'transparent', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = T08)}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>

            <div onClick={() => setExpanded(open ? null : k)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer', userSelect: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 15, color: '#fff', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 5 }}>
                  {race.name}
                  {isJoined && <span style={{ color: 'gold' }}>*</span>}
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 4, border: `1px solid ${T50}`, color: T, background: T08, marginLeft: 6 }}>
                    {race.state == 0 ? 'Setup' : 'In-Progress'}
                  </span>
                </span>
                <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{track?.Name}</span>
              </div>
              <FontAwesomeIcon icon={['fas', 'chevron-right']} style={{ fontSize: 12, color: T, transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }} />
            </div>

            {open && (
              <div style={{ padding: '0 16px 12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['Host', `${race.host} (${race.host_src})`], ['Track', `${track?.Name} — ${track?.Distance}`], ['Laps', race.laps]].map(([label, val]) => (
                  <div key={label as string} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{label}</span>
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>{val}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
                  {Object.keys(race.racers).length > 0 && (
                    <button style={btnStyle()} onClick={() => setSelected(race)}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
                      <FontAwesomeIcon icon={['fas', 'users']} /> View Racers
                    </button>
                  )}
                  {isHost ? (
                    race.state == 0 ? (
                      <>
                        <button style={btnStyle(true)} onClick={() => cancelRace(race._id)}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(224,82,82,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(224,82,82,0.6)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(224,82,82,0.3)'; }}>
                          <FontAwesomeIcon icon={['fas', 'xmark']} /> Cancel
                        </button>
                        <button style={btnStyle()} onClick={() => startRace(race._id)}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
                          <FontAwesomeIcon icon={['fas', 'flag-checkered']} /> Start Race
                        </button>
                      </>
                    ) : (
                      <button style={btnStyle(true)} onClick={() => endRace(race._id)}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(224,82,82,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(224,82,82,0.6)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(224,82,82,0.3)'; }}>
                        <FontAwesomeIcon icon={['fas', 'stop']} /> End Race
                      </button>
                    )
                  ) : isJoined ? (
                    <button style={btnStyle(true)} onClick={() => leaveRace(race._id)}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(224,82,82,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(224,82,82,0.6)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(224,82,82,0.3)'; }}>
                      <FontAwesomeIcon icon={['fas', 'right-from-bracket']} /> Leave Race
                    </button>
                  ) : (
                    <button style={{ ...btnStyle(), opacity: (inRace || race.state != 0) ? 0.25 : 1, cursor: (inRace || race.state != 0) ? 'not-allowed' : 'pointer' }}
                      disabled={inRace || race.state != 0} onClick={() => joinRace(race._id)}
                      onMouseEnter={e => { if (!inRace && race.state == 0) { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; } }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
                      <FontAwesomeIcon icon={['fas', 'plus']} /> Join Race
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <Modal
        open={selected != null}
        title="Joined Racers"
        onClose={() => setSelected(null)}
        closeLang="Close"
        appColor={T}
      >
        {selected && (() => {
          const racerNames = Object.keys(selected.racers);
          return (
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>
                {racerNames.length} racer{racerNames.length !== 1 ? 's' : ''} registered
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {racerNames.map((name: string) => {
                  const isYou = name === alias;
                  return (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, border: `1px solid ${T15}`, background: T05 }}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', background: T20, border: `1px solid ${T50}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 13, color: T }}>
                        {name.slice(0, 2).toUpperCase()}
                      </div>
                      <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 500, fontSize: 14, color: '#fff', flex: 1 }}>{name}</span>
                      {isYou && <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'gold', border: '1px solid rgba(255,215,0,0.35)', background: 'rgba(255,215,0,0.08)', borderRadius: 4, padding: '1px 6px' }}>You</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
