export interface CryptoState {
	tab: number;
}

export const initialState: CryptoState = { tab: 0 };

interface Action { type: string; payload?: any; }

export default (state: CryptoState = initialState, action: Action): CryptoState => {
	switch (action.type) {
		case 'SET_CRYPTO_TAB':
			return { ...state, tab: action.payload.tab };
		case 'UI_RESET':
			return { ...initialState };
		default:
			return state;
	}
};
