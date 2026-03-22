import Nui from '../../util/Nui';
import { AppDispatch } from '../../store';

export const UpdateSetting = (type: string, val: any) => (dispatch: AppDispatch) => {
  Nui.send('UpdateSetting', { type, val }).then(() => {
    dispatch({ type: 'UPDATE_DATA', payload: { type: 'player', id: 'PhoneSettings', key: type, data: val } });
  }).catch(console.error);
};

export const TestSound = (type: string, val: any) => () => {
  Nui.send('TestSound', { type, val });
};
