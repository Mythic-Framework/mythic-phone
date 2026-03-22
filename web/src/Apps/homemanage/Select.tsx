import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppColor, hexAlpha } from '../../hooks';
import Property from './components/Property';

const Select: React.FC = () => {
  const T = useAppColor('homemanage');
  const T20 = hexAlpha(T, 0.2);
  const T50 = hexAlpha(T, 0.5);
  const myProperties = useSelector((state: any) => state.data.data.myProperties);

  return (
    <div style={{ height: '100%', background: 'transparent', display: 'flex', flexDirection: 'column' }}>
      {myProperties.length > 0 ? (
        <div style={{ height: '100%', overflowX: 'hidden', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${T50} transparent` }}>
          {myProperties.map((property: any) => (
            <Property key={`prop-${property.id}`} property={property} />
          ))}
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 'bold', color: 'rgba(255,255,255,0.35)', textAlign: 'center', padding: '0 24px' }}>
          You Don't Have Access To Any Properties
        </div>
      )}
    </div>
  );
};

export default Select;
