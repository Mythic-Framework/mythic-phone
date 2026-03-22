import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Switch } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createContact } from './actions';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import { RootState, AppDispatch } from '../../store';

const BG = '#0a0c10';

export default function AddContact() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { number: paramNumber } = useParams<{ number?: string }>();
  const showAlert = useAlert();
  const T = useAppColor('contacts');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const contacts = useSelector((state: RootState) => state.data.data.contacts) ?? [];
  const [contact, setContact] = useState({ name: '', number: paramNumber ?? '', favorite: false, color: '#1a7cc1', avatar: '' });

  const onChange = (e: any) => {
    const { name, value, checked, type } = e.target;
    setContact(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contacts.find((c: any) => c.number === contact.number)) {
      showAlert('Contact Already Exists For This Number');
    } else {
      dispatch(createContact(contact));
      showAlert(`${contact.name} Created`);
      navigate(-1);
    }
  };

  const canSubmit = contact.name.trim() && contact.number.trim();

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '8px',
      '& fieldset': { borderColor: hexAlpha(T, 0.3) },
      '&:hover fieldset': { borderColor: hexAlpha(T, 0.6) },
      '&.Mui-focused fieldset': { borderColor: T },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: T },
    '& .MuiInputBase-input': { color: '#fff' },
  };

  const cardStyle: React.CSSProperties = {
    background: hexAlpha(T, 0.06),
    border: `1px solid ${hexAlpha(T, 0.2)}`,
    borderRadius: 12,
    padding: '14px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  };

  const sectionLabelStyle: React.CSSProperties = {
    fontSize: 11,
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.35)',
    marginBottom: 4,
  };

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 8px 0 16px', height: 56,
        background: `linear-gradient(135deg, ${T20} 0%, rgba(8,10,14,0.95) 100%)`,
        borderBottom: `1px solid ${T50}`,
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.08em', color: '#fff' }}>
          <FontAwesomeIcon icon={['fas', 'user-plus']} style={{ fontSize: 16, color: T }} />
          New Contact
        </span>
        <button
          onClick={() => navigate(-1)}
          style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T20}`, cursor: 'pointer', color: T, fontSize: 14, background: 'transparent', transition: 'background 0.2s, border-color 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T20; }}
        >
          <FontAwesomeIcon icon={['fas', 'arrow-left']} />
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Contact info card */}
        <div style={cardStyle}>
          <div style={sectionLabelStyle}>Contact Info</div>
          <TextField fullWidth label="Name" name="name" variant="outlined" required
            onChange={onChange} value={contact.name} sx={inputSx} />
          <TextField fullWidth label="Number" name="number" variant="outlined" required
            onChange={onChange} value={contact.number} inputProps={{ maxLength: 12 }} sx={inputSx} />
        </div>

        {/* Appearance card */}
        <div style={cardStyle}>
          <div style={sectionLabelStyle}>Appearance</div>
          <TextField fullWidth label="Avatar URL" name="avatar" variant="outlined"
            onChange={onChange} value={contact.avatar} sx={inputSx} />
          <TextField fullWidth label="Color (hex)" name="color" variant="outlined"
            onChange={onChange} value={contact.color}
            InputProps={{
              startAdornment: contact.color ? (
                <span style={{ width: 14, height: 14, borderRadius: 3, background: contact.color, marginRight: 8, flexShrink: 0, border: '1px solid rgba(255,255,255,0.2)' }} />
              ) : undefined,
            }}
            sx={inputSx} />
        </div>

        {/* Options card */}
        <div style={{ ...cardStyle, gap: 0 }}>
          <div style={sectionLabelStyle}>Options</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8 }}>
            <div>
              <div style={{ color: '#fff', fontFamily: "'Oswald', sans-serif", fontSize: 14, letterSpacing: '0.03em' }}>Favorite</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 2 }}>Pin to top of contacts</div>
            </div>
            <Switch checked={contact.favorite} onChange={onChange} name="favorite" size="small"
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: T },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: T },
              }}
            />
          </div>
        </div>

      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, display: 'flex', gap: 10, padding: '12px 16px', borderTop: `1px solid ${hexAlpha(T, 0.2)}`, background: 'rgba(8,10,14,0.98)' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ flex: 1, height: 44, borderRadius: 10, fontSize: 13, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', background: 'rgba(180,40,40,0.15)', border: '1px solid rgba(180,40,40,0.4)', color: '#e07070', transition: 'all 0.18s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(180,40,40,0.3)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(180,40,40,0.15)')}
        >
          Cancel
        </button>
        <button
          onClick={onSubmit as any}
          disabled={!canSubmit}
          style={{ flex: 1, height: 44, borderRadius: 10, fontSize: 13, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', cursor: canSubmit ? 'pointer' : 'not-allowed', background: T20, border: `1px solid ${T50}`, color: T, transition: 'all 0.18s', opacity: canSubmit ? 1 : 0.35 }}
          onMouseEnter={e => { if (canSubmit) (e.currentTarget as HTMLElement).style.background = T50; }}
          onMouseLeave={e => { if (canSubmit) (e.currentTarget as HTMLElement).style.background = T20; }}
        >
          Save Contact
        </button>
      </div>

    </div>
  );
}
