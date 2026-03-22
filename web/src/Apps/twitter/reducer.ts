export interface TwitterState { tab: number; }
export const initialState: TwitterState = { tab: 0 };
export default function twitterReducer(state = initialState, action: any): TwitterState {
  switch (action.type) {
    case 'SET_TWITTER_TAB': return { ...state, tab: action.payload.tab };
    case 'UI_RESET': return { ...initialState };
    default: return state;
  }
}
