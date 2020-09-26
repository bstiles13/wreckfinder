import React, { useEffect } from 'react';
import { Segment, Message } from 'semantic-ui-react';
import { get, isEmpty } from 'lodash';
import { renderWreckList } from '../Content.helper';
import SearchForm from './SearchForm/SearchForm';

import './Search.scss';

export const Search = ({ isActive, wrecks, selectedWreck, setSelectedWreck }) => {
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
    <>
      <div className='search-container'>
        <SearchForm />
      </div>
      <Segment className='results' attached='bottom'>
        {
          isEmpty(wrecks)
            ? (
              <div className='results-placeholder'>
                <Message>
                  <Message.Header>No results</Message.Header>
                  <p>Refine your results by modifying the search above</p>
                </Message>
              </div>
            )
            : renderWreckList({ wrecks, selectedWreck, setSelectedWreck })
        }
      </Segment>
    </>
  );
};
