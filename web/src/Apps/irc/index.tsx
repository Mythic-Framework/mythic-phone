import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nui from '../../util/Nui';
import { Slugify } from '../../util/Parser';
import { Modal } from '../../components';
import Channel from './Channel';
import { useAlert, useNotification, useAppColor, hexAlpha } from '../../hooks';

const IS_DEV = import.meta.env.DEV;

const IrcIndex: React.FC = () => {
  const addNotif = useNotification();
  const showAlert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const T = useAppColor('irc');
  const T20 = hexAlpha(T, 0.2);
  const T25 = hexAlpha(T, 0.25);
  const T15 = hexAlpha(T, 0.15);
  const T40 = hexAlpha(T, 0.4);
  const joinedChannels = useSelector((state: any) => state.data.data.ircChannels);
  const player = useSelector((state: any) => state.data.data.player);
  const [config, setConfig] = useState<boolean>(false);
  const [alias, setAlias] = useState<string>(player.Alias?.irc ?? '');
  const [searchVal, setSearchVal] = useState<string>('');
  const [channels, setChannels] = useState<any[]>(joinedChannels);
  const [joinData, setJoinData] = useState<string>('');
  const [join, setJoin] = useState<boolean>(false);

  // Track whether dev data has already been seeded this session
  const devSeeded = useRef(false);

  const fieldSx = {
    mb: '8px', width: '100%',
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255,255,255,0.03)', borderRadius: '8px',
      '& fieldset': { borderColor: hexAlpha(T, 0.3) },
      '&:hover fieldset': { borderColor: hexAlpha(T, 0.6) },
      '&.Mui-focused fieldset': { borderColor: T },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: T },
    '& .MuiInputBase-input': { color: '#fff' },
  };

  useEffect(() => {
    if (IS_DEV) {
      // Only seed once per session — skip on back-navigation remounts
      if (devSeeded.current || joinedChannels.length > 0) return;
      devSeeded.current = true;

      const now = Date.now();

      dispatch({ type: 'SET_DATA', payload: { type: 'ircChannels', data: [
        { slug: 'general',     joined: now - 1000 * 60 * 60 * 24 * 7 },
        { slug: 'marketplace', joined: now - 1000 * 60 * 60 * 24 * 3 },
        { slug: 'burner',      joined: now - 1000 * 60 * 30 },
      ]}});

      dispatch({ type: 'SET_DATA', payload: { type: 'irc-general', data: [
        { from: 'anon6088b',    message: 'Anyone around?', channel: 'general', time: now - 1000 * 60 * 2 },
        { from: 'xX_ghost_Xx', message: 'yeah whats good', channel: 'general', time: now - 1000 * 60 * 5 },
        { from: 'darknet99',   message: 'just chilling, anyone need work done?', channel: 'general', time: now - 1000 * 60 * 8 },
        { from: 'xX_ghost_Xx', message: 'depends what kind', channel: 'general', time: now - 1000 * 60 * 10 },
        { from: 'darknet99',   message: 'the usual. hit me in DMs', channel: 'general', time: now - 1000 * 60 * 11 },
        { from: 'r3dline_fan', message: 'yo anyone catch that race on the freeway last night?', channel: 'general', time: now - 1000 * 60 * 20 },
        { from: 'anon6088b',   message: 'nah missed it', channel: 'general', time: now - 1000 * 60 * 21 },
        { from: 'r3dline_fan', message: 'was insane. dude in a supercar wiped out near the tunnel lmao', channel: 'general', time: now - 1000 * 60 * 22 },
        { from: 'xX_ghost_Xx', message: 'rip', channel: 'general', time: now - 1000 * 60 * 23 },
        { from: 'shadow_walker', message: 'cops were everywhere after that', channel: 'general', time: now - 1000 * 60 * 35 },
        { from: 'shadow_walker', message: 'stay off the highways for a bit', channel: 'general', time: now - 1000 * 60 * 36 },
        { from: 'darknet99',   message: 'good look', channel: 'general', time: now - 1000 * 60 * 37 },
      ]}});

      dispatch({ type: 'SET_DATA', payload: { type: 'irc-marketplace', data: [
        { from: 'vendor_x',    message: 'selling: 3x phone burners, 500 each. first come first served', channel: 'marketplace', time: now - 1000 * 60 * 1 },
        { from: 'anon6088b',   message: 'interested, where to meet?', channel: 'marketplace', time: now - 1000 * 60 * 3 },
        { from: 'vendor_x',    message: 'DM me a number', channel: 'marketplace', time: now - 1000 * 60 * 4 },
        { from: 'b4ndit_',     message: 'WTB: any class B vehicle, paying well', channel: 'marketplace', time: now - 1000 * 60 * 15 },
        { from: 'r3dline_fan', message: 'got a sultan rs, make an offer', channel: 'marketplace', time: now - 1000 * 60 * 16 },
        { from: 'b4ndit_',     message: '45k', channel: 'marketplace', time: now - 1000 * 60 * 17 },
        { from: 'r3dline_fan', message: 'lol no. 80k minimum', channel: 'marketplace', time: now - 1000 * 60 * 18 },
        { from: 'b4ndit_',     message: 'fine 65k final offer', channel: 'marketplace', time: now - 1000 * 60 * 19 },
        { from: 'r3dline_fan', message: 'deal. DM location', channel: 'marketplace', time: now - 1000 * 60 * 20 },
      ]}});

      dispatch({ type: 'SET_DATA', payload: { type: 'irc-burner', data: [
        { from: 'shadow_walker', message: 'this channel clean?', channel: 'burner', time: now - 1000 * 60 * 5 },
        { from: 'anon6088b',    message: 'should be. just made it', channel: 'burner', time: now - 1000 * 60 * 6 },
        { from: 'shadow_walker', message: 'need to talk about the warehouse job', channel: 'burner', time: now - 1000 * 60 * 7 },
        { from: 'anon6088b',    message: 'go ahead', channel: 'burner', time: now - 1000 * 60 * 8 },
        { from: 'shadow_walker', message: 'we need a driver and a lookout. you in?', channel: 'burner', time: now - 1000 * 60 * 9 },
        { from: 'anon6088b',    message: "what's the cut", channel: 'burner', time: now - 1000 * 60 * 10 },
        { from: 'shadow_walker', message: '30/30/40, you get 30', channel: 'burner', time: now - 1000 * 60 * 11 },
        { from: 'anon6088b',    message: "make it 35 and I'm in", channel: 'burner', time: now - 1000 * 60 * 12 },
        { from: 'shadow_walker', message: 'deal. be at the spot at 22:00', channel: 'burner', time: now - 1000 * 60 * 13 },
      ]}});

      return;
    }

    (async () => {
      try {
        const raw = await Nui.send('GetIRCChannels');
        if (!raw) return;
        const text = await raw.text();
        if (!text || text.trim() === '') return;
        const data = JSON.parse(text);
        if (data) dispatch({ type: 'SET_DATA', payload: { type: 'ircChannels', data } });
      } catch (e) { console.error('[IRC] fetch error:', e); }
    })();
  }, []);

  useEffect(() => {
    setChannels(joinedChannels.filter((c: any) => c.slug.includes(Slugify(searchVal))));
  }, [searchVal, joinedChannels]);

  const onConfig = async (e: any) => {
    e.preventDefault();
    try {
      let res = await (await Nui.send('UpdateAlias', { app: 'irc', alias, unique: true })).json();
      if (res) { dispatch({ type: 'UPDATE_DATA', payload: { type: 'player', id: 'Alias', key: 'irc', data: alias } }); showAlert('Alias Updated'); }
      else showAlert('Unable To Update Alias');
      setConfig(false);
    } catch (err) { showAlert('Unable To Update Alias'); }
  };

  const onJoin = async (e: any) => {
    e.preventDefault();
    if (joinData && joinData.length > 0) {
      try {
        let chanData = { slug: joinData, joined: Date.now() };
        let res = await (await Nui.send('JoinIRCChannel', chanData)).json();
        if (res) { dispatch({ type: 'ADD_DATA', payload: { type: 'ircChannels', data: chanData } }); showAlert('Joined Channel'); navigate(`/apps/irc/view/${joinData}`); }
        else showAlert('Unable To Join Channel');
      } catch (err) { showAlert('Unable To Join Channel'); }
    } else showAlert('Unable To Join Channel');
    setJoin(false);
  };

  return (
    <div style={{ height: '100%', background: 'rgba(10,13,18,0.98)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 8px 0 16px', height: 56,
        background: `linear-gradient(135deg, ${T20} 0%, rgba(10,13,18,0) 100%)`,
        borderBottom: `1px solid ${T25}`,
      }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '0.12em', color: T }}>IRC</div>
        <div style={{ display: 'flex', gap: 2 }}>
          {[{ icon: 'plus', onClick: () => setJoin(true) }, { icon: 'gear', onClick: () => setConfig(true) }].map(({ icon, onClick }) => (
            <div key={icon}
              style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: `1px solid ${T15}`, color: 'rgba(255,255,255,0.45)', fontSize: 14, cursor: 'pointer', transition: 'all 0.15s' }}
              onClick={onClick}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.color = T; (e.currentTarget as HTMLElement).style.borderColor = T40; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; (e.currentTarget as HTMLElement).style.borderColor = T15; }}
            >
              <FontAwesomeIcon icon={icon as any} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ flexShrink: 0, padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <input
          style={{ width: '100%', background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '7px 12px', border: `1px solid rgba(255,255,255,0.07)`, color: '#fff', fontSize: 13, outline: 'none', fontFamily: "'Oswald', sans-serif", letterSpacing: '0.03em', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
          placeholder="Search channels..."
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          onFocus={e => (e.currentTarget.style.borderColor = T40)}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
        />
      </div>

      {channels.length > 0 ? (
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {channels.sort((a: any, b: any) => b.joined - a.joined).map((channel: any, index: number) => (
            <Channel key={`channel-${index}`} channel={channel} />
          ))}
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ fontSize: 44, color: hexAlpha(T, 0.12) }}><FontAwesomeIcon icon={['fas', 'comments']} /></div>
          <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center' }}>
            {searchVal ? 'No channels match' : 'No channels joined'}
          </div>
        </div>
      )}

      <Modal appColor={T} form open={config || !player.Alias?.irc} title="IRC Settings" onClose={() => setConfig(false)} onAccept={onConfig} submitLang="Save" closeLang="Cancel">
        <TextField label="Username" name="username" type="text" fullWidth onChange={e => setAlias(e.target.value)} value={alias} sx={fieldSx} />
      </Modal>

      <Modal appColor={T} form open={join} title="Join Channel" onClose={() => setJoin(false)} onAccept={onJoin} submitLang="Join" closeLang="Cancel">
        <TextField label="Channel Name" name="channel" type="text" fullWidth onChange={e => setJoinData(Slugify(e.target.value))} value={joinData} sx={fieldSx} />
      </Modal>
    </div>
  );
};

export default IrcIndex;
