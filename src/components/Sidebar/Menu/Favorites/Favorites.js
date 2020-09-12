import React from 'react';
import { Segment } from 'semantic-ui-react';

import './Favorites.scss';

export const Favorites = ({ isActive }) => {
  if (!isActive) return false;

  return (
    <Segment attached='bottom'>Favorites</Segment>
  );
};
