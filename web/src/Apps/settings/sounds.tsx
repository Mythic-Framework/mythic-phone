import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { blue, orange } from '@mui/material/colors';
import Version from './components/Version';
import SoundSelect from './components/SoundSelect';
import { UpdateSetting, TestSound } from './actions';
import { RootState, AppDispatch } from '../../store';

const BG = '#0a0c10';

const ringtones = [
  { value: 'ringtone1.ogg', label: 'Ringtone 1' }, { value: 'ringtone2.ogg', label: 'Ringtone 2' },
  { value: 'ringtone3.ogg', label: 'Ringtone 3' }, { value: 'ringtone4.ogg', label: 'Ringtone 4' },
  { value: 'ringtone5.ogg', label: 'Ringtone 5' }, { value: 'ringtone6.ogg', label: 'Ringtone 6' },
  { value: 'ringtone7.ogg', label: 'Ringtone 7' }, { value: 'ringtone8.ogg', label: 'Ringtone 8' },
  { value: 'ringtone9.ogg', label: 'Ringtone 9' }, { value: 'ringtone10.ogg', label: 'Ringtone 10' },
  { value: 'ringtone11.ogg', label: 'Ringtone 11' }, { value: 'ringtone12.ogg', label: 'Ringtone 12' },
];

const texttones = [
  { value: 'text1.ogg', label: 'Text Tone 1' },
  { value: 'text2.ogg', label: 'Text Tone 2' },
  { value: 'text3.ogg', label: 'Text Tone 3' },
];

export default function Sounds() {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.data.data.player.PhoneSettings);

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <SoundSelect label="Ringtone" selected={settings.ringtone} options={ringtones} color={orange[500]}
          onChange={v => { if (v !== settings.ringtone) dispatch(UpdateSetting('ringtone', v)); }}
          playSound={v => dispatch(TestSound('ringtone', v))} />
        <SoundSelect label="Text Tone" selected={settings.texttone} options={texttones} color={blue[500]}
          onChange={v => { if (v !== settings.texttone) dispatch(UpdateSetting('texttone', v)); }}
          playSound={v => dispatch(TestSound('texttone', v))} />
      </div>
      <Version />
    </div>
  );
}
