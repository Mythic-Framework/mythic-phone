import Nui from '../../util/Nui';

export const GetMessages = async (channel: string, joined: any) => {
	try {
		return await Nui.send('GetMessages', { channel, joined });
	} catch (err) { console.log(err); return []; }
};

export const SendMessage = async (channel: string, message: string) => {
	try {
	} catch (err) { console.log(err); return false; }
};

const slugify = (input: string): string =>
	input.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

export const JoinChannel = async (channel: string, dispatch: any) => {
	try {
		let slug = slugify(channel);
		let res = await (await Nui.send('JoinChannel', slug)).json();
		if (res) {
			dispatch({ type: 'ADD_DATA', payload: { type: 'ircChannels', data: { _id: slug, name: channel, joined: Date.now(), pinned: false } } });
		} else return false;
	} catch (err) { console.log(err); return false; }
};

export const LeaveChannel = (channel: string) => async (dispatch: any) => {
	try {
		let res = await (await Nui.send('LeaveChannel', channel)).json();
		if (res) { dispatch({ type: 'REMOVE_DATA', payload: { type: 'ircChannels', id: channel } }); }
		else return false;
	} catch (err) { console.log(err); return false; }
};
