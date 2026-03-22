import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

export default () => {
  const dispatch = useDispatch<AppDispatch>();
  return (app: string) => {
    dispatch({ type: 'APP_OPEN', payload: app });
  };
};
