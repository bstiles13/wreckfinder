import React, { useEffect } from 'react';
import { Segment, Image, Icon } from 'semantic-ui-react';
import { get, map, isEmpty } from 'lodash';

import './Results.scss';

export const Results = ({ isActive, filteredWrecks, selectedWreck, setSelectedWreck }) => {
  useEffect(() => {
    if (!selectedWreck) {
      const element = get(document.getElementsByClassName('results'), '0');
      if (element) element.scrollTop = 0;
    }

    if (selectedWreck && selectedWreck.id) {
      const element = document.getElementById(`result-${selectedWreck.id}`);
      element && element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedWreck]);

  const renderPopupImage = (type) => {
    const types = {
      wreck: require('../../../../assets/wreck_icon.png'),
      obstruction: require('../../../../assets/rocks_icon.png')
    };

    return types[type];
  };

  const renderResults = ({ filteredWrecks, selectedWreck, setSelectedWreck }) => {
    return map(filteredWrecks, wreck => {
      const isSelected = wreck.id === get(selectedWreck, 'id');
      return (
        <div
          key={`result-${wreck.id}`}
          id={`result-${wreck.id}`}
          className={`result-row selectable ${isSelected ? 'selected' : ''}`}
          onClick={() => setSelectedWreck({ ...wreck, focus: true })}
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

  if (!isActive) return false;

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
