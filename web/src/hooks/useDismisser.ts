import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

export default () => {
  const dispatch = useDispatch<AppDispatch>();
  return (id: string | null = null) => {
    if (id != null) {
      if (id === 'new') dispatch({ type: 'REMOVE_NEW_NOTIF' });
      else dispatch({ type: 'NOTIF_HIDE', payload: { id } });
    } else {
      dispatch({ type: 'NOTIF_DISMISS_ALL' });
    }
  };
};
