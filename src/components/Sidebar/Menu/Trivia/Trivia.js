import React from 'react';
import { Segment } from 'semantic-ui-react';

import './Trivia.scss';

export const Trivia = ({ isActive }) => {
  if (!isActive) return false;

  return (
    <Segment attached='bottom'>Trivia</Segment>
  );
};
