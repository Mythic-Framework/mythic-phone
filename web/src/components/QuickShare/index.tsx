import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../components';
import Nui from '../../util/Nui';
import { useAlert } from '../../hooks';
import { RootState, AppDispatch } from '../../store';

const QuickShare: FC = () => {
  const showAlert = useAlert();
  const dispatch = useDispatch<AppDispatch>();
  const open = useSelector((state: RootState) => (state as any).share.open);
  const sharing = useSelector((state: RootState) => (state as any).share.sharing);

  const onClose = () => dispatch({ type: 'USE_SHARE', payload: false });

  const onSave = async () => {
    try {
      const res = await Nui.send<boolean>('SaveShare', sharing);
      if (res) { showAlert('Saved'); dispatch({ type: 'REMOVE_SHARE' }); }
      else { showAlert('Unable to Save'); onClose(); }
    } catch { showAlert('Unable to Save'); onClose(); }
  };

  const onCancel = () => { dispatch({ type: 'REMOVE_SHARE' }); showAlert('Rejected Share'); };

  if (!sharing) return null;

  switch (sharing.type) {
    case 'contacts':
      return (
        <Modal open={open} title="QuickShare: Contact" onClose={onClose} onAccept={onSave} acceptLang="Save Contact" closeLang="Cancel">
          <div><div>Name: {sharing.data.name}</div><div>Number: {sharing.data.number}</div></div>
        </Modal>
      );
    case 'documents':
      return (
        <Modal open={open} title={sharing.data.isCopy ? 'QuickShare: Copy of Document' : 'QuickShare: Document'} onClose={onClose} onAccept={onSave} acceptLang="Save Document" closeLang="Cancel">
          <div>Title: {sharing.data?.document?.title ?? 'Unknown'}</div>
        </Modal>
      );
    default:
      return null;
  }
};

export default QuickShare;
