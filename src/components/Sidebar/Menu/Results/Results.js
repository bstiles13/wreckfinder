import React from 'react';
import { Segment, Image } from 'semantic-ui-react';
import { map, isEmpty } from 'lodash';

import './Results.scss';

export const Results = ({ isActive, filteredWrecks, setSelectedWreck }) => {
  if (!isActive) return false;

  const renderPopupImage = (type) => {
    const types = {
      wreck: require('../../../../assets/wreck_icon.png'),
      obstruction: require('../../../../assets/rocks_icon.png')
    };

    return types[type];
  };

  const renderResults = ({ filteredWrecks, setSelectedWreck }) => {
    return map(filteredWrecks, (wreck, i) => (
      <div key={`result-${i}`} className='result selectable' onClick={() => setSelectedWreck(wreck)}>
        <div className='result-content-left'>
          <Image size='tiny' src={renderPopupImage(wreck.properties.featureTypeShort)} />
        </div>
        <div className='result-content-right'>
          <div className='result-header'>{wreck.properties.name || 'Unknown'}</div>
          <div className='result-meta'>
            {wreck.properties.featureTypeShort}
            {wreck.properties.yearSunk && `: sunk ${wreck.properties.yearSunk}`}
          </div>
          <div className='result-description'>
            {wreck.properties.history || 'No description'}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <Segment className='results' attached='bottom'>
      {
        isEmpty(filteredWrecks)
          ? <div className='result-row'>No results</div>
          : renderResults({ filteredWrecks, setSelectedWreck })
      }
    </Segment>
  );
};
