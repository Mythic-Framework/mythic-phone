import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, Slide } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert, useAppView, useAppButton, useMyApps } from '../../hooks';
import { RootState, AppDispatch } from '../../store';

const TEAL = '#208692';
const TEAL_50 = 'rgba(32,134,146,0.5)';
const TEAL_20 = 'rgba(32,134,146,0.2)';

export default function AppList() {
  const openedApp = useAppView();
  const showAlert = useAlert();
  const appButton = useAppButton();
  const navigate = useNavigate();
  const apps = useMyApps();

  const installed = useSelector((state: RootState) => state.data.data.player?.Apps?.installed) ?? [];
  const homeApps = useSelector((state: RootState) => state.data.data.player?.Apps?.home) ?? [];

  const [open, setOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [contextApp, setContextApp] = useState<string | null>(null);
  const [offset, setOffset] = useState({ left: 110, top: 0 });
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const [pressedApp, setPressedApp] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => { setOpen(true); return () => setOpen(false); }, []);

  const filtered = [...new Set(
    (installed as string[]).filter((app: string) =>
      apps[app]?.label?.toUpperCase().includes(searchVal.toUpperCase())
    )
  )].sort((a: string, b: string) => (apps[a]?.label > apps[b]?.label ? 1 : -1));

  const onClick = (app: string) => { openedApp(app); navigate(`/apps/${app}`); };
  const onRightClick = (e: React.MouseEvent, app: string) => {
    e.preventDefault();
    setOffset({ left: e.clientX - 2, top: e.clientY - 4 });
    setContextApp(app);
  };
  const closeContext = () => setContextApp(null);

  const addToHome = async () => {
    if (!contextApp) return;
    await appButton('add', 'Home', contextApp);
    showAlert(`${apps[contextApp].label} Added To Home Screen`);
    closeContext();
  };

  return (
    <Slide in={open} direction="up">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* Search bar */}
        <div style={{
          padding: '14px 16px 10px',
          flexShrink: 0,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: searchFocused ? 'rgba(32,134,146,0.12)' : 'rgba(255,255,255,0.06)',
            border: searchFocused ? `1px solid ${TEAL_50}` : '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
            padding: '8px 14px',
            transition: 'all 0.2s',
            boxShadow: searchFocused ? `0 0 0 3px ${TEAL_20}` : 'none',
          }}>
            <FontAwesomeIcon icon="magnifying-glass" style={{ color: searchFocused ? TEAL : 'rgba(255,255,255,0.35)', fontSize: 13, transition: 'color 0.2s', flexShrink: 0 }} />
            <input
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search apps..."
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: 14,
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 300,
                letterSpacing: '0.04em',
                width: '100%',
                caretColor: TEAL,
              }}
            />
            {searchVal && (
              <FontAwesomeIcon
                icon="xmark"
                onClick={() => setSearchVal('')}
                style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, cursor: 'pointer', flexShrink: 0 }}
              />
            )}
          </div>
        </div>

        {/* App count label */}
        <div style={{
          padding: '0 20px 6px',
          fontSize: 11,
          color: 'rgba(255,255,255,0.3)',
          fontFamily: "'Oswald', sans-serif",
          letterSpacing: '0.08em',
          flexShrink: 0,
        }}>
          {filtered.length} APP{filtered.length !== 1 ? 'S' : ''}
        </div>

        {/* App grid */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexWrap: 'wrap',
          padding: '0 8px',
          alignContent: 'flex-start',
          overflowX: 'hidden',
          overflowY: 'auto',
        }}>
          {filtered.map((app: string, i: number) => {
            const data = apps[app];
            if (!data) return null;
            const isCtx = contextApp === app;
            const isHovered = hoveredApp === app;
            const isPressed = pressedApp === app;

            return (
              <div
                key={i}
                onClick={() => onClick(app)}
                onContextMenu={e => onRightClick(e, app)}
                onMouseEnter={() => setHoveredApp(app)}
                onMouseLeave={() => { setHoveredApp(null); setPressedApp(null); }}
                onMouseDown={() => setPressedApp(app)}
                onMouseUp={() => setPressedApp(null)}
                style={{
                  width: '25%',
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '10px 4px',
                  borderRadius: 14,
                  cursor: 'pointer',
                  background: isCtx
                    ? TEAL_20
                    : isHovered
                    ? 'rgba(255,255,255,0.06)'
                    : 'transparent',
                  border: isCtx
                    ? `1px solid ${TEAL_50}`
                    : '1px solid transparent',
                  transform: isPressed ? 'scale(0.92)' : isHovered ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.15s cubic-bezier(0.34,1.56,0.64,1), background 0.15s, border 0.15s',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{
                  width: '3.8rem',
                  height: '3.8rem',
                  borderRadius: '1rem',
                  background: data.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 30,
                  color: '#fff',
                  boxShadow: isHovered
                    ? `0 6px 20px ${data.color}65, 0 2px 8px rgba(0,0,0,0.5)`
                    : '0 3px 10px rgba(0,0,0,0.4)',
                  transition: 'box-shadow 0.2s',
                  flexShrink: 0,
                }}>
                  <FontAwesomeIcon icon={data.icon} />
                </div>
                <div style={{
                  fontSize: 11,
                  color: isHovered ? '#fff' : 'rgba(255,255,255,0.75)',
                  marginTop: 7,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '90%',
                  pointerEvents: 'none',
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  textAlign: 'center',
                  transition: 'color 0.15s',
                }}>
                  {data.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Context menu */}
        {contextApp && (
          <Menu
            keepMounted
            open={!!contextApp}
            onClose={closeContext}
            anchorReference="anchorPosition"
            anchorPosition={offset}
            PaperProps={{
              style: {
                background: 'rgba(14,18,24,0.95)',
                border: '1px solid rgba(32,134,146,0.35)',
                borderRadius: 12,
                minWidth: 180,
                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
              }
            }}
          >
            <MenuItem disabled style={{ color: TEAL, fontFamily: "'Oswald', sans-serif", fontSize: 13, letterSpacing: '0.08em' }}>
              {apps[contextApp]?.label?.toUpperCase()}
            </MenuItem>
            <MenuItem
              onClick={addToHome}
              disabled={homeApps.includes(contextApp)}
              style={{ fontSize: 14 }}
            >
              Add To Home
            </MenuItem>
            <MenuItem
              onClick={() => { openedApp(contextApp); navigate(`/apps/${contextApp}`); closeContext(); }}
              style={{ fontSize: 14, color: TEAL }}
            >
              Open {apps[contextApp]?.label}
            </MenuItem>
          </Menu>
        )}
      </div>
    </Slide>
  );
}
