import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert } from '../../hooks';
import { UpdateAdvert } from './action';
import { Categories } from './data';
import { RootState, AppDispatch } from '../../store';

const T = '#208692';
const T50 = 'rgba(32,134,146,0.5)';
const T20 = 'rgba(32,134,146,0.2)';
const BG = '#0a0c10';

const useStyles = makeStyles((_theme: any) => ({
  wrapper: {
    height: '100%',
    background: BG,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
  },
  header: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px 0 16px',
    height: 56,
    background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`,
    borderBottom: `1px solid ${T50}`,
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontFamily: "'Oswald', sans-serif",
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: '0.08em',
    color: '#fff',
    '& svg': { fontSize: 16, color: T },
  },
  backBtn: {
    width: 34,
    height: 34,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    border: `1px solid ${T20}`,
    cursor: 'pointer',
    color: T,
    fontSize: 14,
    background: 'transparent',
    transition: 'background 0.2s, border-color 0.2s',
    '&:hover': { background: T20, borderColor: T50 },
  },
  body: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: 16,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 14,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.35)',
    marginBottom: 4,
  },
  card: {
    background: 'rgba(32,134,146,0.06)',
    border: `1px solid rgba(32,134,146,0.2)`,
    borderRadius: 12,
    padding: '14px 16px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 12,
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 8,
  },
  tagChip: {
    borderRadius: 20,
    padding: '4px 14px',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'all 0.18s',
    opacity: 0.45,
    '&.active': { opacity: 1, boxShadow: '0 0 8px rgba(0,0,0,0.4)' },
  },
  footer: {
    flexShrink: 0,
    display: 'flex',
    gap: 10,
    padding: '12px 16px',
    borderTop: `1px solid rgba(32,134,146,0.2)`,
    background: 'rgba(8,10,14,0.98)',
  },
  btn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    fontSize: 13,
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.18s',
    '&:disabled': { opacity: 0.35, cursor: 'not-allowed' },
  },
  cancelBtn: {
    background: 'rgba(180,40,40,0.15)',
    border: '1px solid rgba(180,40,40,0.4)',
    color: '#e07070',
    '&:hover': { background: 'rgba(180,40,40,0.3)' },
  },
  submitBtn: {
    background: T20,
    border: `1px solid ${T50}`,
    color: T,
    '&:hover': { background: T50 },
  },
}));

const inputSx = {
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '8px',
    '& fieldset': { borderColor: 'rgba(32,134,146,0.3)' },
    '&:hover fieldset': { borderColor: 'rgba(32,134,146,0.6)' },
    '&.Mui-focused fieldset': { borderColor: '#208692' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#208692' },
  '& .MuiInputBase-input': { color: '#fff' },
  '& .MuiInputAdornment-root': { color: 'rgba(32,134,146,0.8)' },
};

export default function EditAdvert() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const showAlert = useAlert();
  const player = useSelector((state: RootState) => state.data.data.player);
  const advert = useSelector((state: RootState) => state.data.data.adverts)?.[player.Source];

  const [state, setState] = useState({
    title: advert?.title ?? '',
    short: advert?.short ?? '',
    full: advert?.full ?? '',
    price: advert?.price ?? '',
  });
  const [tags, setTags] = useState<string[]>(advert?.categories ?? []);

  const textChange = (e: React.ChangeEvent<HTMLInputElement>) => setState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const toggleTag = (label: string) => setTags(prev => prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label]);

  const canSubmit = state.title.trim() && state.short.trim();

  const onSave = () => {
    dispatch(UpdateAdvert(player.Source, { ...state, id: player.Source, author: `${player.First} ${player.Last}`, number: player.Phone, time: Date.now(), categories: tags }, () => {
      showAlert('Advert Updated');
      navigate(-1);
    }));
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <span className={classes.headerTitle}>
          <FontAwesomeIcon icon={['fas', 'pen-to-square']} />
          Edit Ad
        </span>
        <button className={classes.backBtn} onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={['fas', 'arrow-left']} />
        </button>
      </div>

      <div className={classes.body}>
        <div className={classes.card}>
          <div className={classes.sectionLabel}>Basic Info</div>
          <TextField fullWidth label="Title" name="title" variant="outlined" required
            onChange={textChange} value={state.title} inputProps={{ maxLength: 32 }} sx={inputSx} />
          <TextField fullWidth label="Short Description" name="short" variant="outlined" required
            onChange={textChange} value={state.short} inputProps={{ maxLength: 64 }} sx={inputSx} />
          <TextField fullWidth label="Price — leave empty if negotiable" name="price" variant="outlined"
            onChange={textChange} value={state.price}
            InputProps={{ startAdornment: <InputAdornment position="start"><FontAwesomeIcon icon={['fas', 'dollar-sign']} style={{ color: 'rgba(32,134,146,0.8)', fontSize: 13 }} /></InputAdornment> }}
            sx={inputSx} />
        </div>

        <div className={classes.card}>
          <div className={classes.sectionLabel}>Categories</div>
          <div className={classes.tagRow}>
            {Categories.map((cat, i) => (
              <span
                key={i}
                className={`${classes.tagChip}${tags.includes(cat.label) ? ' active' : ''}`}
                style={{ background: cat.color + '33', borderColor: tags.includes(cat.label) ? cat.color : 'transparent', color: cat.color }}
                onClick={() => toggleTag(cat.label)}
              >
                {cat.label}
              </span>
            ))}
          </div>
        </div>

        <div className={classes.card}>
          <div className={classes.sectionLabel}>Full Description</div>
          <TextField fullWidth multiline rows={4} label="Details" name="full" variant="outlined"
            onChange={textChange} value={state.full} sx={inputSx} />
        </div>
      </div>

      <div className={classes.footer}>
        <button className={`${classes.btn} ${classes.cancelBtn}`} onClick={() => navigate(-1)}>Cancel</button>
        <button className={`${classes.btn} ${classes.submitBtn}`} onClick={onSave} disabled={!canSubmit}>Update Ad</button>
      </div>
    </div>
  );
}
