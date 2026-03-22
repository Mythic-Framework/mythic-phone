import Nui from '../../util/Nui';

export interface FolderDef {
  id: string;
  name: string;
  apps: string[];
  page: number;
}

export interface PhoneState {
  visible: boolean;
  clear: boolean;
  expanded: boolean;
  limited: boolean;
  folderBlurOpen: boolean;
  time: { hour: number; minute: number };
  apps: Record<string, AppDefinition>;
  folders: FolderDef[];
}

export interface AppDefinition {
  storeLabel: string;
  label: string;
  icon: any;
  name: string;
  color: string;
  canUninstall: boolean;
  unread: number;
  params: string;
  hidden?: boolean;
  store?: boolean;
  restricted?: {
    state?: string;
    job?: Record<string, any>;
    jobPermission?: string;
    phonePermission?: string;
    reputation?: string;
    reputationAmount?: number;
  } | false;
  internal?: Array<{ app: string; params?: string }>;
}

const IS_DEV = import.meta.env.DEV;

const DEV_APPS: Record<string, AppDefinition> = {
  phone: { storeLabel: 'Phone', label: 'Phone', icon: 'phone', name: 'phone', color: '#21a500', canUninstall: false, unread: 0, params: '', internal: [{ app: 'call', params: ':number?' }] },
  messages: { storeLabel: 'Messages', label: 'Messages', icon: 'comment', name: 'messages', color: '#ff0000', canUninstall: false, unread: 0, params: '', internal: [{ app: 'new' }, { app: 'convo', params: ':number?' }] },
  contacts: { storeLabel: 'Contacts', label: 'Contacts', icon: 'address-book', name: 'contacts', color: '#ff6a00', canUninstall: false, unread: 0, params: '', internal: [{ app: 'add', params: ':number?' }, { app: 'edit', params: ':id?' }] },
  store: { storeLabel: 'Blue Sky App Store', label: 'App Store', icon: 'rocket', name: 'store', color: '#1a7cc1', canUninstall: false, unread: 0, params: '' },
  settings: { storeLabel: 'Settings', label: 'Settings', icon: 'gear', name: 'settings', color: '#18191e', canUninstall: false, unread: 0, params: '', internal: [{ app: 'software' }, { app: 'profile' }, { app: 'app_notifs' }, { app: 'sounds' }, { app: 'wallpaper' }, { app: 'colors' }] },
  email: { storeLabel: 'Email', label: 'Email', icon: 'envelope', name: 'email', color: '#5600a5', canUninstall: false, unread: 0, params: '', internal: [{ app: 'view', params: ':id' }] },
  bank: { storeLabel: 'Bank', label: 'Bank', icon: 'bank', name: 'bank', color: '#ff0000', canUninstall: true, unread: 0, params: '', internal: [{ app: 'view', params: ':account' }] },
  loans: { storeLabel: 'Loans', label: 'Loans', icon: 'hand-holding-dollar', name: 'loans', color: '#30518c', canUninstall: true, unread: 0, params: '', internal: [{ app: 'view', params: ':loan' }] },
  twitter: { storeLabel: 'Twitter', label: 'Twitter', icon: ['fab', 'twitter'], name: 'twitter', color: '#00aced', canUninstall: true, unread: 0, params: '' },
  irc: { storeLabel: 'IRC', label: 'IRC', icon: 'comment-slash', name: 'irc', color: '#1de9b6', canUninstall: true, unread: 0, params: '', internal: [{ app: 'view', params: ':channel' }, { app: 'join', params: ':channel' }] },
  adverts: { storeLabel: 'Yellow Pages', label: 'YP', icon: 'rectangle-ad', name: 'adverts', color: '#f9a825', canUninstall: true, unread: 0, params: '', internal: [{ app: 'view', params: ':id' }, { app: 'category-view', params: ':category' }, { app: 'add' }, { app: 'edit' }] },
  documents: { storeLabel: 'Documents', label: 'Documents', icon: 'file-lines', name: 'documents', color: '#18191e', canUninstall: true, unread: 0, params: '', internal: [{ app: 'view', params: ':id/:mode' }] },
  redline: { storeLabel: 'Vroom', label: 'Vroom', name: 'redline', icon: 'gauge-simple-high', color: '#8a172e', hidden: true, store: false, canUninstall: true, unread: 0, params: ':tab?', restricted: { state: 'RACE_DONGLE' } },
  blueline: { storeLabel: 'Trials', label: 'Trials', name: 'blueline', icon: 'gauge-simple-high', color: '#1258a3', hidden: true, store: false, canUninstall: true, unread: 0, params: ':tab?' },
  comanager: { storeLabel: 'Company Manager', label: 'Company Manager', name: 'comanager', icon: 'briefcase', color: '#428030', canUninstall: true, unread: 0, params: '', internal: [{ app: 'view', params: ':jobId' }] },
  labor: { storeLabel: 'Labor', label: 'Labor', name: 'labor', icon: 'person-digging', color: '#785920', canUninstall: true, unread: 0, params: '' },
  crypto: { storeLabel: 'CryptoX', label: 'CryptoX', name: 'crypto', icon: ['fab', 'bitcoin'], color: '#b0e655', canUninstall: true, unread: 0, params: '' },
  dyn8: { storeLabel: 'Dynasty 8', label: 'Dynasty 8', name: 'dyn8', icon: 'house', color: '#136231', canUninstall: true, unread: 0, params: '' },
  homemanage: { storeLabel: 'Smart Home', label: 'Smart Home', name: 'homemanage', icon: 'house-signal', color: '#30518c', canUninstall: true, unread: 0, params: '' },
  garage: { storeLabel: 'Garage', label: 'Garage', name: 'garage', icon: 'warehouse', color: '#eb34de', canUninstall: true, unread: 0, params: '', internal: [{ app: 'view', params: ':vin' }] },
  pingem: { storeLabel: "Ping'Em", label: "Ping'Em", name: 'pingem', icon: 'location-crosshairs', color: '#8E1467', canUninstall: true, unread: 0, params: '' },
  camera: { storeLabel: 'Camera', label: 'Camera', name: 'camera', icon: 'camera', color: '#007494', canUninstall: false, unread: 0, params: '' },
  calculator: { storeLabel: 'Calculator', label: 'Calculator', name: 'calculator', icon: 'calculator', color: '#E95200', canUninstall: true, unread: 0, params: '' },
  lsunderground: { storeLabel: 'LS Underground', label: 'LS Underground', name: 'lsunderground', icon: 'screwdriver-wrench', color: '#E95200', canUninstall: true, unread: 0, params: '' },
  leoassist: { storeLabel: 'Leo Assist', label: 'Leo Assist', name: 'leoassist', icon: 'shield-halved', color: '#1a5fa8', canUninstall: true, unread: 0, params: '' },
};

