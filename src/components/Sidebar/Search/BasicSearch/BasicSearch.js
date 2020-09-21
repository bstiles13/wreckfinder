import React from 'react';
import { Form } from 'semantic-ui-react';

// import './Search.scss';

export const BasicSearch = ({ description, handleChange }) => {
  return (
    <Form.Input
      id='description'
      fluid
      label='Keyword(s)'
      placeholder='Sunk by submarine'
      icon='ship'
      iconPosition='left'
      onChange={handleChange}
      value={description}
      autoFocus
    />
  );
};
