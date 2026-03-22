import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default () => {
  const myPerms = useSelector((state: RootState) => state.data.data.JobPermissions);
  return (permissionKey: string, job: string | false = false): boolean => {
    if (!Array.isArray(myPerms) && permissionKey) {
      if (job) return !!myPerms?.[job]?.[permissionKey];
      return Object.values(myPerms ?? {}).some((jobPerms: any) => jobPerms[permissionKey]);
    }
    return false;
  };
};
