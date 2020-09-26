import React from 'react';
import { map, get } from 'lodash';
import { Image, Icon } from 'semantic-ui-react';
import ShowMoreText from 'react-show-more-text';

const renderPopupImage = (type) => {
  const types = {
    wreck: require('../../../assets/wreck_icon.png'),
    obstruction: require('../../../assets/rocks_icon.png')
  };

  return types[type];
};

export const renderWreckList = ({ wrecks, selectedWreck, setSelectedWreck }) => {
  return map(wrecks, wreck => {
    const isSelected = wreck._id === get(selectedWreck, '_id');
    return (
      <div
        key={`result-${wreck._id}`}
        id={`result-${wreck._id}`}
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
            <ShowMoreText
              lines={3}
              more='Show more'
              less='Show less'
              anchorClass='test'
              expanded={false}
              width={0}
            >
              {wreck.properties.history || 'No description'}
            </ShowMoreText>
          </div>
        </div>
      </div>
    );
  });
};
