import Nui from '../../util/Nui';
import { AppDispatch } from '../../store';

export const CreateAdvert = (id: string, advert: any, cb: () => void) => (dispatch: AppDispatch) => {
  Nui.send('CreateAdvert', advert).then(() => cb()).catch(() => {});
};
export const UpdateAdvert = (id: string, advert: any, cb: () => void) => (dispatch: AppDispatch) => {
  Nui.send('UpdateAdvert', advert).then(() => cb()).catch(() => {});
};
export const DeleteAdvert = (id: string, cb: () => void) => (dispatch: AppDispatch) => {
  Nui.send('DeleteAdvert', { id }).then(() => cb()).catch(() => {});
};
export const BumpAdvert = (id: string, myAd: any, cb: () => void) => (dispatch: AppDispatch) => {
  Nui.send('UpdateAdvert', { ...myAd, time: Date.now() }).then(() => cb()).catch(() => cb());
};
