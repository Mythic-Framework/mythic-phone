// Bank reducer
export interface BankState { tab: number; }
export const initialState: BankState = { tab: 0 };

export default function bankReducer(state = initialState, action: any): BankState {
  switch (action.type) {
    case 'SET_BANK_TAB': return { ...state, tab: action.payload.tab };
    case 'UI_RESET': return { ...initialState };
    default: return state;
  }
}
