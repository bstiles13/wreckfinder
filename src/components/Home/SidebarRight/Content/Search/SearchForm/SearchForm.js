import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'semantic-ui-react';
import { get, shuffle, filter, toLower, reduce, isEmpty } from 'lodash';
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

  const handleBasicSearch = ({ description, wrecks, setFilteredWrecks, setMapFilterType, resetSelectedWreck }) => {
    const results = shuffle(filter(wrecks, wreck => {
      const descriptionMatch = (
        isEmpty(description) ||
        reduce(description.split(' '), (acc, word) => { acc = toLower(get(wreck, 'properties.history', '')).includes(toLower(word)); return acc; }, true) ||
        reduce(description.split(' '), (acc, word) => { acc = toLower(get(wreck, 'properties.name', '')).includes(toLower(word)); return acc; }, true)
      );

      return descriptionMatch;
    }));

    setMapFilterType('search');
    resetSelectedWreck();
    setFilteredWrecks(results.slice(0, 100));
  };

  const handleAdvancedSearch = ({
    name,
    description,
    after,
    before,
    hasName,
    isVisible,
    wrecks,
    setFilteredWrecks,
    setMapFilterType,
    resetSelectedWreck
  }) => {
    const results = shuffle(filter(wrecks, wreck => {
      const nameMatch = isEmpty(name) || toLower(get(wreck, 'properties.name', '')).includes(toLower(name));
      const descriptionMatch = (
        isEmpty(description) ||
        reduce(description.split(' '), (acc, word) => { acc = toLower(get(wreck, 'properties.history', '')).includes(toLower(word)); return acc; }, true) ||
        reduce(description.split(' '), (acc, word) => { acc = toLower(get(wreck, 'properties.name', '')).includes(toLower(word)); return acc; }, true)
      );
      const afterMatch = isEmpty(after) || parseInt(get(wreck, 'properties.yearSunk', 0)) > parseInt(after);
      const beforeMatch = isEmpty(before) || parseInt(get(wreck, 'properties.yearSunk', 0)) < parseInt(before);
      const hasNameMatch = !hasName || (!!wreck.properties.name && toLower(wreck.properties.name) !== 'unknown' && toLower(wreck.properties.name) !== 'obstruction' && toLower(wreck.properties.name) !== 'wreck');
      const isVisibleMatch = !isVisible || (!!wreck.properties.featureType && toLower(wreck.properties.featureType).includes('visible'));

      return nameMatch && descriptionMatch && afterMatch && beforeMatch && hasNameMatch && isVisibleMatch;
    }));

    setMapFilterType('search');
    resetSelectedWreck();
    setFilteredWrecks(results.slice(0, 100));
  };

  const handleProximitySearch = async ({ radius, latitude, longitude }) => {
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
    if (state.searchType === 'proximity') handleProximitySearch({ ...state, wrecks, setFilteredWrecks, setMapFilterType, resetSelectedWreck });
  };

  const validateForm = ({ searchType, name, description, after, before, radius, latitude, longitude }) => {
    if (searchType === 'basic') {
      return !isEmpty(description);
    }

    if (searchType === 'advanced') {
      return (
        !(isEmpty(name) && isEmpty(description) && isEmpty(after) && isEmpty(before)) &&
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
