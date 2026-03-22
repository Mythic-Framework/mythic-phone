import Nui from '../../util/Nui';
import { AppDispatch } from '../../store';

export const SendMessage = (message: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await Nui.send<any>('SendMessage', message);
    if (res != null) {
      dispatch({ type: 'ADD_DATA', payload: { type: 'messages', first: true, data: { ...message } } });
      return true;
    }
    return false;
  } catch { return false; }
};

export const ReadConvo = (number: string, messages: any[]) => (dispatch: AppDispatch) => {
  Nui.send('ReadConvo', { number }).then(() => {
    dispatch({
      type: 'SET_DATA',
      payload: { type: 'messages', data: messages.map(m => ({ ...m, unread: m.number === number ? false : m.unread })) },
    });
  }).catch(() => {});
};

export const DeleteConvo = (number: string, myNumber: string, messages: any[]) => (dispatch: AppDispatch) => {
  Nui.send('DeleteConvo', { number }).then(() => {
    dispatch({ type: 'SET_DATA', payload: { type: 'messages', data: messages.filter((m: any) => m.number !== number) } });
  }).catch(() => {});
};
