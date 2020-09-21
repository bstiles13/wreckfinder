import React from 'react';
import { Form, Message } from 'semantic-ui-react';

// import './Search.scss';

export const BasicSearch = ({ children, description, handleChange }) => {
  return (
    <>
      <div className='search-header'>
        <label>Keyword(s)</label>
        {children}
      </div>
      <Form.Input
        id='description'
        fluid
        placeholder='"Titanic", "storm", "sunk by submarine", etc'
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
