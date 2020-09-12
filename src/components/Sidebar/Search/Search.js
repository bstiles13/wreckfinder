import React, { useState } from 'react';
import { Form, Label, Icon } from 'semantic-ui-react';

import './Search.scss';

export const Search = () => {
  const [state, setState] = useState({});

  const handleChange = e => {
    setState({
      ...state,
      [e.target.id]: e.target.id === 'hasName' ? !state.hasName : e.target.value
    });
  };

  console.log('state', state);

  return (
    <Form className='search'>
      <Form.Input
        id='description'
        fluid
        label={
          <div className='description-label-row'>
            <label>{state.advancedMode ? 'Keyword(s)' : 'Quick Search'}</label>
            <Label
              className={`advanced-toggle ${state.advancedMode ? 'active' : ''}`}
              onClick={() => setState({ ...state, advancedMode: !state.advancedMode })}>
              Advanced
              <Icon name={state.advancedMode ? 'angle down' : 'angle left'} />
            </Label>
          </div>
        }
        placeholder='Sunk by submarine'
        icon='search'
        iconPosition='left'
        onChange={handleChange}
      />
      {
        state.advancedMode && (<>
          <Form.Input
            id='name'
            fluid
            label='Vessel name'
            placeholder='Star of Hollywood'
            icon='ship'
            iconPosition='left'
            onChange={handleChange}
          />
          <Form.Group widths='equal'>
            <Form.Input id='after' fluid label='After' placeholder='1910' icon='arrow up' iconPosition='left' onChange={handleChange} />
            <Form.Input id='before' fluid label='Before' placeholder='1990' icon='arrow down' iconPosition='left' onChange={handleChange} />
          </Form.Group>
          <Form.Checkbox
            id='hasName'
            label='Has a name'
            checked={!!state.hasName}
            onChange={handleChange}
          />
        </>)
      }
      <Form.Group className='search-buttons'>
        <Form.Button className='search-clear-button'>Clear</Form.Button>
        <Form.Button className='search-submit-button'>Search</Form.Button>
      </Form.Group>
    </Form>
  );
};
