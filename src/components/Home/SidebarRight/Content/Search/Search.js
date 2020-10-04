import React, { useState, useEffect } from 'react';
import { Message } from 'semantic-ui-react';
import { get, isEmpty } from 'lodash';
import { renderWreckList } from '../Content.helper';
import SearchForm from './SearchForm/SearchForm';
import { Placeholder } from '../../../../Shared/Placeholder/Placeholder';

import './Search.scss';

export const Search = ({ isActive, wrecks, selectedWreck, setSelectedWreck, fetchArticles, createFavorite, deleteFavorite, fetchFavorites, setActiveTab, favorites, favoritesFetching }) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!selectedWreck) {
      const element = get(document.getElementsByClassName('results'), '0');
      if (element) element.scrollTop = 0;
    }

    if (selectedWreck && selectedWreck._id) {
      const element = document.getElementById(`result-${selectedWreck._id}`);
      element && element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedWreck]);

  if (!isActive) return false;

  return (
    <div className='search'>
      <SearchForm setIsFetching={setIsFetching} isFetching={favoritesFetching} />
      <div className='results'>
        {
          isEmpty(wrecks) || isFetching
            ? (
              <Placeholder rowCount={10} isFetching={isFetching}>
                <Message>
                  <Message.Header>No results</Message.Header>
                  <p>Refine your results by modifying the search above</p>
                </Message>
              </Placeholder>
            )
            : renderWreckList({ wrecks, selectedWreck, setSelectedWreck, fetchArticles, createFavorite, deleteFavorite, fetchFavorites, setActiveTab, favorites })
        }
      </div>
    </div>
  );
};
