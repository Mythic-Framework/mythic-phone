import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../../hooks';
import Document from './Document';

interface Props { documents: any[]; showShared?: boolean; }

const DocumentList: React.FC<Props> = ({ documents, showShared }) => {
  const T = useAppColor('documents');
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);

  const player = useSelector((state: any) => state.data.data.player);

  const filteredDocuments = documents.filter((d: any) => {
    if (showShared) {
      if (d.shared) return true;
      if (d.owner != player.ID) return true;
      return d.sharedWith?.some((p: any) => p.ID == player.ID);
    } else {
      return !d.shared && d.owner == player.ID;
    }
  });

  if (filteredDocuments.length === 0) return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, color: 'rgba(255,255,255,0.25)', fontSize: 13, fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      <FontAwesomeIcon icon={['fas', 'file-circle-xmark']} style={{ fontSize: 32, color: T20 }} />
      {showShared ? 'No Documents Shared With You' : 'No Saved Documents'}
    </div>
  );

  return (
    <div style={{ height: '100%', overflowX: 'hidden', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
      {filteredDocuments.sort((a: any, b: any) => b.time - a.time).map((doc: any) => (
        <Document key={doc._id} document={doc} />
      ))}
    </div>
  );
};

export default DocumentList;
