import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../hooks';
import Furniture from './pages/Furniture';
import Keys from './pages/Keys';
import Upgrades from './pages/Upgrades';

interface Props { property: any; onRefresh: () => void; setLoading: (v: boolean) => void; issuingKey?: boolean; onIssueKeyClose?: () => void; editMode?: boolean; onEditModeToggle?: () => void; addingFurniture?: boolean; onAddFurnitureClose?: () => void; }

const MyHouse: React.FC<Props> = ({ property, onRefresh, setLoading, issuingKey, onIssueKeyClose, editMode, onEditModeToggle, addingFurniture, onAddFurnitureClose }) => {
  const dispatch = useDispatch();
  const T = useAppColor('homemanage');
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const activeTab = useSelector((state: any) => state.home.tab);
  const charId = useSelector((state: any) => state.data.data.player.ID);
  const myKey = property.keys[charId];

  const tabs = ['DigiKeys', 'Upgrades', 'Furniture'];

  return (
    <div style={{ height: '100%', background: '#0a0c10', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ height: '100%' }} role="tabpanel" hidden={activeTab !== 0}>
          {activeTab === 0 && <Keys property={property} onRefresh={onRefresh} myKey={myKey} issuingKey={issuingKey} onIssueKeyClose={onIssueKeyClose} />}
        </div>
        <div style={{ height: '100%' }} role="tabpanel" hidden={activeTab !== 1}>
          {activeTab === 1 && <Upgrades property={property} onRefresh={onRefresh} setLoading={setLoading} myKey={myKey} />}
        </div>
        <div style={{ height: '100%' }} role="tabpanel" hidden={activeTab !== 2}>
          {activeTab === 2 && <Furniture property={property} onRefresh={onRefresh} myKey={myKey} editMode={editMode} onEditModeToggle={onEditModeToggle} addingFurniture={addingFurniture} onAddFurnitureClose={onAddFurnitureClose} />}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ flexShrink: 0, display: 'flex', height: 46, background: 'rgba(8,10,14,0.98)', borderTop: `1px solid ${T20}` }}>
        {tabs.map((label, i) => (
          <div
            key={i}
            onClick={() => dispatch({ type: 'SET_HOME_TAB', payload: { tab: i } })}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 10, fontFamily: "'Oswald', sans-serif",
              letterSpacing: '0.08em', textTransform: 'uppercase', userSelect: 'none',
              color: activeTab === i ? T : 'rgba(255,255,255,0.35)',
              borderTop: activeTab === i ? `2px solid ${T}` : '2px solid transparent',
              background: activeTab === i ? T20 : 'transparent',
              transition: 'all 0.2s',
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHouse;
