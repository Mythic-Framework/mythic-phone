import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Pagination } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nui from '../../util/Nui';
import { Confirm } from '../../components';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import Tweet from './Tweet';
import { RootState } from '../../store';

interface TweetListProps { tweetOpen: boolean; setTweetOpen: (v: boolean) => void; }
export default function TweetList({ tweetOpen, setTweetOpen }: TweetListProps) {
  const showAlert = useAlert();
  const T = useAppColor('twitter');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T08 = hexAlpha(T, 0.08);

  const tweets = useSelector((state: RootState) => state.data.data.tweets) ?? [];
  const player = useSelector((state: RootState) => state.data.data.player);
  const pages = Math.ceil(tweets.length / 20);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState('');
  const [usingImg, setUsingImg] = useState(false);
  const [imgLink, setImgLink] = useState('');
  const [sending, setSending] = useState(false);
  const [pendingRetweet, setPendingRetweet] = useState<any>(null);

  const onReply = (name: string) => { setContent(`@${name} `); setTweetOpen(true); };
  const onClose = () => { setTweetOpen(false); setContent(''); setUsingImg(false); setImgLink(''); };

  const sendTweet = async (tweet: any) => {
    try {
      const res = await (await Nui.send('SendTweet', tweet)).json();
      return !!res;
    } catch { return false; }
  };

  const onRetweet = async () => {
    const res = await sendTweet({ ...pendingRetweet, author: player.Alias.twitter, content: `RETWEET @${pendingRetweet.author.name} "${pendingRetweet.content}"`, time: Date.now(), retweet: pendingRetweet._id, likes: [] });
    setPendingRetweet(null);
    showAlert(res ? 'Retweeted' : 'Unable to Retweet');
  };

  const onCreate = async () => {
    setSending(true);
    const res = await sendTweet({ time: Date.now(), content, image: { using: usingImg, link: imgLink }, likes: [] });
    setSending(false);
    showAlert(res ? 'Tweet Sent' : 'Unable to Send Tweet');
    if (res) onClose();
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '8px',
      '& fieldset': { borderColor: hexAlpha(T, 0.3) },
      '&:hover fieldset': { borderColor: hexAlpha(T, 0.6) },
      '&.Mui-focused fieldset': { borderColor: T },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: T },
    '& .MuiInputBase-input': { color: '#fff' },
    '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,0.25)' },
  };

  // --- Compose full-page view ---
  if (tweetOpen) {
    return (
      <div style={{ height: '100%', background: '#0a0c10', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Tweet content card */}
          <div style={{ background: T08, border: `1px solid ${T20}`, borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 11, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>
              What's happening?
            </div>
            <TextField
              fullWidth multiline rows={5} variant="outlined"
              placeholder="Share something..."
              value={content} onChange={e => setContent(e.target.value)}
              inputProps={{ maxLength: 180 }}
              sx={inputSx}
            />
            <div style={{ textAlign: 'right', fontSize: 11, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)' }}>
              {content.length} / 180
            </div>
          </div>

          {/* Attachment card */}
          <div style={{ background: T08, border: `1px solid ${T20}`, borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 11, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>
              Attachment
            </div>
            <button
              onClick={() => { setUsingImg(p => !p); setImgLink(''); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: usingImg ? T20 : 'transparent',
                border: `1px solid ${usingImg ? T50 : hexAlpha(T, 0.3)}`,
                borderRadius: 8,
                color: usingImg ? T : hexAlpha(T, 0.7),
                padding: '8px 14px', fontSize: 12,
                fontFamily: "'Oswald', sans-serif", letterSpacing: '0.08em',
                cursor: 'pointer', transition: 'all 0.18s', alignSelf: 'flex-start',
              }}
            >
              <FontAwesomeIcon icon={['fas', 'image']} />
              {usingImg ? 'Remove Image' : 'Attach Image'}
            </button>
            {usingImg && (
              <>
                <TextField fullWidth label="Imgur Link" variant="outlined"
                  value={imgLink} onChange={e => setImgLink(e.target.value)}
                  helperText="Imgur links only" sx={inputSx} />
                {imgLink && (
                  <img src={imgLink} alt="preview" style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 8, border: `1px solid ${hexAlpha(T, 0.3)}` }} />
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ flexShrink: 0, display: 'flex', gap: 10, padding: '12px 16px', borderTop: `1px solid ${T20}`, background: 'rgba(8,10,14,0.98)' }}>
          <button
            onClick={onClose}
            style={{ flex: 1, height: 44, borderRadius: 10, fontSize: 13, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.18s', background: 'rgba(180,40,40,0.15)', border: '1px solid rgba(180,40,40,0.4)', color: '#e07070' }}
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            disabled={!content.trim() || sending}
            style={{ flex: 1, height: 44, borderRadius: 10, fontSize: 13, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', cursor: !content.trim() || sending ? 'not-allowed' : 'pointer', transition: 'all 0.18s', background: T20, border: `1px solid ${T50}`, color: T, opacity: !content.trim() || sending ? 0.35 : 1 }}
          >
            {sending ? 'Sending...' : 'Send Tweet'}
          </button>
        </div>
      </div>
    );
  }

  // --- Feed view ---
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowX: 'hidden', overflowY: 'auto' }}>
        {[...tweets].sort((a: any, b: any) => b.time - a.time).slice(0, 200).slice((page - 1) * 20, page * 20).map((tweet: any) => (
          <Tweet key={tweet._id} tweet={tweet} rtcount={tweets.filter((t: any) => t.retweet == tweet._id).length} onReply={onReply} onRetweet={setPendingRetweet} />
        ))}
        {pages > 1 && <Pagination count={pages} page={page} onChange={(_, v) => setPage(v)} variant="outlined" color="primary" style={{ padding: '5%' }} />}
      </div>
      <Confirm title="Retweet?" open={pendingRetweet != null} confirm="Retweet" decline="Cancel" onConfirm={onRetweet} onDecline={() => setPendingRetweet(null)} />
    </div>
  );
}
