interface ShareState { open: boolean; sharing: any }

export const initialState: ShareState = { open: false, sharing: null };

export default (state: ShareState = initialState, action: any): ShareState => {
  switch (action.type) {
    case 'USE_SHARE':     return { ...state, open: action.payload };
    case 'RECEIVE_SHARE': return { ...state, sharing: action.payload };
    case 'REMOVE_SHARE':  return { ...state, sharing: null, open: false };
    default: return state;
  }
};
