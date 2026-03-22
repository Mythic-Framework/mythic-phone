import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../components';
import Nui from '../../util/Nui';
import { useAlert } from '../../hooks';
import { install } from '../../Apps/store/action';
import { RootState, AppDispatch } from '../../store';

const USB: FC = () => {
  const showAlert = useAlert();
  const dispatch = useDispatch<AppDispatch>();
  const open = useSelector((state: RootState) => (state as any).usb.open);
  const usb = useSelector((state: RootState) => (state as any).usb.usb);

  const onClose = () => dispatch({ type: 'USE_USB', payload: false });

  const onInstall = () => {
    try {
      dispatch(install(usb.app) as any);
      dispatch({ type: 'USE_USB', payload: false });
    } catch {}
  };

  const onEject = async () => {
    try {
      dispatch({ type: 'REMOVE_USB' });
      showAlert('Ejected USB');
    } catch {
      dispatch({ type: 'USE_USB', payload: false });
      showAlert('Unable to Eject USB');
    }
  };

  if (!usb) return null;

  return (
    <Modal
      open={open}
      title={`USB: ${usb.app}`}
      onClose={onClose}
      onAccept={onInstall}
      onDelete={onEject}
      acceptLang="Install"
      deleteLang="Eject USB"
    />
  );
};

export default USB;
