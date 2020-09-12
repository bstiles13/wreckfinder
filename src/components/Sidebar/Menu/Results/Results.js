import React from 'react';
import { Segment } from 'semantic-ui-react';

import './Results.scss';

export const Results = ({ isActive }) => {
  if (!isActive) return false;

  return (
    <Segment attached='bottom'>Results</Segment>
  );
};
