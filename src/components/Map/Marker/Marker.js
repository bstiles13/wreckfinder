import React from 'react';
import { Marker as LeafletMarker, Popup } from 'react-leaflet';
import { get } from 'lodash';
import { Button, Card, Image, Icon } from 'semantic-ui-react';
import ShowMoreText from 'react-show-more-text';
import { ErrorBoundary } from '../../ErrorBoundary/ErrorBoundary';
import axios from 'axios';

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

const handleSearchArticles = () => {
  return axios.get('/api/wrecks/articles')
    .then(res => console.log(res.data))
    .catch(err => err);
};

export const Marker = ({ wreck, selectedWreck, setSelectedWreck, isFavorite, createFavorite, deleteFavorite, fetchFavorites }) => {
  return (
    <ErrorBoundary>
      <LeafletMarker
        selected={wreck._id === get(selectedWreck, '_id')}
        position={[wreck.geometry.coordinates[1], wreck.geometry.coordinates[0]]}
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
                <ShowMoreText
                  lines={3}
                  more='Show more'
                  less='Show less'
                  anchorClass='test'
                  expanded={false}
                  width={0}
                >
                  {wreck.properties.history}
                </ShowMoreText>
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
              <Button basic color='black' size='tiny' onClick={handleSearchArticles}>Learn More</Button>
            </Card.Content>
          </Card>
        </Popup>
      </LeafletMarker>
    </ErrorBoundary>
  );
};
