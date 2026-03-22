import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Version from './components/Version';
import CustomColor from './components/CustomColor';
import { UpdateSetting } from './actions';
import { RootState, AppDispatch } from '../../store';
import { hexAlpha } from '../../hooks';

const BG = '#0a0c10';
const DEFAULT_TEAL = '#208692';

// Full app registry — label, icon, default color, and settings color key(s)
const APP_REGISTRY: {
  id: string;
  label: string;
  icon: any;
  sub: string;
  defaultColor: string;
  colorKeys: { key: string; label: string }[];
}[] = [
  { id: 'home',          label: 'Home',          icon: ['fas', 'house'],               sub: 'Button & Icon',   defaultColor: DEFAULT_TEAL, colorKeys: [{ key: 'border', label: 'Background & Border' }, { key: 'homeIcon', label: 'Hover Icon' }] },
  { id: 'contacts',      label: 'Contacts',      icon: ['fas', 'address-book'],         sub: 'Accent Color',    defaultColor: DEFAULT_TEAL, colorKeys: [{ key: 'contacts', label: 'Accent Color' }] },
  { id: 'adverts',       label: 'Yellow Pages',  icon: ['fas', 'newspaper'],            sub: 'Accent Color',    defaultColor: '#f9a825',    colorKeys: [{ key: 'adverts', label: 'Accent Color' }] },
  { id: 'bank',          label: 'Bank',          icon: ['fas', 'building-columns'],     sub: 'Accent Color',    defaultColor: DEFAULT_TEAL, colorKeys: [{ key: 'bank', label: 'Accent Color' }] },
  { id: 'blueline',      label: 'Blueline',      icon: ['fas', 'shield-halved'],        sub: 'Accent Color',    defaultColor: DEFAULT_TEAL, colorKeys: [{ key: 'blueline', label: 'Accent Color' }] },
  { id: 'calculator',    label: 'Calculator',    icon: ['fas', 'calculator'],           sub: 'Accent Color',    defaultColor: DEFAULT_TEAL, colorKeys: [{ key: 'calculator', label: 'Accent Color' }] },
  { id: 'comanager',     label: 'Co. Manager',   icon: ['fas', 'building'],             sub: 'Accent Color',    defaultColor: DEFAULT_TEAL, colorKeys: [{ key: 'comanager', label: 'Accent Color' }] },
  { id: 'crypto',        label: 'CryptoX',       icon: ['fas', 'coins'],                sub: 'Accent Color',    defaultColor: DEFAULT_TEAL, colorKeys: [{ key: 'crypto', label: 'Accent Color' }] },
  { id: 'documents',     label: 'Documents',     icon: ['fas', 'file-lines'],           sub: 'Accent Color',    defaultColor: DEFAULT_TEAL, colorKeys: [{ key: 'documents', label: 'Accent Color' }] },
  { id: 'dyn8',          label: 'Dynasty 8',     icon: ['fas', 'house'],                sub: 'Accent Color',    defaultColor: '#136231',    colorKeys: [{ key: 'dyn8', label: 'Accent Color' }] },
  { id: 'email',         label: 'Email',         icon: ['fas', 'envelope'],             sub: 'Accent Color',    defaultColor: DEFAULT_TEAL, colorKeys: [{ key: 'email', label: 'Accent Color' }] },
  { id: 'garage',        label: 'Garage',        icon: ['fas', 'car-side'],             sub: 'Accent Color',    defaultColor: '#eb34de',    colorKeys: [{ key: 'garage', label: 'Accent Color' }] },
  { id: 'govt',          label: 'Gov. Services', icon: ['fas', 'landmark'],             sub: 'Accent Color',    defaultColor: '#5597d0',    colorKeys: [{ key: 'govt', label: 'Accent Color' }] },
  { id: 'homemanage',    label: 'Smart Home',    icon: ['fas', 'house-signal'],         sub: 'Accent Color',    defaultColor: '#30518c',    colorKeys: [{ key: 'homemanage', label: 'Accent Color' }] },
  { id: 'irc',           label: 'IRC',           icon: ['fas', 'terminal'],             sub: 'Accent Color',    defaultColor: '#1de9b6',    colorKeys: [{ key: 'irc', label: 'Accent Color' }] },
  { id: 'labor',         label: 'Labor',         icon: ['fas', 'briefcase'],            sub: 'Accent Color',    defaultColor: DEFAULT_TEAL, colorKeys: [{ key: 'labor', label: 'Accent Color' }] },
  { id: 'leoassist',     label: 'Leo Assist',    icon: ['fas', 'shield-halved'],        sub: 'Accent Color',    defaultColor: '#1a5fa8',    colorKeys: [{ key: 'leoassist', label: 'Accent Color' }] },
  { id: 'loans',         label: 'Loans',         icon: ['fas', 'hand-holding-dollar'],  sub: 'Accent Color',    defaultColor: DEFAULT_TEAL, colorKeys: [{ key: 'loans', label: 'Accent Color' }] },
  { id: 'lsunderground', label: 'LS Underground',icon: ['fas', 'screwdriver-wrench'],   sub: 'Accent Color',    defaultColor: '#E95200',    colorKeys: [{ key: 'lsunderground', label: 'Accent Color' }] },
  { id: 'messages',      label: 'Messages',      icon: ['fas', 'comments'],             sub: 'Accent Color',    defaultColor: DEFAULT_TEAL, colorKeys: [{ key: 'messages', label: 'Accent Color' }] },
  { id: 'phone',         label: 'Phone',         icon: ['fas', 'phone'],                sub: 'Accent Color',    defaultColor: DEFAULT_TEAL, colorKeys: [{ key: 'phone', label: 'Accent Color' }] },
  { id: 'pingem',        label: "Ping'Em",       icon: ['fas', 'location-crosshairs'],  sub: 'Accent Color',    defaultColor: '#8E1467',    colorKeys: [{ key: 'pingem', label: 'Accent Color' }] },
  { id: 'redline',       label: 'Redline',       icon: ['fas', 'flag-checkered'],       sub: 'Accent Color',    defaultColor: DEFAULT_TEAL, colorKeys: [{ key: 'redline', label: 'Accent Color' }] },
  { id: 'store',         label: 'App Store',     icon: ['fas', 'store'],                sub: 'Accent Color',    defaultColor: DEFAULT_TEAL, colorKeys: [{ key: 'store', label: 'Accent Color' }] },
  { id: 'twitter',       label: 'Twitter',       icon: ['fab', 'twitter'],              sub: 'Accent Color',    defaultColor: DEFAULT_TEAL, colorKeys: [{ key: 'twitter', label: 'Accent Color' }] },
];

