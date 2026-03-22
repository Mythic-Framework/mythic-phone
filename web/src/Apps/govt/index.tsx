import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Grid, List } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Sanitize } from '../../util/Parser';
import { Confirm } from '../../components';
import Service from './components/Service';
import { useAlert } from '../../hooks';
import Nui from '../../util/Nui';

const useStyles = makeStyles((theme: any) => ({
	wrapper: { height: '100%', background: theme.palette.secondary.main },
	header: { background: '#5597d0', fontSize: 20, padding: 15, lineHeight: '50px', height: 78 },
	headerAction: {},
}));

const GovtIndex: React.FC = () => {
	const classes = useStyles();
	const showAlert = useAlert();
	const services = useSelector((state: any) => state.data.data.govtServices);

	const [selected, setSelected] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const onPurchase = async () => {
		setLoading(true);
		try {
			let res = await (await Nui.send('Govt:PurchaseService', selected._id)).json();
			if (!res.error) { showAlert("You've Successfully Registered A New Company"); }
			else {
				switch (res.code) {
					case 1: showAlert('Unable to Purchase Service'); break;
					case 2: showAlert(res.message); break;
					case 3: showAlert('You Dont Have Enough Money, Broke Ass'); break;
				}
			}
		} catch (err) { console.log(err); showAlert('Unable to Purchase Service'); }
		setSelected(null);
		setLoading(false);
	};

	return (
		<>
			<div className={classes.wrapper}>
				<AppBar position="static" className={classes.header}>
					<Grid container>
						<Grid item xs={8}>Los Santos Services</Grid>
						<Grid item xs={4} style={{ textAlign: 'right' }} />
					</Grid>
				</AppBar>
				<List>
					{services.map((service: any) => (
						<Service key={`srvc-${service._id}`} service={service} onSelect={setSelected} />
					))}
				</List>
			</div>
			{Boolean(selected) && (
				<Confirm title="Purchase Service?" open={true} confirm="Yes" decline="No" onConfirm={onPurchase} onDecline={() => setSelected(null)}>
					<p>{Sanitize(selected.Disclaimer)}</p>
				</Confirm>
			)}
		</>
	);
};

export default GovtIndex;
