import React from 'react';
import { Marker as LeafletMarker, Popup } from 'react-leaflet';
import { get } from 'lodash';
import { Button, Card, Image, Icon } from 'semantic-ui-react';
import ShowMoreText from 'react-show-more-text';
import { ErrorBoundary } from '../../../ErrorBoundary/ErrorBoundary';

import './Marker.scss';

const renderPopupImage = (type) => {
  const types = {
    wreck: require('../../../../assets/wreck_icon.png'),
    obstruction: require('../../../../assets/rocks_icon.png')
  };

  return types[type];
};

const handleCreateFavorite = async ({ wreck, createFavorite, fetchFavorites }) => {
  await createFavorite(wreck);
  fetchFavorites();
};

const handleDeleteFavorite = async ({ wreck, deleteFavorite, fetchFavorites }) => {
  await deleteFavorite(wreck);
  fetchFavorites();
};

const openPopup = marker => {
  const isSelected = get(marker, 'props.selected');
  const element = get(marker, 'leafletElement');
  if (element && isSelected) {
    setTimeout(() => element.openPopup());
  }
};

const handleArticlesSearch = ({ query, fetchArticles, setActiveTab }) => {
  setActiveTab('articles');
  fetchArticles(query);
};

export const Marker = props => {
  const {
    wreck,
    selected,
    setSelectedWreck,
    isFavorite,
    createFavorite,
    deleteFavorite,
    fetchFavorites,
    fetchArticles,
    setActiveTab
  } = props;

  return (
    <ErrorBoundary>
      <LeafletMarker
        selected={!!selected}
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
              <Card.Description className='wreck-popup-description'>
                <ShowMoreText
                  lines={4}
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
                      onClick={() => handleDeleteFavorite({ wreck, deleteFavorite, fetchFavorites })}
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
                      onClick={() => handleCreateFavorite({ wreck, createFavorite, fetchFavorites })}
                    >
                      <Icon name='star' />
                    Add Favorite
                    </Button>
                  )
              }
              <Button
                basic
                color='black'
                size='tiny'
                onClick={() => handleArticlesSearch({ query: wreck.properties.name, fetchArticles, setActiveTab })}
              >
                Find Articles
              </Button>
            </Card.Content>
          </Card>
        </Popup>
      </LeafletMarker>
    </ErrorBoundary>
  );
};
