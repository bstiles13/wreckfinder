import React from 'react';
import { Form } from 'semantic-ui-react';

// import './Search.scss';

export const AdvancedSearch = ({ name, description, after, before, isVisible, hasName, handleChange }) => {
  return (
    <>
      <Form.Input
        id='description'
        fluid
        placeholder='Sunk by submarine'
        icon='search'
        iconPosition='left'
        onChange={handleChange}
        value={description}
      />
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
        <Form.Input id='after' fluid label='After' placeholder='1910' icon='arrow up' iconPosition='left' onChange={handleChange} value={after} />
        <Form.Input id='before' fluid label='Before' placeholder='1990' icon='arrow down' iconPosition='left' onChange={handleChange} value={before} />
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
