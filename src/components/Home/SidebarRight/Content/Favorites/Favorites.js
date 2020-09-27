import React, { useEffect } from 'react';
import { Message, Step } from 'semantic-ui-react';
import { get, isEmpty } from 'lodash';
import { renderWreckList } from '../Content.helper';

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
    <div className='favorites'>
      {
        isEmpty(wrecks)
          ? (
            <div className='results-placeholder'>
              <Message>
                <Message.Header>No favorites</Message.Header>
                <p>{`Having trouble getting started? Click "Random" in the Search menu to fast track new discoveries!`}</p>
              </Message>
            </div>
          )
          : renderWreckList({ wrecks, selectedWreck, setSelectedWreck })
      }
      <Step.Group size='mini' style={{ marginTop: '0.5rem' }}>
        <Step disabled><Step.Content><Step.Title>MENU</Step.Title></Step.Content></Step>
        <Step><Step.Content><Step.Title>FAVORITES</Step.Title></Step.Content></Step>
      </Step.Group>
    </div>
  );
};
