import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

export default () => {
  const dispatch = useDispatch<AppDispatch>();
  return (message: string) => {
    if (message != null) {
      dispatch({ type: 'ALERT_SHOW', payload: { alert: message } });
    }
  };
};
