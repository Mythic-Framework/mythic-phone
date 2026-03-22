export interface BluelineState { tab: number; inRace: boolean; creator: any; races: any[]; }
export const initialState: BluelineState = {
  tab: 0,
  inRace: false,
  creator: null,
  races: [
    // Pending - Setup (state 0)
    {
      _id: 'pd_race_001',
      name: 'Morning Drill',
      host: 'Officer Hayes',
      host_src: 1,
      host_id: 'pd_host_001',
      track: 1,
      laps: 2,
      buyin: 0,
      countdown: 5,
      dnf_start: 3,
      dnf_time: 120,
      state: 0,
      time: Date.now() - 60000,
      racers: {
        'Officer Hayes': {},
        'Deputy Cruz': {},
        'Sgt. Reeves': {},
      },
    },
    // Pending - In Progress (state 1)
    {
      _id: 'pd_race_002',
      name: 'Pursuit Qualifier',
      host: 'Lt. Vance',
      host_src: 2,
      host_id: 'pd_host_002',
      track: 1,
      laps: 1,
      buyin: 0,
      countdown: 5,
      dnf_start: 2,
      dnf_time: 180,
      state: 1,
      time: Date.now() - 300000,
      racers: {
        'Lt. Vance': { finished: false },
        'Officer Marsh': { finished: false },
      },
    },
    // Recent - Finished (state 2)
    {
      _id: 'pd_race_003',
      name: 'Tactical Sprint',
      host: 'Officer Hayes',
      host_src: 1,
      host_id: 'pd_host_001',
      track: 1,
      laps: 1,
      buyin: 0,
      countdown: 5,
      dnf_start: 2,
      dnf_time: 90,
      state: 2,
      time: Date.now() - 3600000,
      racers: {
        'Officer Hayes': {
          finished: true,
          place: 1,
          reward: { cash: 0 },
          fastest: { lapStart: 0, lapEnd: 58400 },
        },
        'Deputy Cruz': {
          finished: true,
          place: 2,
          reward: { cash: 0 },
          fastest: { lapStart: 0, lapEnd: 61200 },
        },
        'Sgt. Reeves': {
          finished: false,
        },
      },
    },
    // Recent - Finished (state 2)
    {
      _id: 'pd_race_004',
      name: 'Pursuit Endurance',
      host: 'Lt. Vance',
      host_src: 2,
      host_id: 'pd_host_002',
      track: 1,
      laps: 3,
      buyin: 0,
      countdown: 5,
      dnf_start: 3,
      dnf_time: 240,
      state: 2,
      time: Date.now() - 86400000,
      racers: {
        'Lt. Vance': {
          finished: true,
          place: 1,
          reward: { cash: 0 },
          fastest: { lapStart: 0, lapEnd: 54800 },
        },
        'Officer Marsh': {
          finished: true,
          place: 2,
          reward: { cash: 0 },
          fastest: { lapStart: 0, lapEnd: 57300 },
        },
        'Officer Hayes': {
          finished: false,
        },
      },
    },
  ],
};

export default function pdRaceReducer(state = initialState, action: any): BluelineState {
  switch (action.type) {
    case 'PD_SET_RACE_TAB': return { ...state, tab: action.payload.tab };
    case 'PD_RACE_STATE_CHANGE': return { ...state, creator: action.payload.state };
    case 'PD_EVENT_SPAWN': return { ...state, races: action.payload.races.filter((r: any) => r.state != -1), inRace: false };
    case 'PD_I_RACE': return { ...state, inRace: action.payload.state };
    case 'PD_ADD_PENDING_RACE': return { ...state, races: [...state.races, action.payload] };
    case 'PD_CANCEL_RACE': return { ...state, races: state.races.filter((r: any) => r._id != action.payload.race), inRace: action.payload.myRace ? false : state.inRace };
    case 'PD_STATE_UPDATE': return { ...state, races: state.races.map((r: any) => r._id == action.payload.race ? { ...r, state: action.payload.state } : r) };
    case 'PD_JOIN_RACE': return { ...state, races: state.races.map((r: any) => r._id == action.payload.race ? { ...r, racers: { ...r.racers, [action.payload.racer]: {} } } : r) };
    case 'PD_LEAVE_RACE': return { ...state, races: state.races.map((r: any) => r._id == action.payload.race ? { ...r, racers: Object.fromEntries(Object.entries(r.racers).filter(([k]) => k != action.payload.racer)) } : r) };
    case 'PD_RACER_FINISHED': return { ...state, races: state.races.map((r: any) => r._id == action.payload.race ? { ...r, racers: { ...r.racers, [action.payload.racer]: action.payload.finish } } : r) };
    case 'PD_FINISH_RACE': return { ...state, races: state.races.map((r: any) => r._id == action.payload.index ? action.payload.race : r) };
    case 'UI_RESET': return { ...initialState };
    default: return state;
  }
}
