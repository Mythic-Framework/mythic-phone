import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default () => {
  const myReps = useSelector((state: RootState) => state.data.data.player?.Reputations);
  return (rep: string, value = 0): boolean => Boolean(myReps) && Boolean(myReps[rep]) && myReps[rep] >= value;
};
