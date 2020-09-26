import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { get } from 'lodash';
import { INITIAL_STATE } from '../../../../../../store/reducers/mapReducer';

// import './Search.scss';

export const ProximitySearch = ({ children, latitude, longitude, radius, handleChange, viewport }) => {
  return (
    <>
      <div className='search-header'>
        <label>Radius</label>
        {children}
      </div>
      <Form.Input
        id='radius'
        fluid
        onChange={handleChange}
        value={radius}
        autoFocus
      />
      <Form.Group widths='equal'>
        <Form.Input
          id='latitude'
          fluid
          label='Latitude'
          placeholder={get(viewport, 'center.0', INITIAL_STATE.view[0])}
          onChange={handleChange}
          value={latitude}
        />
        <Form.Input
          id='longitude'
          fluid
          label='Longitude'
          placeholder={get(viewport, 'center.1', INITIAL_STATE.view[1])}
          onChange={handleChange}
          value={longitude}
        />
      </Form.Group>
      <Message
        info
        size='tiny'
        icon='pointing right'
        header='Tip'
        content={`Double clicking on the map will auto-fill your latitude and longitude at the cursor's location`}
      />
    </>
  );
};
