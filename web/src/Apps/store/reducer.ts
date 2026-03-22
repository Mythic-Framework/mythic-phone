export interface StoreState {
  installing: string[]; installPending: string[]; installFailed: string[];
  uninstalling: string[]; uninstallPending: string[]; uninstallFailed: string[];
  tab: number;
}
export const initialState: StoreState = {
  installing: [], installPending: [], installFailed: [],
  uninstalling: [], uninstallPending: [], uninstallFailed: [],
  tab: 0,
};

const filterOut = (arr: string[], app: string) => arr.filter(i => i !== app);

export default function storeReducer(state = initialState, action: any): StoreState {
  switch (action.type) {
    case 'PENDING_INSTALL': return { ...state, installPending: [...state.installPending, action.payload.app] };
    case 'START_INSTALL': return { ...state, installPending: filterOut(state.installPending, action.payload.app), installing: [...state.installing, action.payload.app] };
    case 'END_INSTALL': return { ...state, installing: filterOut(state.installing, action.payload.app), installPending: filterOut(state.installPending, action.payload.app), installFailed: filterOut(state.installFailed, action.payload.app) };
    case 'FAILED_INSTALL': return { ...state, installing: filterOut(state.installing, action.payload.app), installPending: filterOut(state.installPending, action.payload.app), installFailed: [...state.installFailed, action.payload.app] };
    case 'PENDING_UNINSTALL': return { ...state, uninstallPending: [...state.uninstallPending, action.payload.app] };
    case 'START_UNINSTALL': return { ...state, uninstallPending: filterOut(state.uninstallPending, action.payload.app), uninstalling: [...state.uninstalling, action.payload.app] };
    case 'FAILED_UNINSTALL': return { ...state, uninstalling: filterOut(state.uninstalling, action.payload.app), uninstallPending: filterOut(state.uninstallPending, action.payload.app), uninstallFailed: [...state.uninstallFailed, action.payload.app] };
    case 'END_UNINSTALL': return { ...state, uninstalling: filterOut(state.uninstalling, action.payload.app), uninstallPending: filterOut(state.uninstallPending, action.payload.app), uninstallFailed: filterOut(state.uninstallFailed, action.payload.app) };
    case 'SET_STORE_TAB': return { ...state, tab: action.payload.tab };
    case 'UI_RESET': return { ...initialState };
    default: return state;
  }
}
