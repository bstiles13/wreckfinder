import React from 'react';
import { Form, Input } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

export const AdvancedSearch = ({ children, name, description, after, before, isVisible, hasName, handleChange }) => {
  return (
    <>
      <div className='search-form-header'>
        <label>Description</label>
        {children}
      </div>
      <Form.Field>
        <Input
          id='description'
          fluid
          placeholder='Sunk by submarine'
          icon='search'
          iconPosition='left'
          onChange={handleChange}
          value={description}
        />
      </Form.Field>
      <Form.Input
        id='name'
        fluid
        label='Vessel name'
        placeholder='Star of Hollywood'
        icon='ship'
        iconPosition='left'
        onChange={handleChange}
        value={name}
      />
      <Form.Group widths='equal'>
        <Form.Input
          id='after'
          fluid
          label='After'
          placeholder='1910'
          icon='arrow up'
          iconPosition='left'
          onChange={handleChange}
          value={after}
          error={!isEmpty(after) && isNaN(parseInt(after))}
        />
        <Form.Input
          id='before'
          fluid
          label='Before'
          placeholder='1990'
          icon='arrow down'
          iconPosition='left'
          onChange={handleChange}
          value={before}
          error={!isEmpty(before) && isNaN(parseInt(before))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Checkbox
          id='hasName'
          label='Has a name'
          checked={!!hasName}
          onChange={handleChange}
        />
        <Form.Checkbox
          id='isVisible'
          label='Visible'
          checked={!!isVisible}
          onChange={handleChange}
        />
      </Form.Group>
    </>
  );
};
