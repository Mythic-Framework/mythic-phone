import Nui from '../../util/Nui';
import { AppDispatch } from '../../store';

function failedInstall(dispatch: AppDispatch, app: string) {
  dispatch({ type: 'ALERT_SHOW', payload: { alert: 'App Install Failed' } });
  dispatch({ type: 'FAILED_INSTALL', payload: { app } });
  setTimeout(() => dispatch({ type: 'END_INSTALL', payload: { app } }), 2000);
}
function failedUninstall(dispatch: AppDispatch, app: string) {
  dispatch({ type: 'ALERT_SHOW', payload: { alert: 'App Uninstall Failed' } });
  dispatch({ type: 'FAILED_UNINSTALL', payload: { app } });
  setTimeout(() => dispatch({ type: 'END_UNINSTALL', payload: { app } }), 2000);
}

export const install = (app: string) => (dispatch: AppDispatch) => {
  dispatch({ type: 'PENDING_INSTALL', payload: { app } });
  Nui.send('Install', { app, check: true }).then(async (res) => {
    if (res) {
      dispatch({ type: 'START_INSTALL', payload: { app } });
      const t = Math.floor(Math.random() * 10001);
      setTimeout(() => {
        Nui.send('Install', { app }).then(async (r) => {
          if (r) {
            dispatch({ type: 'ADD_DATA', payload: { type: 'installed', data: app } });
            dispatch({ type: 'END_INSTALL', payload: { app } });
          } else failedInstall(dispatch, app);
        }).catch(() => failedInstall(dispatch, app));
      }, t);
    } else failedInstall(dispatch, app);
  }).catch(() => failedInstall(dispatch, app));
};

export const uninstall = (app: string) => (dispatch: AppDispatch) => {
  dispatch({ type: 'PENDING_UNINSTALL', payload: { app } });
  Nui.send('Uninstall', { app, check: true }).then(async (res) => {
    if (res) {
      dispatch({ type: 'START_UNINSTALL', payload: { app } });
      const t = Math.floor(Math.random() * 5001);
      setTimeout(() => {
        Nui.send('Uninstall', { app }).then(async (r) => {
          if (r) {
            dispatch({ type: 'REMOVE_DATA', payload: { type: 'installed', id: app } });
            dispatch({ type: 'REMOVE_DATA', payload: { type: 'home', id: app } });
            dispatch({ type: 'REMOVE_DATA', payload: { type: 'dock', id: app } });
            dispatch({ type: 'END_UNINSTALL', payload: { app } });
            dispatch({ type: 'ALERT_SHOW', payload: { alert: 'App Uninstalled Successfully' } });
          } else failedInstall(dispatch, app);
        }).catch(() => failedUninstall(dispatch, app));
      }, t);
    } else failedUninstall(dispatch, app);
  }).catch(() => failedUninstall(dispatch, app));
};
