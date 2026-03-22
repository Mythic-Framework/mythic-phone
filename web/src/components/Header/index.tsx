import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState, AppDispatch } from '../../store';
import { useAlert, useMyStates } from '../../hooks';
import Nui from '../../util/Nui';

const Header: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const showAlert = useAlert();
  const hasState = useMyStates();

  const limited = useSelector((state: RootState) => state.phone.limited);
  const folderBlurOpen = useSelector((state: RootState) => state.phone.folderBlurOpen);
  const callData = useSelector((state: RootState) => (state as any).call?.call);
  const time = useSelector((state: RootState) => state.phone.time);
  const sharing = useSelector((state: RootState) => (state as any).share?.sharing);
  const [disabling, setDisabling] = useState(false);

  const isApp = location.pathname !== '/' && location.pathname !== '/apps';

  const onClickCall = () => {
    if (callData) navigate(`/apps/phone/call/${callData.number}`);
  };

  const sharePrompt = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!sharing) return;
    dispatch({ type: 'USE_SHARE', payload: true });
  };

  const disableVpn = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabling || !hasState('PHONE_VPN')) return;
    try {
      const res = await Nui.send<boolean>('RemoveVPN');
      showAlert(res ? 'VPN Disabled' : 'Unable to Disable VPN');
    } catch {
      showAlert('Unable to Disable VPN');
    }
    setDisabling(false);
  };

  const hour = String(time?.hour ?? 0).padStart(2, '0');
  const minute = String(time?.minute ?? 0).padStart(2, '0');

  return (
    <div style={{
      height: '8%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: '0 16px 0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      userSelect: 'none',
      background: isApp
        ? 'linear-gradient(180deg, rgba(10,12,16,0.97) 0%, rgba(14,18,24,0.92) 100%)'
        : 'transparent',
      boxSizing: 'border-box',
      paddingRight: 105,
      // Lift above the blur overlay (zIndex 50) when folder is open
      position: 'relative',
      zIndex: folderBlurOpen ? 60 : 'auto',
    }}>
      {/* Left: time + call */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: 18,
          fontWeight: 500,
          color: '#ffffff',
          letterSpacing: '0.04em',
        }}>
          {hour}<span style={{ opacity: 0.5, margin: '0 1px' }}>:</span>{minute}
        </span>
        {callData && !location.pathname.startsWith('/apps/phone/call') && (
          <div onClick={onClickCall} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            background: 'rgba(32,134,146,0.25)',
            border: '1px solid rgba(32,134,146,0.5)',
            borderRadius: 20,
            padding: '2px 10px',
            cursor: 'pointer',
            fontSize: 11,
            color: '#208692',
            letterSpacing: '0.05em',
            fontFamily: "'Oswald', sans-serif",
          }}>
            <FontAwesomeIcon icon="phone" style={{ fontSize: 9 }} />
            <span>{callData.state === 0 ? 'Calling' : callData.state === 1 ? 'Incoming' : 'Active'}</span>
          </div>
        )}
      </div>

      {/* Right: status icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {sharing && (
          <FontAwesomeIcon
            icon="share-nodes"
            onClick={sharePrompt}
            style={{ color: '#208692', cursor: 'pointer', fontSize: 13, transition: 'opacity 0.15s' }}
          />
        )}
        {!limited && hasState('RACE_DONGLE') && (
          <FontAwesomeIcon icon="flag-checkered" style={{ color: '#4db8c8', fontSize: 13 }} />
        )}
        <FontAwesomeIcon icon="wifi" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }} />
        <FontAwesomeIcon icon="signal" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }} />
      </div>
    </div>
  );
};

export default Header;
