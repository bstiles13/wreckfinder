import React from 'react';
import { Segment, Button, Icon } from 'semantic-ui-react';

import './Default.scss';

export const Default = ({ isActive, handleItemClick }) => {
  if (!isActive) return false;

  return (
    <Segment className='default' attached='bottom'>
      <Button as='a' href='http://localhost:3001/auth/login/' color='facebook'>
        <Icon name='facebook' /> Sign In
      </Button>
      <a className='default-guest-link' onClick={() => handleItemClick(null, { name: 'results' })}>or continue as a guest</a>
    </Segment>
  );
};
