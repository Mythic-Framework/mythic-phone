import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert } from '../../hooks';
import { DeleteAdvert, BumpAdvert } from './action';
import { RootState, AppDispatch } from '../../store';

const useStyles = makeStyles((theme: any) => ({
  add: { position: 'absolute', bottom: '12%', right: '10%', backgroundColor: '#f9a825', fontSize: 22, opacity: 0.3, '&:hover': { opacity: 1 } },
  delete: { position: 'absolute', bottom: '19%', right: '10%', backgroundColor: theme.palette.error.main, fontSize: 22, opacity: 0.3, '&:hover': { opacity: 1 } },
  bump: { position: 'absolute', bottom: '26%', right: '10%', backgroundColor: theme.palette.error.light, fontSize: 22, opacity: 0.3, '&:hover': { opacity: 1 } },
}));

export default function ActionButtons() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const showAlert = useAlert();
  const myAdvertId = useSelector((state: RootState) => state.data.data.player?.Source);
  const myAdvert = useSelector((state: RootState) => state.data.data.adverts)?.[myAdvertId];
  const [del, setDel] = useState(false);

  const onDelete = () => {
    setDel(true);
    setTimeout(() => dispatch(DeleteAdvert(myAdvertId, () => showAlert('Advertisement Deleted'))), 500);
  };
  const onBump = () => dispatch(BumpAdvert(myAdvertId, myAdvert, () => showAlert('Advertisement Bumped')));

  return (
    <>
      {myAdvert && !del ? (
        <>
          <Fab className={classes.add} onClick={() => navigate('/apps/adverts/edit')}><FontAwesomeIcon icon={['fas', 'pen-to-square']} /></Fab>
          <Fab className={classes.delete} onClick={onDelete} disabled={del}><FontAwesomeIcon icon={['fas', 'trash']} /></Fab>
          {myAdvert.time < Date.now() - 1000 * 60 * 30 && <Fab className={classes.bump} onClick={onBump}><FontAwesomeIcon icon={['fas', 'upload']} /></Fab>}
        </>
      ) : (
        <Fab className={classes.add} onClick={() => navigate('/apps/adverts/add')}><FontAwesomeIcon icon={['fas', 'plus']} /></Fab>
      )}
    </>
  );
}
