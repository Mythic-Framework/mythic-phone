import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import Nui from '../util/Nui';

export default () => {
  const dispatch = useDispatch<AppDispatch>();
  return async (action: string, type: string, app: string) => {
    await Nui.send(type, { action, app });
    if (action === 'add') {
      dispatch({ type: 'ADD_DATA', payload: { type: type.toLowerCase(), data: app } });
    } else {
      dispatch({ type: 'REMOVE_DATA', payload: { type: type.toLowerCase(), id: app } });
    }
  };
};
