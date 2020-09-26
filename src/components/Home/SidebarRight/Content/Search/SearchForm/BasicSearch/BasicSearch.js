import React from 'react';
import { Form, Message, Input } from 'semantic-ui-react';
import { delayAutoFocus } from '../../../../../../../utils';

// import './Search.scss';

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
          ref={delayAutoFocus}
        />
      </Form.Field>
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
