import React from 'react';
import { map, get, some } from 'lodash';
import { Image, Icon, Button } from 'semantic-ui-react';
import ShowMoreText from 'react-show-more-text';

const renderPopupImage = (type) => {
  const types = {
    wreck: require('../../../../assets/wreck_icon.png'),
    obstruction: require('../../../../assets/rocks_icon.png')
  };

  return types[type];
};

const handleCreateFavorite = async ({ event, id, createFavorite, fetchFavorites }) => {
  event.stopPropagation();
  await createFavorite(id);
  fetchFavorites();
};

const handleDeleteFavorite = async ({ event, id, deleteFavorite, fetchFavorites }) => {
  event.stopPropagation();
  await deleteFavorite(id);
  fetchFavorites();
};

const handleArticlesSearch = ({ event, query, fetchArticles, setActiveTab }) => {
  event.stopPropagation();
  setActiveTab('articles');
  fetchArticles(query);
};

export const renderWreckList = ({ wrecks, selectedWreck, setSelectedWreck, fetchArticles, createFavorite, deleteFavorite, fetchFavorites, setActiveTab, favorites }) => (
  <div className='wreck-list'>
    {
      map(wrecks, wreck => {
        const isSelected = wreck._id === get(selectedWreck, '_id');
        const isFavorite = some(favorites, favorite => favorite._id === wreck._id);
        return (
          <div
            key={`result-${wreck._id}`}
            id={`result-${wreck._id}`}
            className={`result-row selectable ${isSelected ? 'selected' : ''}`}
            onClick={() => setSelectedWreck({ ...wreck, focus: true })}
          >
            <div className='result-content'>
              <div className='result-content-left'>
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
              <div className='result-content-right'>
                <Image size='tiny' src={renderPopupImage(wreck.properties.featureTypeShort)} />
              </div>
            </div>
            <div className='result-footer'>
              <div className='result-footer-buttons'>
                {
                  isFavorite
                    ? (
                      <Button
                        basic
                        color='red'
                        size='tiny'
                        onClick={event => handleDeleteFavorite({ event, id: wreck._id, deleteFavorite, fetchFavorites })}
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
                        onClick={event => handleCreateFavorite({ event, id: wreck._id, createFavorite, fetchFavorites })}
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
                  onClick={event => handleArticlesSearch({ event, query: wreck.properties.name, fetchArticles, setActiveTab })}
                >
                  Find Articles
                </Button>
              </div>
              {isSelected && <Icon className='result-selected-icon' name='eye' color='grey' size='large' />}
            </div>
          </div>
        );
      })
    }
  </div>
);
