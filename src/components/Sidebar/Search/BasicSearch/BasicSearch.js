import React from 'react';
import { Form } from 'semantic-ui-react';

// import './Search.scss';

export const BasicSearch = ({ description, handleChange }) => {
  return (
    <Form.Input
      id='description'
      fluid
      placeholder='Sunk by submarine'
      icon='search'
      iconPosition='left'
      onChange={handleChange}
      value={description}
    />
  );
};
