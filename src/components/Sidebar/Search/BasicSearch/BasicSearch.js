import React from 'react';
import { Form, Message } from 'semantic-ui-react';

// import './Search.scss';

export const BasicSearch = ({ description, handleChange }) => {
  return (
    <>
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
      <Message
        info
        size='tiny'
        icon='pointing right'
        header='Quick Search'
        content={`Find wrecks in United States and territorial waters with names and descriptions matching your text`}
      />
    </>
  );
};
