interface AlertState { alerts: string[] }

export const initialState: AlertState = { alerts: [] };

export default (state: AlertState = initialState, action: any): AlertState => {
  switch (action.type) {
    case 'ALERT_SHOW':
      return { ...state, alerts: [...state.alerts, action.payload.alert] };
    case 'ALERT_EXPIRE':
      return { ...state, alerts: state.alerts.filter((_, i) => i > 0) };
    case 'ALERTS_RESET':
      return { ...state, alerts: [] };
    default:
      return state;
  }
};
