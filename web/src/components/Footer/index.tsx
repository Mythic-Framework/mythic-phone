import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState, AppDispatch } from '../../store';

const DEFAULT_ICON = '#208692';
const DEFAULT_BORDER = '#208692';

const Footer: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const expanded = useSelector((state: RootState) => state.phone.expanded);
  const rawIcon = useSelector((state: RootState) => state.data.data.player?.PhoneSettings?.colors?.homeIcon);
  const rawBorder = useSelector((state: RootState) => state.data.data.player?.PhoneSettings?.colors?.border);
  const hoverColor = (!rawIcon || rawIcon === '#ffffff') ? DEFAULT_ICON : rawIcon;
  const borderColor = rawBorder ?? DEFAULT_BORDER;

  const [hovered, setHovered] = React.useState<string | null>(null);

  const btnStyle = (isHovered: boolean): React.CSSProperties => ({
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: isHovered ? hoverColor : 'rgba(255,255,255,0.6)',
    fontSize: 15,
    transition: 'color 0.2s, transform 0.15s',
    position: 'relative',
    zIndex: 1,
  });

  return (
    <div style={{
      height: '7%',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 12px',
      boxSizing: 'border-box',
      background: '#000000',
      boxShadow: `inset 0 20px 60px -10px ${borderColor}8C`,
      position: 'relative',
      zIndex: 99,
      borderTop: '1px solid transparent',
      backgroundImage: `linear-gradient(#000000, #000000), linear-gradient(90deg, #000000 0%, #000000 12.5%, ${borderColor}CC 50%, #000000 87.5%, #000000 100%)`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
    }}>
      <div
        style={btnStyle(hovered === 'expand')}
        onMouseEnter={() => setHovered('expand')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => dispatch({ type: 'TOGGLE_EXPANDED' })}
      >
        <FontAwesomeIcon icon={['fas', expanded ? 'minimize' : 'maximize']} />
      </div>

      <div
        style={btnStyle(hovered === 'home')}
        onMouseEnter={() => setHovered('home')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => { dispatch({ type: 'CLOSE_FOLDER' }); navigate('/'); }}
      >
        <FontAwesomeIcon icon={['fas', 'house']} />
      </div>

      <div
        style={btnStyle(hovered === 'back')}
        onMouseEnter={() => setHovered('back')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon="chevron-left" />
      </div>
    </div>
  );
};

export default Footer;
