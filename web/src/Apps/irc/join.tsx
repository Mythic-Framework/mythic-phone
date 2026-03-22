import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Nui from '../../util/Nui';
import { Loader } from '../../components';
import { useAlert, useAppColor } from '../../hooks';

const Join: React.FC = () => {
  const showAlert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const T = useAppColor('irc');
  const { channel } = useParams<{ channel: string }>();

  useEffect(() => {
    const func = async () => {
      if (channel) {
        try {
          let res = await (await Nui.send('JoinIRCChannel', channel)).json();
          if (res) {
            dispatch({ type: 'ADD_DATA', payload: { type: 'ircChannels', data: { slug: channel, joined: Date.now(), pinned: false } } });
            navigate(`/apps/irc/view/${channel}`, { replace: true });
            showAlert('Joined Channel');
          } else {
            navigate(-1);
            showAlert('Unable To Join Channel');
          }
        } catch (err) {
          console.log(err);
          navigate(-1);
          showAlert('Unable To Join Channel');
        }
      }
    };
    func();
  }, [channel]);

  return (
    <div style={{ height: '100%', background: 'rgba(10,13,18,0.98)', overflowY: 'auto', overflowX: 'hidden' }}>
      <Loader text="Joining Channel" />
    </div>
  );
};

export default Join;
