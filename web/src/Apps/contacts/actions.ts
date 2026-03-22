import Nui from '../../util/Nui';
import { AppDispatch } from '../../store';

export const createContact = (contact: any) => (dispatch: AppDispatch) => {
  Nui.send('CreateContact', contact).then(async (res: any) => {
    if (res != null) {
      dispatch({ type: 'ADD_DATA', payload: { type: 'contacts', data: { ...contact, _id: await res.json() } } });
    }
  });
};

export const updateContact = (id: string, contact: any) => (dispatch: AppDispatch) => {
  Nui.send('UpdateContact', { ...contact, id }).then((res: any) => {
    if (res) dispatch({ type: 'UPDATE_DATA', payload: { type: 'contacts', id, data: contact } });
  });
};

export const deleteContact = (id: string) => (dispatch: AppDispatch) => {
  Nui.send('DeleteContact', { id }).then((res: any) => {
    if (res) dispatch({ type: 'REMOVE_DATA', payload: { type: 'contacts', id } });
  });
};
