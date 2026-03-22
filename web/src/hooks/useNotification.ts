import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

export default () => {
  const dispatch = useDispatch<AppDispatch>();
  return (text: string, icon: any, color: string, app: string) => {
    dispatch({
      type: 'NOTIF_ADD',
      payload: { notification: { text, icon, color, time: Date.now(), app } },
    });
  };
};
