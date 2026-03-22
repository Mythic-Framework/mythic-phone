export interface LaborState {
	tab: number;
}

export const initialState: LaborState = {
	tab: 0,
};

interface Action {
	type: string;
	payload?: any;
}

export default (state: LaborState = initialState, action: Action): LaborState => {
	switch (action.type) {
		case 'SET_LABOR_TAB':
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
