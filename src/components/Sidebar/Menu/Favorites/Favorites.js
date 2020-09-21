import React, { useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import { get, isEmpty } from 'lodash';
import { renderWreckList } from '../Menu.helper';

import './Favorites.scss';

export const Favorites = ({ isActive, wrecks, selectedWreck, setSelectedWreck }) => {
  useEffect(() => {
    if (!selectedWreck) {
      const element = get(document.getElementsByClassName('favorites'), '0');
      if (element) element.scrollTop = 0;
    }

    if (selectedWreck && selectedWreck._id) {
      const element = document.getElementById(`result-${selectedWreck._id}`);
      element && element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedWreck]);

  if (!isActive) return false;

  return (
    <Segment className='favorites' attached='bottom'>
      {
        isEmpty(wrecks)
          ? <div className='result-row'>No Favorites</div>
          : renderWreckList({ wrecks, selectedWreck, setSelectedWreck })
      }
    </Segment>
  );
};
