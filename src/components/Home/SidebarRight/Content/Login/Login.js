import React from 'react';
import { Segment } from 'semantic-ui-react';

import './Login.scss';

export const Login = ({ isActive }) => {
  if (!isActive) return false;

  return (
    <Segment attached='bottom'>Login</Segment>
  );
};
