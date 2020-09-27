import React, { useEffect } from 'react';
import { Message } from 'semantic-ui-react';
import { get, isEmpty } from 'lodash';
import { renderWreckList } from '../Content.helper';
import SearchForm from './SearchForm/SearchForm';
import { Placeholder } from '../../../../Shared/Placeholder/Placeholder';

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
    <div className='search'>
      <SearchForm />
      <div className='results'>
        {
          isEmpty(wrecks)
            ? (
              <Placeholder rowCount={10}>
                <Message>
                  <Message.Header>No results</Message.Header>
                  <p>Refine your results by modifying the search above</p>
                </Message>
              </Placeholder>
            )
            : renderWreckList({ wrecks, selectedWreck, setSelectedWreck })
        }
      </div>
    </div>
  );
};
