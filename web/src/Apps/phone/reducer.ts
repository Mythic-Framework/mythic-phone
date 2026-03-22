export interface CallState {
  call: {
    state: number;
    number: string;
    limited?: boolean;
    start?: number;
  } | null;
  duration: number | null;
  incomingDismissed: boolean;
  callLimited?: boolean;
}

const initialState: CallState = {
  call: null,
  duration: null,
  incomingDismissed: false,
};

export default (state: CallState = initialState, action: any): CallState => {
  switch (action.type) {
    case 'DISMISS_INCOMING':
      return { ...state, incomingDismissed: true };
    case 'SHOW_INCOMING':
      return { ...state, incomingDismissed: false };
    case 'SET_CALL_PENDING':
      return {
        ...state,
        call: { state: 0, number: action.payload.number, limited: false },
        callLimited: false,
      };
    case 'SET_CALL_INCOMING':
      return {
        ...state,
        call: { state: 1, number: action.payload.number, limited: action.payload.limited },
        callLimited: action.payload.limited,
      };
    case 'SET_CALL_ACTIVE':
      return {
        ...state,
        call: { ...state.call!, state: 2, start: Date.now() },
        incomingDismissed: false,
      };
    case 'UPDATE_CALL_TIMER':
      return { ...state, duration: action.payload.timer };
    case 'END_CALL':
      return { ...state, call: null, incomingDismissed: false };
    case 'UI_RESET':
      return { ...initialState };
    default:
      return state;
  }
};
