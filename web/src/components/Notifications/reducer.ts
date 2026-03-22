interface NotifState {
  open: string | null;
  new: any[];
  notifications: any[];
}

export const initialState: NotifState = {
  open: null,
  new: [],
  notifications: [],
};

export default (state: NotifState = initialState, action: any): NotifState => {
  switch (action.type) {
    case 'NOTIF_RESET_APP':
      return { ...state, open: null };
    case 'NOTIF_HIDE':
      return { ...state, notifications: state.notifications.map((n) => n._id === action.payload.id ? { ...n, show: false } : n) };
    case 'NOTIF_COLLAPSE':
      return { ...state, notifications: state.notifications.map((n) => n._id === action.payload.id ? { ...n, collapsed: true } : n) };
    case 'APP_OPEN':
      return { ...state, open: action.payload };
    case 'NOTIF_ADD':
      return {
        ...state,
        notifications: Boolean(action.payload.notification._id) &&
          state.notifications.some((n) => n._id === action.payload.notification._id)
          ? state.notifications.map((n) => n._id === action.payload.notification._id ? { ...action.payload.notification, collapsed: false } : n)
          : [{ _id: state.notifications.length, ...action.payload.notification, collapsed: false }, ...state.notifications],
      };
    case 'NOTIF_UPDATE':
      return { ...state, notifications: state.notifications.map((n) => n._id === action.payload.id ? { ...n, title: action.payload.title, description: action.payload.description, collapsed: false } : n) };
    case 'REMOVE_NEW_NOTIF':
      return { ...state, new: state.new.filter((_, i) => i > 0) };
    case 'NOTIF_DISMISS':
      return { ...state, notifications: state.notifications.filter((_, i) => i !== action.payload.index) };
    case 'NOTIF_DISMISS_APP':
      return { ...state, notifications: state.notifications.filter((n) => n.app !== action.payload.app) };
    case 'NOTIF_DISMISS_ALL':
      return { ...state, notifications: [] };
    default:
      return state;
  }
};
