import React, { useEffect } from 'react';
import { Message, Step } from 'semantic-ui-react';
import { get, isEmpty } from 'lodash';
import { renderWreckList } from '../Content.helper';
import { Placeholder } from '../../../../Shared/Placeholder/Placeholder';

import './Favorites.scss';

export const Favorites = props => {
  const {
    isActive,
    wrecks,
    selectedWreck,
    isFetching
  } = props;

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
        isEmpty(wrecks) || isFetching
          ? (
            <Placeholder rowCount={10} isFetching={isFetching}>
              <Message>
                <Message.Header>No favorites</Message.Header>
                <p>{`Need help getting started? Click "Random" in the Search menu to fast track new discoveries!`}</p>
              </Message>
            </Placeholder>
          )
          : renderWreckList({ ...props })
      }
      <Step.Group size='mini' style={{ marginTop: '0.5rem' }}>
        <Step disabled><Step.Content><Step.Title>MENU</Step.Title></Step.Content></Step>
        <Step><Step.Content><Step.Title>FAVORITES</Step.Title></Step.Content></Step>
      </Step.Group>
    </div>
  );
};
