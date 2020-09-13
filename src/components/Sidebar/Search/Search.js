import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Label, Icon, Button } from 'semantic-ui-react';
import { setFilteredWrecks } from '../../../store/actions';
import { get, shuffle, filter, toLower, reduce, isEmpty } from 'lodash';

import './Search.scss';

const INITIAL_STATE = {
  advancedMode: false,
  name: '',
  description: '',
  after: null,
  before: null,
  hasName: true,
  isVisible: false
};

export const Search = ({ wrecks, setFilteredWrecks }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.id]: e.target.id === 'hasName' || e.target.id === 'isVisible'
        ? !state[e.target.id]
        : e.target.value
    });
  };

  const randomizeWrecks = ({ wrecks, setFilteredWrecks }) => {
    let randomWrecks = shuffle(wrecks);
    randomWrecks = randomWrecks.slice(0, 100);
    setFilteredWrecks(randomWrecks);
  };

  const searchWrecks = ({ after, before, description, hasName, isVisible, name, wrecks, setFilteredWrecks }) => {
    const results = shuffle(filter(wrecks, wreck => {
      const nameMatch = isEmpty(name) || toLower(get(wreck, 'properties.name', '')).includes(toLower(name));
      const descriptionMatch = (
        isEmpty(description) ||
        reduce(description.split(' '), (acc, word) => { acc = toLower(get(wreck, 'properties.history', '')).includes(toLower(word)); return acc; }, true) ||
        reduce(description.split(' '), (acc, word) => { acc = toLower(get(wreck, 'properties.name', '')).includes(toLower(word)); return acc; }, true)
      );
      const afterMatch = isEmpty(after) || parseInt(get(wreck, 'properties.yearSunk', 0)) > parseInt(after);
      const beforeMatch = isEmpty(before) || parseInt(get(wreck, 'properties.yearSunk', 0)) < parseInt(before);
      const hasNameMatch = !hasName || (!!wreck.properties.name && toLower(wreck.properties.name) !== 'unknown' && toLower(wreck.properties.name) !== 'obstruction');
      const isVisibleMatch = !isVisible || (!!wreck.properties.featureType && toLower(wreck.properties.featureType).includes('visible'));

      return nameMatch && descriptionMatch && afterMatch && beforeMatch && hasNameMatch && isVisibleMatch;
    }));

    setFilteredWrecks(results.slice(0, 100));
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
        value={state.description}
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
            value={state.name}
          />
          <Form.Group widths='equal'>
            <Form.Input id='after' fluid label='After' placeholder='1910' icon='arrow up' iconPosition='left' onChange={handleChange} value={state.after} />
            <Form.Input id='before' fluid label='Before' placeholder='1990' icon='arrow down' iconPosition='left' onChange={handleChange} value={state.before} />
          </Form.Group>
          <Form.Group>
            <Form.Checkbox
              id='hasName'
              label='Has a name'
              checked={!!state.hasName}
              onChange={handleChange}
            />
            <Form.Checkbox
              id='isVisible'
              label='Visible'
              checked={!!state.isVisible}
              onChange={handleChange}
            />
          </Form.Group>
        </>)
      }
      <Form.Group as={Button.Group} className='search-buttons'>
        <Form.Button
          className='search-form-button search-clear-button'
          onClick={() => { setState({ ...INITIAL_STATE }); setFilteredWrecks([]); }}
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
          onClick={() => searchWrecks({ ...state, wrecks, setFilteredWrecks })}
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
