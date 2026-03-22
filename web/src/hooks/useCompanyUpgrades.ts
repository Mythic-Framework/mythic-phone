import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default () => {
  const upgrades = useSelector((state: RootState) => state.data.data.companyUpgrades);
  const JobData = useSelector((state: RootState) => state.data.data.JobData);
  return (_upgrade: string): boolean => false;
};
