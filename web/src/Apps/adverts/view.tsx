import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAlert, useAppColor, hexAlpha } from '../../hooks';
import { Categories } from './data';
import Nui from '../../util/Nui';
import { RootState } from '../../store';

export default function AdvertView() {
  const navigate = useNavigate();
  const showAlert = useAlert();
  const T = useAppColor('adverts');
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const T15 = hexAlpha(T, 0.15);

  const { id } = useParams<{ id: string }>();
  const myId = useSelector((state: RootState) => state.data.data.player?.Source);
  const adverts = useSelector((state: RootState) => state.data.data.adverts) ?? {};
  const advert = adverts[id as string];
  const callData = useSelector((state: RootState) => (state as any).call?.call);

  useEffect(() => {
    if (adverts && !advert) navigate('/apps/adverts', { replace: true });
  }, [adverts, advert]);

  const cats = advert ? Categories.filter(cat => advert.categories?.includes(cat.label)) : [];
  const isOwn = String(advert?.id) === String(myId);

  const callAdvert = async () => {
    if (!advert || isOwn || callData) return;
    try {
      const res = await (await Nui.send('CreateCall', { number: advert.number, isAnon: false })).json();
      if (res) navigate(`/apps/phone/call/${advert.number}`);
      else showAlert('Unable To Start Call');
    } catch { showAlert('Unable To Start Call'); }
  };

  const textAdvert = () => {
    if (!advert || isOwn) return;
    navigate(`/apps/messages/convo/${advert.number}`);
  };

  if (!advert) return null;

  const iconBtn = (disabled = false): React.CSSProperties => ({
    width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 6, cursor: disabled ? 'default' : 'pointer', fontSize: 14,
    border: `1px solid ${T15}`, color: T, background: 'transparent',
    opacity: disabled ? 0.25 : 1, pointerEvents: disabled ? 'none' : 'auto',
    transition: 'background 0.2s, border-color 0.2s',
  });

  return (
    <div style={{ height: '100%', background: 'rgba(10,13,18,0.98)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px 0 4px', height: 56, background: `linear-gradient(135deg, ${T20} 0%, rgba(10,13,18,0) 100%)`, borderBottom: `1px solid ${T20}` }}>
        <div
          onClick={() => navigate(-1)}
          style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, cursor: 'pointer', color: 'rgba(255,255,255,0.4)', flexShrink: 0, transition: 'color 0.15s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#fff')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)')}>
          <FontAwesomeIcon icon={['fas', 'arrow-left']} style={{ fontSize: 15 }} />
        </div>
        <span style={{ flex: 1, fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 15, color: '#fff', letterSpacing: '0.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {advert.title}
        </span>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0, paddingRight: 4 }}>
          {isOwn && (
            <div
              style={iconBtn()}
              onClick={() => navigate('/apps/adverts/edit')}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T15; }}>
              <FontAwesomeIcon icon={['fas', 'pen-to-square']} />
            </div>
          )}
          {!isOwn && (
            <>
              <div
                style={iconBtn(!!callData)}
                onClick={callAdvert}
                onMouseEnter={e => { if (!callData) { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; } }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T15; }}>
                <FontAwesomeIcon icon={['fas', 'phone']} />
              </div>
              <div
                style={iconBtn()}
                onClick={textAdvert}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T20; (e.currentTarget as HTMLElement).style.borderColor = T50; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = T15; }}>
                <FontAwesomeIcon icon={['fas', 'comment-sms']} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Author */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 13, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.03em' }}>{advert.author}</span>
        <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{new Date(+advert.time).toLocaleDateString()}</span>
      </div>

      {/* Price */}
      <div style={{ flexShrink: 0, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 300, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 3 }}>Asking Price</div>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 22, color: T, letterSpacing: '0.02em' }}>
          {advert.price ? `$${Number(advert.price).toLocaleString()}` : 'Negotiable'}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: 16, color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.7, fontFamily: 'sans-serif', scrollbarWidth: 'thin', scrollbarColor: `${hexAlpha(T, 0.3)} transparent` }}>
        {advert.full ? advert.full : advert.short}
      </div>

      {/* Tags */}
      {cats.length > 0 && (
        <div style={{ flexShrink: 0, display: 'flex', flexWrap: 'wrap', gap: 6, padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {cats.map((cat, i) => (
            <span
              key={i}
              onClick={() => navigate(`/apps/adverts/category-view/${cat.label}`)}
              style={{ fontSize: 10, fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 4, border: `1px solid ${cat.color}66`, background: cat.color + '22', color: cat.color, cursor: 'pointer', transition: 'filter 0.15s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.filter = 'brightness(1.2)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.filter = 'none')}>
              {cat.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
