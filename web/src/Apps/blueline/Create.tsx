import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import Nui from '../../util/Nui';
import { Modal, Confirm } from '../../components';
import { TrackTypes } from './trackTypes';
import { RootState, AppDispatch } from '../../store';

export default function BluelineCreate() {
  const dispatch = useDispatch<AppDispatch>();
  const showAlert = useAlert();
  const T = useAppColor('blueline');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T08 = hexAlpha(T, 0.08);
  const T15 = hexAlpha(T, 0.15);
  const tracks = useSelector((state: RootState) => state.data.data.tracks_pd) ?? [];
  const createState = useSelector((state: RootState) => (state as any).pdRace?.creator);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<any>(null);
  const [resetting, setResetting] = useState<any>(null);

  const onCreate = async () => {
    try {
      const res = await (await Nui.send('CreateTrackPD')).json();
      showAlert(res ? 'Creator Started' : 'Unable to Start Creator');
      if (res) dispatch({ type: 'PD_RACE_STATE_CHANGE', payload: { state: { checkpoints: 0, distance: 0, type: 'lap' } } });
    } catch { showAlert('Unable to Start Creator'); }
  };
  const onCancel = () => { Nui.send('StopCreatorPD').catch(() => {}); dispatch({ type: 'PD_RACE_STATE_CHANGE', payload: { state: null } }); };
  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await (await Nui.send('FinishCreatorPD', { name: (e.target as any).name.value, type: (e.target as any).type.value })).json();
      showAlert(res ? 'Track Created' : 'Unable to Create Track');
    } catch { showAlert('Unable to Create Track'); }
    setSaving(false);
  };
  const onDelete = async () => {
    try { const res = await (await Nui.send('DeleteTrackPD', deleting)).json(); showAlert(res ? 'Track Deleted' : 'Unable to Delete Track'); } catch { showAlert('Unable to Delete Track'); }
    setDeleting(null); setExpanded(null);
  };
  const onReset = async () => {
    try { const res = await (await Nui.send('ResetTrackHistoryPD', resetting)).json(); showAlert(res ? 'Track History Reset' : 'Unable to Reset'); } catch { showAlert('Unable to Reset'); }
    setResetting(null);
  };

  const inputSx = {
    mb: '10px',
    '& .MuiOutlinedInput-root': { background: 'rgba(255,255,255,0.03)', borderRadius: '8px', '& fieldset': { borderColor: hexAlpha(T, 0.3) }, '&:hover fieldset': { borderColor: hexAlpha(T, 0.6) }, '&.Mui-focused fieldset': { borderColor: T } },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: T },
    '& .MuiInputBase-input': { color: '#fff' },
  };

  const primaryBtn: React.CSSProperties = { width: '100%', padding: '10px 0', marginBottom: 8, background: T20, border: `1px solid ${T50}`, color: T, fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 8, cursor: 'pointer', transition: 'background 0.2s' };
  const secondaryBtn: React.CSSProperties = { width: '100%', padding: '10px 0', marginBottom: 8, background: 'rgba(180,40,40,0.15)', border: '1px solid rgba(180,40,40,0.4)', color: '#e07070', fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 8, cursor: 'pointer', transition: 'background 0.2s' };
  const smallBtn: React.CSSProperties = { padding: '4px 10px', background: 'transparent', border: `1px solid ${T20}`, color: T, fontFamily: "'Oswald', sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 6, cursor: 'pointer', transition: 'background 0.15s' };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'transparent', overflowY: 'auto', padding: 10, scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
      {createState == null
        ? <button style={primaryBtn} onClick={onCreate}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T50)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = T20)}>
            Create Track
          </button>
        : <>
            <button style={primaryBtn} onClick={() => setSaving(true)}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T50)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = T20)}>
              Save Track
            </button>
            <button style={secondaryBtn} onClick={onCancel}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(180,40,40,0.3)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(180,40,40,0.15)')}>
              Cancel Create
            </button>
          </>
      }

      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tracks.map((track: any, k: number) => {
          const open = expanded === k;
          return (
            <div key={k} style={{ background: hexAlpha(T, 0.06), border: `1px solid ${T15}`, borderRadius: 10, overflow: 'hidden' }}>
              <div onClick={() => setExpanded(open ? null : k)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer', userSelect: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff', letterSpacing: '0.04em' }}>{track.Name}</span>
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{track.Distance}</span>
                </div>
                <FontAwesomeIcon icon={['fas', 'chevron-right']} style={{ fontSize: 11, color: T, transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }} />
              </div>
              {open && (
                <div style={{ padding: '0 14px 12px', borderTop: `1px solid ${T15}` }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '10px 0 12px' }}>
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Type</span>
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{TrackTypes[track.Type] ?? track.Type}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <button style={smallBtn} onClick={() => setResetting(track._id)}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
                      Reset History
                    </button>
                    <button style={{ ...smallBtn, borderColor: 'rgba(224,82,82,0.3)', color: '#e05252' }} onClick={() => setDeleting(track._id)}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(224,82,82,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(224,82,82,0.6)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(224,82,82,0.3)'; }}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Confirm title="Delete Track?" open={deleting != null} confirm="Yes" decline="No" onConfirm={onDelete} onDecline={() => setDeleting(null)} />
      <Confirm title="Reset Track History?" open={resetting != null} confirm="Yes" decline="No" onConfirm={onReset} onDecline={() => setResetting(null)} />

      <Modal form open={saving} title="Create New Track" onClose={() => setSaving(false)} onAccept={onSave} submitLang="Save Track" closeLang="Cancel" appColor={T}>
        <TextField fullWidth required label="Name" name="name" variant="outlined" sx={inputSx} />
        <TextField select fullWidth required variant="outlined" label="Type" name="type" defaultValue="laps" sx={inputSx}>
          {Object.keys(TrackTypes).map(k => <MenuItem key={k} value={k}>{TrackTypes[k]}</MenuItem>)}
        </TextField>
      </Modal>
    </div>
  );
}
