import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import Nui from '../util/Nui';

export default () => {
  const dispatch = useDispatch<AppDispatch>();
  return async (qry: { type: string; data: any }) => {
    await Nui.send('Reorder', { type: qry.type, apps: qry.data });
    dispatch({ type: 'SET_DATA', payload: qry });
  };
};
