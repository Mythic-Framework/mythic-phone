import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nui from '../../util/Nui';
import { LightboxImage } from '../../components';
import { useAppColor, hexAlpha } from '../../hooks';
import { RootState } from '../../store';

interface Props { tweet: any; rtcount: number; onReply: (name: string) => void; onRetweet: (tweet: any) => void; }

export default function Tweet({ tweet, rtcount, onReply, onRetweet }: Props) {
  const T = useAppColor('twitter');
  const T50 = hexAlpha(T, 0.5);
  const T20 = hexAlpha(T, 0.2);
  const T08 = hexAlpha(T, 0.08);

  const player = useSelector((state: RootState) => state.data.data.player);
  const [favd, setFavd] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const hasAlias = Boolean(player.Alias?.twitter);
  const isLiked = tweet.likes.includes(player.ID);

  const onFavorite = async () => {
    if (favd) return;
    setFavd(true);
    await Nui.send('FavoriteTweet', { id: tweet._id, state: isLiked });
    setFavd(false);
  };

  const renderContent = (text: string) =>
    text.split(/(\s+)/).map((word, i) =>
      word.startsWith('#') || word.startsWith('@')
        ? <span key={i} style={{ color: T, fontWeight: 500 }}>{word}</span>
        : word
    );

  const formatDate = (time: number) =>
    new Date(time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const actionBtnStyle = (key: string, disabled: boolean, liked?: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '5px 9px',
    borderRadius: 6,
    border: 'none',
    background: !disabled && hoveredBtn === key ? (liked ? 'rgba(224,85,119,0.12)' : T20) : 'transparent',
    color: liked ? '#e05577' : (!disabled && hoveredBtn === key ? T : 'rgba(255,255,255,0.4)'),
    fontSize: 13,
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '0.04em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.2 : 1,
    transition: 'color 0.15s, background 0.15s',
  });

  return (
    <div
      id={String(tweet._id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        gap: 12,
        padding: '12px 14px',
        borderBottom: `1px solid ${hexAlpha(T, 0.15)}`,
        background: hovered ? T08 : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      <Avatar
        src={tweet.author.avatar}
        style={{
          width: 42, height: 42, flexShrink: 0,
          background: T, fontSize: 16,
          fontFamily: "'Oswald', sans-serif",
        }}
      >
        {tweet.author.name?.charAt(0)?.toUpperCase()}
      </Avatar>

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, minWidth: 0, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 15, color: '#ffffff', letterSpacing: '0.04em', lineHeight: 1 }}>
              {tweet.author.name}
            </span>
            {tweet.verified && (
              <span style={{ fontSize: 12, color: tweet.verified === 'business' ? '#eac93e' : tweet.verified === 'government' ? '#829aab' : '#00aced' }}>
                <FontAwesomeIcon icon={['fas', 'circle-check']} />
              </span>
            )}
            <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1 }}>
              @{tweet.author.name?.toLowerCase()}
            </span>
          </div>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 12, color: 'rgba(255,255,255,0.35)', flexShrink: 0, whiteSpace: 'nowrap', lineHeight: 1 }}>
            {formatDate(tweet.time)}
          </span>
        </div>

        {/* Content */}
        <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 15, color: 'rgba(255,255,255,0.88)', lineHeight: 1.55, wordBreak: 'break-word' }}>
          {renderContent(tweet.content)}
        </div>

        {/* Image */}
        {tweet.image?.using && (
          <LightboxImage src={tweet.image.link} style={{ width: '100%', borderRadius: 8, border: `1px solid ${T20}`, marginTop: 6 }} />
        )}

        {/* Actions */}
        <div style={{ display: 'flex', marginLeft: -8, marginTop: 2, gap: 2 }}>
          <button
            style={actionBtnStyle('reply', !hasAlias)}
            disabled={!hasAlias}
            onMouseEnter={() => setHoveredBtn('reply')}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={() => onReply(tweet.author.name)}
          >
            <FontAwesomeIcon icon={['fas', 'reply']} style={{ fontSize: 13 }} />
          </button>
          <button
            style={actionBtnStyle('retweet', !hasAlias || tweet.retweet || tweet.cid === player.ID)}
            disabled={!hasAlias || tweet.retweet || tweet.cid === player.ID}
            onMouseEnter={() => setHoveredBtn('retweet')}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={() => onRetweet(tweet)}
          >
            <FontAwesomeIcon icon={['fas', 'retweet']} style={{ fontSize: 13 }} />
            {rtcount > 0 && <span>{rtcount}</span>}
          </button>
          <button
            style={actionBtnStyle('like', !hasAlias || favd, isLiked)}
            disabled={!hasAlias || favd}
            onMouseEnter={() => setHoveredBtn('like')}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={onFavorite}
          >
            <FontAwesomeIcon icon={['fas', 'heart']} style={{ fontSize: 13 }} />
            {tweet.likes.length > 0 && <span>{tweet.likes.length}</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
