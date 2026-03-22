import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default () => {
  const myStates = useSelector((state: RootState) => state.data.data.player?.States);
  return (state: string): boolean => Boolean(myStates) && myStates.includes(state);
};
