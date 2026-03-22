export interface HomemanageState {
	tab: number;
	selected: string | null;
}

export const initialState: HomemanageState = { tab: 0, selected: null };

interface Action { type: string; payload?: any; }

export default (state: HomemanageState = initialState, action: Action): HomemanageState => {
	switch (action.type) {
		case 'SET_HOME_TAB': return { ...state, tab: action.payload.tab };
		case 'SET_SELECTED_PROPERTY': return { ...state, selected: action.payload };
		case 'UI_RESET': return { ...initialState };
		default: return state;
	}
};
