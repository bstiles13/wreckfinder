import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Label, Icon, Button } from 'semantic-ui-react';
import { setFilteredWrecks } from '../../../store/actions';
import { shuffle } from 'lodash';

import './Search.scss';

export const Search = ({ wrecks, setFilteredWrecks }) => {
  const [state, setState] = useState({});

  const handleChange = e => {
    setState({
      ...state,
      [e.target.id]: e.target.id === 'hasName' ? !state.hasName : e.target.value
    });
  };

  const randomizeWrecks = ({ wrecks, setFilteredWrecks }) => {
    let randomWrecks = shuffle(wrecks);
    randomWrecks = randomWrecks.slice(0, 100);
    setFilteredWrecks(randomWrecks);
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
      <Form.Group as={Button.Group} className='search-buttons'>
        <Form.Button
          className='search-form-button search-clear-button'
          inverted>
          Clear
        </Form.Button>
        <Form.Button
          className='search-form-button search-random-button'
          onClick={() => randomizeWrecks({ wrecks, setFilteredWrecks })}>
          Random
        </Form.Button>
        <Button.Or />
        <Form.Button
          className='search-form-button search-submit-button'
          positive>
          Search
        </Form.Button>
      </Form.Group>
    </Form>
  );
};

const mapStateToProps = state => ({
  wrecks: state.wrecks.wrecks
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setFilteredWrecks
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