export default function ColorsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.data.data.player.PhoneSettings);
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (id: string) => setOpen(o => o === id ? null : id);

  const getSavedColor = (key: string, defaultColor: string) => {
    const saved = settings?.colors?.[key];
    if (saved && saved !== '#ffffff') return saved;
    return defaultColor;
  };

  const onSave = (key: string, hex: string) => {
    dispatch(UpdateSetting('colors', { ...settings.colors, [key]: hex }));
  };

  return (
    <div style={{ height: '100%', background: BG, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {APP_REGISTRY.map(app => {
          const firstKey = app.colorKeys[0].key;
          const previewColor = getSavedColor(firstKey, app.defaultColor);
          const isOpen = open === app.id;
          const T50 = hexAlpha(previewColor, 0.5);
          const T20 = hexAlpha(previewColor, 0.2);
          const T04 = hexAlpha(previewColor, 0.04);

          return (
            <React.Fragment key={app.id}>
              <div
                onClick={() => toggle(app.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px',
                  borderBottom: `1px solid ${isOpen ? T50 : 'rgba(255,255,255,0.05)'}`,
                  cursor: 'pointer', transition: 'background 0.15s',
                  background: isOpen ? T20 : 'transparent',
                }}
                onMouseEnter={e => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseLeave={e => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: previewColor,
                  border: '2px solid rgba(255,255,255,0.15)',
                  flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, color: '#fff',
                }}>
                  <FontAwesomeIcon icon={app.icon} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: '#fff', fontFamily: 'Oswald', letterSpacing: '0.02em' }}>{app.label}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2, fontFamily: 'Oswald' }}>{app.sub}</div>
                </div>
                <FontAwesomeIcon
                  icon={isOpen ? 'chevron-down' : 'chevron-right'}
                  style={{ color: isOpen ? previewColor : 'rgba(255,255,255,0.25)', fontSize: 12, transition: 'color 0.2s' }}
                />
              </div>

              {isOpen && (
                <div style={{ borderBottom: `1px solid ${T50}`, background: T04 }}>
                  {app.colorKeys.map(({ key, label }) => (
                    <div key={key} style={{ paddingLeft: 16 }}>
                      <CustomColor
                        label={label}
                        color={getSavedColor(key, app.defaultColor)}
                        onSave={hex => onSave(key, hex)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <Version />
    </div>
  );
}
