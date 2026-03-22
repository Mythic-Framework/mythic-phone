import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import Nui from '../../util/Nui';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import { RootState, AppDispatch } from '../../store';

export default function MyProfile() {
  const showAlert = useAlert();
  const dispatch = useDispatch<AppDispatch>();
  const T = useAppColor('twitter');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T08 = hexAlpha(T, 0.08);
  const T25 = hexAlpha(T, 0.25);
  const player = useSelector((state: RootState) => state.data.data.player);
  const [oProfile] = useState({ name: player.Alias?.twitter?.name ?? '', avatar: player.Alias?.twitter?.avatar ?? '' });
  const [profile, setProfile] = useState({ name: player.Alias?.twitter?.name ?? '', avatar: player.Alias?.twitter?.avatar ?? '' });

  const isDirty = !_.isEqual(oProfile, profile);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setProfile(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await (await Nui.send('UpdateAlias', { app: 'twitter', alias: profile, unique: true })).json();
      if (res) { dispatch({ type: 'UPDATE_DATA', payload: { type: 'player', id: 'Alias', key: 'twitter', data: profile } }); showAlert('Alias Updated'); }
      else showAlert('Unable To Update Alias');
    } catch {}
  };

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

  return (
    <form onSubmit={onSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '0 10px 10px' }}>

        {/* Profile card */}
        <div style={{
          background: T08, border: `1px solid ${T25}`,
          borderRadius: 12, width: '100%', margin: '150px auto 0 auto',
          textAlign: 'center', position: 'relative', padding: '0 16px 20px',
        }}>

          {/* Save button */}
          <button
            type="submit"
            style={{
              position: 'absolute', top: 8, right: 8,
              width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 6, border: `1px solid ${isDirty ? T50 : T20}`,
              background: isDirty ? T20 : 'transparent',
              color: isDirty ? T : 'rgba(255,255,255,0.3)',
              cursor: isDirty ? 'pointer' : 'default',
              fontSize: 15, transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (isDirty) (e.currentTarget as HTMLElement).style.background = T50; }}
            onMouseLeave={e => { if (isDirty) (e.currentTarget as HTMLElement).style.background = T20; }}
          >
            <FontAwesomeIcon icon={['fas', 'floppy-disk']} />
          </button>

          {/* Avatar */}
          <Avatar
            src={profile.avatar || undefined}
            style={{
              height: 200, width: 200, fontSize: 55, background: T,
              position: 'absolute', left: 0, right: 0, bottom: '100%',
              margin: 'auto', marginBottom: -60,
              border: isDirty ? `3px solid #eab308` : `3px solid ${T50}`,
              boxShadow: `0 4px 24px ${hexAlpha(T, 0.35)}`,
              transition: 'border-color 0.2s',
            }}
          >
            {!profile.avatar && <FontAwesomeIcon icon={['fas', 'user']} />}
          </Avatar>

          {/* Fields */}
          <div style={{ paddingTop: 60, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 11, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', textAlign: 'left' }}>
              Profile
            </div>
            <TextField
              required fullWidth label="Username" name="name"
              onChange={onChange} value={profile.name}
              inputProps={{ pattern: '[a-zA-Z0-9_\\-]+' }}
              sx={inputSx}
            />
            <TextField
              fullWidth label="Avatar Link" name="avatar"
              onChange={onChange} value={profile.avatar}
              sx={inputSx}
            />
          </div>
        </div>

      </div>
    </form>
  );
}
