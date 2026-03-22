export interface Dyn8State {
	propertySearch: {
		term: string;
		results: any[];
	};
}

export const initialState: Dyn8State = {
	propertySearch: { term: '', results: [] },
};

interface Action { type: string; payload?: any; }

export default (state: Dyn8State = initialState, action: Action): Dyn8State => {
	switch (action.type) {
		case 'DYN8_SEARCH_CHANGE':
			return { ...state, propertySearch: { ...state.propertySearch, term: action.payload.term } };
		case 'DYN8_RESULTS':
			return { ...state, propertySearch: { ...state.propertySearch, results: action.payload.results } };
		case 'UI_RESET':
			return { ...initialState };
		default:
			return state;
	}
};
