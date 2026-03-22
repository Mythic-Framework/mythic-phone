import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
	wrapper: { height: '100%', background: theme.palette.secondary.main },
}));

const Xor: React.FC = () => {
	const classes = useStyles();
	return <div className={classes.wrapper}>Coming ... Someday</div>;
};

export default Xor;
