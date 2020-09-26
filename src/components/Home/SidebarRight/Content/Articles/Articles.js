import React from 'react';
import { Segment } from 'semantic-ui-react';

import './Articles.scss';

export const Articles = ({ isActive }) => {
  if (!isActive) return false;

  return (
    <Segment attached='bottom'>Articles</Segment>
  );
};
