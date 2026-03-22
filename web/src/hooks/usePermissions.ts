import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default () => {
  const myPermissions = useSelector((state: RootState) => state.data.data.player?.PhonePermissions);
  return (app: string, permission: string): boolean => {
    return Boolean(myPermissions) && Boolean(myPermissions[app]?.[permission]);
  };
};
