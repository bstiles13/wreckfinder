import React from 'react';
import { Segment, Image, Icon } from 'semantic-ui-react';
import { get, map, isEmpty } from 'lodash';

import './Results.scss';

export const Results = ({ isActive, filteredWrecks, selectedWreck, setSelectedWreck }) => {
  if (!isActive) return false;

  const renderPopupImage = (type) => {
    const types = {
      wreck: require('../../../../assets/wreck_icon.png'),
      obstruction: require('../../../../assets/rocks_icon.png')
    };

    return types[type];
  };

  const renderResults = ({ filteredWrecks, selectedWreck, setSelectedWreck }) => {
    return map(filteredWrecks, (wreck, i) => {
      const isSelected = wreck.id === get(selectedWreck, 'id');
      return (
        <div
          key={`result-${i}`}
          className={`result-row selectable ${isSelected ? 'selected' : ''}`}
          onClick={() => setSelectedWreck(wreck)}
        >
          <div className='result-content-left'>
            <Image size='tiny' src={renderPopupImage(wreck.properties.featureTypeShort)} />
          </div>
          <div className='result-content-right'>
            {isSelected && <Icon className='result-selected-icon' name='eye' color='grey' />}
            <div className={`result-header ${isSelected ? 'selected' : ''}`}>{wreck.properties.name || 'Unknown'}</div>
            <div className='result-meta'>
              {wreck.properties.featureTypeShort}
              {wreck.properties.yearSunk && `: sunk ${wreck.properties.yearSunk}`}
            </div>
            <div className='result-description'>
              {wreck.properties.history || 'No description'}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <Segment className='results' attached='bottom'>
      {
        isEmpty(filteredWrecks)
          ? <div className='result-row'>No results</div>
          : renderResults({ filteredWrecks, selectedWreck, setSelectedWreck })
      }
    </Segment>
  );
};