export const initialState: PhoneState = {
  visible: IS_DEV,
  clear: false,
  expanded: false,
  limited: false,
  folderBlurOpen: false,
  time: { hour: 4, minute: 20 },
  apps: IS_DEV ? DEV_APPS : {},
  folders: [],
};

const phoneReducer = (state: PhoneState = initialState, action: any): PhoneState => {
  switch (action.type) {
    case 'PHONE_VISIBLE':
      return { ...state, visible: true };
    case 'PHONE_NOT_VISIBLE':
      Nui.send('ClosePhone', {});
      return { ...state, visible: false, limited: false };
    case 'PHONE_NOT_VISIBLE_FORCED':
      return { ...state, visible: false, limited: false };
    case 'PHONE_VISIBLE_LIMITED':
      return { ...state, visible: true, limited: true };
    case 'CLEAR_HISTORY':
      return { ...state, clear: true };
    case 'TOGGLE_EXPANDED':
      Nui.send('UpdateSetting', { type: 'Expanded', val: !state.expanded });
      return { ...state, expanded: !state.expanded };
    case 'SET_EXPANDED':
      return { ...state, expanded: action.payload.expanded };
    case 'CLEARED_HISTORY':
      Nui.send('CDExpired', {});
      return { ...state, clear: false };
    case 'SET_APPS':
      return { ...state, apps: action.payload };
    case 'SET_TIME':
      return { ...state, time: action.payload };
    case 'CLOSE_FOLDER':
      return { ...state, folderBlurOpen: false };
    case 'FOLDER_BLUR_OPEN':
      return { ...state, folderBlurOpen: true };
    case 'FOLDER_BLUR_CLOSE':
      return { ...state, folderBlurOpen: false };
    case 'SET_FOLDERS':
      return { ...state, folders: Array.isArray(action.payload) ? action.payload : [] };
    default:
      return state;
  }
};

export default phoneReducer;
