import React from 'react';
import { Marker as LeafletMarker, Popup } from 'react-leaflet';
import { get } from 'lodash';
import { Button, Card, Image, Icon } from 'semantic-ui-react';
import { ErrorBoundary } from '../../ErrorBoundary/ErrorBoundary';

import './Marker.scss';

const renderPopupImage = (type) => {
  const types = {
    wreck: require('../../../assets/wreck_icon.png'),
    obstruction: require('../../../assets/rocks_icon.png')
  };

  return types[type];
};

const handleCreateFavorite = async ({ id, createFavorite, fetchFavorites }) => {
  await createFavorite(id);
  fetchFavorites();
};

const handleDeleteFavorite = async ({ id, deleteFavorite, fetchFavorites }) => {
  await deleteFavorite(id);
  fetchFavorites();
};

const openPopup = marker => {
  if (marker && marker.leafletElement && !!marker.props.selected) {
    setTimeout(() => marker.leafletElement.openPopup());
  }
};

export const Marker = ({ wreck, selectedWreck, setSelectedWreck, isFavorite, createFavorite, deleteFavorite, fetchFavorites }) => {
  return (
    <ErrorBoundary>
      <LeafletMarker
        selected={wreck.id === get(selectedWreck, 'id')}
        position={wreck.geometry.coordinates}
        transparent
        ref={openPopup}
        onClick={() => setSelectedWreck(wreck)}
      >
        <Popup className='wreck-popup'>
          <Card>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src={renderPopupImage(wreck.properties.featureTypeShort)}
              />
              <Card.Header><div className='wreck-popup-name'>{wreck.properties.name || 'Unknown'}</div></Card.Header>
              <Card.Meta>
                {wreck.properties.featureTypeShort}
                {wreck.properties.yearSunk && `: sunk ${wreck.properties.yearSunk}`}
              </Card.Meta>
              <Card.Description>
                <div className='wreck-popup-history' title={wreck.properties.history}>{wreck.properties.history}</div>
              </Card.Description>
            </Card.Content>
            <Card.Content extra className='wreck-popup-controls'>
              {
                isFavorite
                  ? (
                    <Button
                      basic
                      color='red'
                      size='tiny'
                      onClick={() => handleDeleteFavorite({ id: wreck._id, deleteFavorite, fetchFavorites })}
                    >
                      <Icon name='minus circle' />
                    Remove Favorite
                    </Button>
                  )
                  : (
                    <Button
                      basic
                      color='green'
                      size='tiny'
                      onClick={() => handleCreateFavorite({ id: wreck._id, createFavorite, fetchFavorites })}
                    >
                      <Icon name='star' />
                    Add Favorite
                    </Button>
                  )
              }
              <Button basic color='black' size='tiny'>Learn More</Button>
            </Card.Content>
          </Card>
        </Popup>
      </LeafletMarker>
    </ErrorBoundary>
  );
};
