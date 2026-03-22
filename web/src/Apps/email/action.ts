import Nui from '../../util/Nui';

export const ReadEmail = (email: any) => (dispatch: any) => {
	Nui.send('ReadEmail', email._id)
		.then(() => {
			dispatch({ type: 'UPDATE_DATA', payload: { type: 'emails', id: email._id, data: { ...email, unread: false } } });
		})
		.catch(() => { return; });
};

export const DeleteEmail = (id: string) => (dispatch: any) => {
	Nui.send('DeleteEmail', id)
		.then(() => {
			dispatch({ type: 'REMOVE_DATA', payload: { type: 'emails', id } });
			return true;
		})
		.catch(() => false);
};

export const GPSRoute = (id: string, location: any) => (dispatch: any) => {
	Nui.send('GPSRoute', { id, location })
		.then(() => { dispatch({ type: 'ALERT_SHOW', payload: { alert: 'GPS Marked' } }); })
		.catch(() => { dispatch({ type: 'ALERT_SHOW', payload: { alert: 'Unable To Mark Location On GPS' } }); });
};

export const Hyperlink = (id: string, hyperlink: string) => (dispatch: any) => {
	Nui.send('Hyperlink', { id, hyperlink })
		.catch(() => { dispatch({ type: 'ALERT_SHOW', payload: { alert: 'Unable To Open Hyperlink' } }); });
};
