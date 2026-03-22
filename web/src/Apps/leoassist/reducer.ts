interface SearchState {
	term: string;
	results: any[];
}

export interface LeoState {
	tab: number;
	personSearch: SearchState;
	vehicleSearch: SearchState;
	propertySearch: SearchState;
}

export const initialState: LeoState = {
	tab: 0,
	personSearch: {
		term: '',
		results: Array(),
	},
	vehicleSearch: {
		term: '',
		results: Array(),
	},
	propertySearch: {
		term: '',
		results: Array(),
	},
};

interface Action {
	type: string;
	payload?: any;
}

export default (state: LeoState = initialState, action: Action): LeoState => {
	switch (action.type) {
		case 'SET_LEO_TAB':
			return {
				...state,
				tab: action.payload.tab,
			};
		case 'SEARCH_VAL_CHANGE':
			return {
				...state,
				[`${action.payload.type}Search`]: {
					...(state as any)[`${action.payload.type}Search`],
					term: action.payload.term,
				},
			};
		case 'SEARCH_RESULTS':
			return {
				...state,
				[`${action.payload.type}Search`]: {
					...(state as any)[`${action.payload.type}Search`],
					results: action.payload.results,
				},
			};
		case 'UI_RESET':
			return {
				...initialState,
			};
		default:
			return state;
	}
};
