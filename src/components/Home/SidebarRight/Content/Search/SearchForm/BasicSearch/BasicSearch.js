import React from 'react';
import { Form, Message, Input, Icon } from 'semantic-ui-react';
// import { delayAutoFocus } from '../../../../../../../utils';

export const BasicSearch = ({ children, description, handleChange }) => {
  return (
    <>
      <div className='search-form-header'>
        <label>Keyword(s)</label>
        {children}
      </div>
      <Form.Field>
        <Input
          id='description'
          fluid
          placeholder='Examples: "Titanic", "storm", "sunk by submarine"'
          icon='ship'
          iconPosition='left'
          onChange={handleChange}
          value={description}
        />
      </Form.Field>
      <Message className='basic-search-help-message' info icon size='tiny'>
        <Message.Content>
          <Message.Header>Quick Search</Message.Header>
          <p>Find wrecks in United States and territorial waters with names and descriptions matching your text</p>
        </Message.Content>
        <Icon name='hand point down' />
      </Message>
    </>
  );
};
