import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, InputAdornment } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import { CreateAdvert } from './action';
import { Categories } from './data';
import { RootState, AppDispatch } from '../../store';

const BG = '#0a0c10';

export default function AddAdvert() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const showAlert = useAlert();
  const T = useAppColor('adverts');
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const T06 = hexAlpha(T, 0.06);
  const T15 = hexAlpha(T, 0.15);

  const player = useSelector((state: RootState) => state.data.data.player);
  const [state, setState] = useState({ title: '', short: '', full: '', price: '' });
  const [tags, setTags] = useState<string[]>([]);

  const textChange = (e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const toggleTag = (label: string) => setTags(prev => prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label]);

  const canSubmit = state.title.trim() && state.short.trim();

  const onSave = () => {
    dispatch(CreateAdvert(player.Source, { ...state, id: player.Source, author: `${player.First} ${player.Last}`, number: player.Phone, time: Date.now(), categories: tags }, () => {
      showAlert('Advert Created');
      navigate(-1);
    }));
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255,255,255,0.03)', borderRadius: '8px',
      '& fieldset': { borderColor: hexAlpha(T, 0.3) },
      '&:hover fieldset': { borderColor: hexAlpha(T, 0.6) },
      '&.Mui-focused fieldset': { borderColor: T },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: T },
    '& .MuiInputBase-input': { color: '#fff' },
    '& .MuiInputAdornment-root': { color: hexAlpha(T, 0.8) },
  };

  const sectionLabel: React.CSSProperties = { fontSize: 11, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 4 };
  const card: React.CSSProperties = { background: T06, border: `1px solid ${T20}`, borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 };

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 16px', height: 56, background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`, borderBottom: `1px solid ${T50}` }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff' }}>
          <FontAwesomeIcon icon={['fas', 'newspaper']} style={{ fontSize: 16, color: T }} />
          New Ad
        </span>
        <button
          onClick={() => navigate(-1)}
          style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, background: 'transparent', transition: 'background 0.2s, border-color 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}>
          <FontAwesomeIcon icon={['fas', 'arrow-left']} />
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14, scrollbarWidth: 'thin', scrollbarColor: `${T20} transparent` }}>
        {/* Basic Info */}
        <div style={card}>
          <div style={sectionLabel}>Basic Info</div>
          <TextField fullWidth label="Title" name="title" variant="outlined" required onChange={textChange} value={state.title} inputProps={{ maxLength: 32 }} sx={inputSx} />
          <TextField fullWidth label="Short Description" name="short" variant="outlined" required onChange={textChange} value={state.short} inputProps={{ maxLength: 64 }} sx={inputSx} />
          <TextField fullWidth label="Price — leave empty if negotiable" name="price" variant="outlined"
            onChange={textChange} value={state.price}
            InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={['fas', 'dollar-sign']} style={{ color: hexAlpha(T, 0.8), fontSize: 13 }} /></InputAdornment> }}
            sx={inputSx} />
        </div>

        {/* Categories */}
        <div style={card}>
          <div style={sectionLabel}>Categories</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {Categories.map((cat, i) => {
              const active = tags.includes(cat.label);
              return (
                <span
                  key={i}
                  onClick={() => toggleTag(cat.label)}
                  style={{ borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', border: `1px solid ${active ? cat.color : 'transparent'}`, background: cat.color + '33', color: cat.color, opacity: active ? 1 : 0.45, transition: 'all 0.18s', boxShadow: active ? '0 0 8px rgba(0,0,0,0.4)' : 'none' }}>
                  {cat.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* Full Description */}
        <div style={card}>
          <div style={sectionLabel}>Full Description</div>
          <TextField fullWidth multiline rows={4} label="Details" name="full" variant="outlined" onChange={textChange} value={state.full} sx={inputSx} />
        </div>
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, display: 'flex', gap: 10, padding: '12px 16px', borderTop: `1px solid ${T20}`, background: 'rgba(8,10,14,0.98)' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ flex: 1, height: 44, borderRadius: 10, fontSize: 13, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', background: 'rgba(180,40,40,0.15)', border: '1px solid rgba(180,40,40,0.4)', color: '#e07070', transition: 'all 0.18s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(180,40,40,0.3)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(180,40,40,0.15)')}>
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={!canSubmit}
          style={{ flex: 1, height: 44, borderRadius: 10, fontSize: 13, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', cursor: canSubmit ? 'pointer' : 'not-allowed', background: T20, border: `1px solid ${T50}`, color: T, opacity: canSubmit ? 1 : 0.35, transition: 'all 0.18s' }}
          onMouseEnter={e => { if (canSubmit) (e.currentTarget as HTMLElement).style.background = T50; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T20; }}>
          Post Ad
        </button>
      </div>
    </div>
  );
}
