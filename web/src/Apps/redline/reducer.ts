export interface RedlineState { tab: number; inRace: boolean; creator: any; races: any[]; }
export const initialState: RedlineState = {
  tab: 0,
  inRace: false,
  creator: null,
  races: [
    // Pending - Setup (state 0)
    {
      _id: 'race_001',
      name: 'Sunday Sprint',
      host: 'Test',
      host_src: 1,
      host_id: '6088b90c93a7b379e0c83ef2',
      track: 1,
      laps: 3,
      buyin: 5000,
      countdown: 20,
      dnf_start: 3,
      dnf_time: 120,
      state: 0,
      time: Date.now() - 60000,
      racers: {
        Test: {},
        SpeedDemon: {},
        NightRider: {},
      },
    },
    // Pending - In Progress (state 1)
    {
      _id: 'race_002',
      name: 'Midnight Run',
      host: 'SpeedKing',
      host_src: 2,
      host_id: 'other_id_001',
      track: 1,
      laps: 1,
      buyin: 10000,
      countdown: 20,
      dnf_start: 2,
      dnf_time: 180,
      state: 1,
      time: Date.now() - 300000,
      racers: {
        SpeedKing: { finished: false },
        DriftKing: { finished: false },
      },
    },
    // Recent - Finished (state 2)
    {
      _id: 'race_003',
      name: 'Friday Night Drag',
      host: 'Test',
      host_src: 1,
      host_id: '6088b90c93a7b379e0c83ef2',
      track: 1,
      laps: 1,
      buyin: 2500,
      countdown: 20,
      dnf_start: 2,
      dnf_time: 90,
      state: 2,
      time: Date.now() - 3600000,
      racers: {
        Test: {
          finished: true,
          place: 1,
          reward: { cash: 7500 },
          fastest: { lapStart: 0, lapEnd: 62340 },
        },
        NightRider: {
          finished: true,
          place: 2,
          reward: { cash: 0 },
          fastest: { lapStart: 0, lapEnd: 68100 },
        },
        SlowPoke: {
          finished: false,
        },
      },
    },
    // Recent - Finished (state 2)
    {
      _id: 'race_004',
      name: 'Canyon Carve',
      host: 'DriftKing',
      host_src: 3,
      host_id: 'other_id_002',
      track: 1,
      laps: 2,
      buyin: 15000,
      countdown: 30,
      dnf_start: 3,
      dnf_time: 240,
      state: 2,
      time: Date.now() - 86400000,
      racers: {
        DriftKing: {
          finished: true,
          place: 1,
          reward: { cash: 30000 },
          fastest: { lapStart: 0, lapEnd: 55200 },
        },
        Test: {
          finished: true,
          place: 2,
          reward: { cash: 0 },
          fastest: { lapStart: 0, lapEnd: 57800 },
        },
        SpeedKing: {
          finished: false,
        },
      },
    },
  ],
};

export default function raceReducer(state = initialState, action: any): RedlineState {
  switch (action.type) {
    case 'SET_RACE_TAB': return { ...state, tab: action.payload.tab };
    case 'RACE_STATE_CHANGE': return { ...state, creator: action.payload.state };
    case 'EVENT_SPAWN': return { ...state, races: action.payload.races.filter((r: any) => r.state != -1), inRace: false };
    case 'I_RACE': return { ...state, inRace: action.payload.state };
    case 'ADD_PENDING_RACE': return { ...state, races: [...state.races, action.payload] };
    case 'CANCEL_RACE': return { ...state, races: state.races.filter((r: any) => r._id != action.payload.race), inRace: action.payload.myRace ? false : state.inRace };
    case 'STATE_UPDATE': return { ...state, races: state.races.map((r: any) => r._id == action.payload.race ? { ...r, state: action.payload.state } : r) };
    case 'JOIN_RACE': return { ...state, races: state.races.map((r: any) => r._id == action.payload.race ? { ...r, racers: { ...r.racers, [action.payload.racer]: {} } } : r) };
    case 'LEAVE_RACE': return { ...state, races: state.races.map((r: any) => r._id == action.payload.race ? { ...r, racers: Object.fromEntries(Object.entries(r.racers).filter(([k]) => k != action.payload.racer)) } : r) };
    case 'RACER_FINISHED': return { ...state, races: state.races.map((r: any) => r._id == action.payload.race ? { ...r, racers: { ...r.racers, [action.payload.racer]: action.payload.finish } } : r) };
    case 'FINISH_RACE': return { ...state, races: state.races.map((r: any) => r._id == action.payload.index ? action.payload.race : r) };
    case 'UI_RESET': return { ...initialState };
    default: return state;
  }
}
