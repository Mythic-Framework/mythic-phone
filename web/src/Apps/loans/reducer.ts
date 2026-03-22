export interface LoansState {
	tab: number;
}

export const initialState: LoansState = {
	tab: 0,
};

interface Action {
	type: string;
	payload?: any;
}

export default (state: LoansState = initialState, action: Action): LoansState => {
	switch (action.type) {
		case 'SET_LOAN_TAB':
			return {
				...state,
				tab: action.payload.tab,
			};
		case 'UI_RESET':
			return {
				...initialState,
			};
		default:
			return state;
	}
};
