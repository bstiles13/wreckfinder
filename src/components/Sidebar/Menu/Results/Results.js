import React, { useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import { get, isEmpty } from 'lodash';
import { renderWreckList } from '../Menu.helper';

import './Results.scss';

export const Results = ({ isActive, wrecks, selectedWreck, setSelectedWreck }) => {
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

  if (!isActive) return false;

  return (
    <Segment className='results' attached='bottom'>
      {
        isEmpty(wrecks)
          ? <div className='result-row'>No results</div>
          : renderWreckList({ wrecks, selectedWreck, setSelectedWreck })
      }
    </Segment>
  );
};
