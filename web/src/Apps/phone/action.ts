import { AppDispatch } from '../../store';
import Nui from '../../util/Nui';

export const acceptCall = (number: string) => (dispatch: AppDispatch) => {
  Nui.send('AcceptCall', { number });
};

export const endCall = () => (dispatch: AppDispatch) => {
  Nui.send('EndCall', {});
};

export const readCalls = () => (dispatch: AppDispatch) => {
  Nui.send('ReadCalls', {});
};

export const dismissIncoming = () => (dispatch: AppDispatch) => {
  dispatch({ type: 'DISMISS_INCOMING' });
};

export const showIncoming = () => (dispatch: AppDispatch) => {
  dispatch({ type: 'SHOW_INCOMING' });
};
