import { useSelector } from 'react-redux';
import { RootState } from '../store';
import usePermissions from './usePermissions';
import useJobPermissions from './useJobPermissions';
import useMyStates from './useMyStates';
import useMyJob from './useMyJob';
import useReputation from './useReputation';

export default () => {
  const hasJob = useMyJob();
  const hasJobPerm = useJobPermissions();
  const hasPhonePerm = usePermissions();
  const hasState = useMyStates();
  const hasRep = useReputation();
  const apps = useSelector((state: RootState) => state.phone.apps) ?? {};
  const limited = useSelector((state: RootState) => state.phone.limited);

  const avail: Record<string, any> = {};
  Object.keys(apps).forEach(k => {
    const a = apps[k];
    if (
      (!limited || a.name === 'phone') &&
      (!a.restricted ||
        (a.restricted.job && hasJob(a.restricted.job)) ||
        (a.restricted.state && hasState(a.restricted.state)) ||
        (a.restricted.jobPermission && hasJobPerm(a.restricted.jobPermission)) ||
        (a.restricted.phonePermission && hasPhonePerm(a.name, a.restricted.phonePermission)) ||
        (a.restricted.reputation && hasRep(a.restricted.reputation, a.restricted.reputationAmount ?? 0)))
    ) {
      avail[a.name] = a;
    }
  });
  return avail;
};
