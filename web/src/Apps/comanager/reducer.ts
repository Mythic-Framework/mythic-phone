export interface ComanagerState {
	rosterUpdated: number;
	roster: any;
	timeWorkedUpdated: number;
	timeWorked: any[];
	timeWorkedJob: string;
	tab: number;
}

export const initialState: ComanagerState = {
	rosterUpdated: 0,
	roster: false,
	timeWorkedUpdated: 0,
	timeWorked: [],
	timeWorkedJob: '',
	tab: 0,
};

interface Action {
	type: string;
	payload?: any;
}

export default (state: ComanagerState = initialState, action: Action): ComanagerState => {
	switch (action.type) {
		case 'SET_COM_TAB':
			return {
				...state,
				tab: action.payload.tab,
			};
		case 'UPDATE_ROSTERS':
			return {
				...state,
				rosterUpdated: Date.now(),
				roster: action.payload.roster,
			};
		case 'UPDATE_TIMEWORKED':
			return {
				...state,
				timeWorkedUpdated: Date.now(),
				timeWorked: action.payload.timeWorked,
				timeWorkedJob: action.payload.timeWorkedJob,
			};
		case 'UI_RESET':
			return {
				...initialState,
			};
		default:
			return state;
	}
};
