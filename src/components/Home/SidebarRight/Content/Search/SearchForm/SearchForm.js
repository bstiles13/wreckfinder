import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'semantic-ui-react';
import { get, shuffle, filter, isEmpty } from 'lodash';
import axios from 'axios';
import { setMapFilterType, setFilteredWrecks, resetSelectedWreck } from '../../../../../../store/actions';
import { BasicSearch } from './BasicSearch/BasicSearch';
import { AdvancedSearch } from './AdvancedSearch/AdvancedSearch';
import { ProximitySearch } from './ProximitySearch/ProximitySearch';
import { SearchDropdown } from './SearchDropdown/SearchDropdown';

import './SearchForm.scss';

const INITIAL_STATE = {
  searchType: 'basic',
  name: '',
  description: '',
  after: null,
  before: null,
  hasName: true,
  isVisible: false,
  latitude: null,
  longitude: null,
  radius: null
};

export const SearchForm = ({ wrecks, setMapFilterType, setFilteredWrecks, resetSelectedWreck, clickEvent, viewport }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  useEffect(() => {
    if (get(clickEvent, 'type') === 'double') {
      setState({
        ...state,
        searchType: 'proximity',
        latitude: clickEvent.latlng.lat,
        longitude: clickEvent.latlng.lng
      });
    }
  }, [get(clickEvent, 'type')]);

  const toggleSearchType = (e, { value }) => setState({ ...INITIAL_STATE, searchType: value });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.id]: e.target.id === 'hasName' || e.target.id === 'isVisible'
        ? !state[e.target.id]
        : e.target.value
    });
  };

  const clearWrecks = ({ setFilteredWrecks, setMapFilterType, resetSelectedWreck }) => {
    setState({ ...INITIAL_STATE });
    setMapFilterType('search');
    resetSelectedWreck();
    setFilteredWrecks([]);
  };

  const randomizeWrecks = ({ wrecks, setFilteredWrecks, setMapFilterType, resetSelectedWreck }) => {
    let randomWrecks = shuffle(wrecks);
    randomWrecks = randomWrecks.slice(0, 100);
    setMapFilterType('search');
    resetSelectedWreck();
    setFilteredWrecks(randomWrecks);
  };

  const handleBasicSearch = ({ description }) => submitTextSearch({ description });

  const handleAdvancedSearch = ({ name, description, after, before, hasName, isVisible }) => submitTextSearch({
    name,
    description,
    after,
    before,
    hasName,
    isVisible
  });

  const submitTextSearch = async (params) => {
    try {
      const res = await axios.get('/api/wrecks/search', { params });
      setMapFilterType('search');
      resetSelectedWreck();
      setFilteredWrecks(res.data);
    } catch (err) {
      return err;
    }
  };

  const submitProximitySearch = async ({ radius, latitude, longitude }) => {
    try {
      const res = await axios.get('/api/wrecks/radius', { params: { radius, lat: latitude, lng: longitude } });
      const wrecks = filter(res.data, wreck => wreck.properties.source !== 'enc');
      setMapFilterType('search');
      resetSelectedWreck();
      setFilteredWrecks(wrecks);
    } catch (err) {
      return err;
    }
  };

  const searchWrecks = ({ wrecks, setFilteredWrecks, setMapFilterType, resetSelectedWreck }) => {
    if (state.searchType === 'basic') handleBasicSearch({ ...state, wrecks, setFilteredWrecks, setMapFilterType, resetSelectedWreck });
    if (state.searchType === 'advanced') handleAdvancedSearch({ ...state, wrecks, setFilteredWrecks, setMapFilterType, resetSelectedWreck });
    if (state.searchType === 'proximity') submitProximitySearch({ ...state, wrecks, setFilteredWrecks, setMapFilterType, resetSelectedWreck });
  };

  const validateForm = ({ searchType, name, description, after, before, radius, latitude, longitude, hasName, isVisible }) => {
    if (searchType === 'basic') {
      return !isEmpty(description);
    }

    if (searchType === 'advanced') {
      return (
        !(isEmpty(name) && isEmpty(description) && isEmpty(after) && isEmpty(before) && !hasName && !isVisible) &&
        (isEmpty(after) || !isNaN(parseInt(after))) &&
        (isEmpty(before) || !isNaN(parseInt(before)))
      );
    }

    if (searchType === 'proximity') {
      return (
        !isNaN(parseInt(radius)) &&
        !isNaN(parseInt(latitude)) &&
        !isNaN(parseInt(longitude))
      );
    }
  };

  console.log('STATE', state);

  return (
    <div className='search-form'>
      <Form>
        {state.searchType === 'basic' && (
          <BasicSearch {...state} handleChange={handleChange}>
            <SearchDropdown onChange={toggleSearchType} value={state.searchType} />
          </BasicSearch>
        )}
        {state.searchType === 'advanced' && (
          <AdvancedSearch {...state} handleChange={handleChange}>
            <SearchDropdown onChange={toggleSearchType} value={state.searchType} />
          </AdvancedSearch>
        )}
        {state.searchType === 'proximity' && (
          <ProximitySearch {...state} handleChange={handleChange} viewport={viewport}>
            <SearchDropdown onChange={toggleSearchType} value={state.searchType} />
          </ProximitySearch>
        )}
        <Form.Group as={Button.Group} className='search-form-buttons'>
          <Form.Button
            type='button'
            className='search-form-button search-form-clear-button'
            onClick={() => clearWrecks({ setMapFilterType, setFilteredWrecks, resetSelectedWreck })}
            inverted>
            Clear
          </Form.Button>
          <Form.Button
            type='button'
            className='search-form-button search-form-random-button'
            onClick={() => randomizeWrecks({ wrecks, setMapFilterType, setFilteredWrecks, resetSelectedWreck })}>
            Random
          </Form.Button>
          <Button.Or />
          <Form.Button
            disabled={!validateForm({ ...state })}
            className='search-form-button search-form-submit-button button-primary'
            onClick={() => searchWrecks({ ...state, wrecks, setMapFilterType, setFilteredWrecks, resetSelectedWreck })}
          >
            Search
          </Form.Button>
        </Form.Group>
      </Form>
    </div>
  );
};

const mapStateToProps = state => ({
  wrecks: state.wrecks.wrecks,
  viewport: state.map.viewport,
  clickEvent: state.map.clickEvent
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setMapFilterType,
  setFilteredWrecks,
  resetSelectedWreck
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
