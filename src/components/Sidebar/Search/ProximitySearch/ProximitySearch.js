import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { get } from 'lodash';
import { INITIAL_STATE } from '../../../../store/reducers/mapReducer';

// import './Search.scss';

export const ProximitySearch = ({ latitude, longitude, radius, handleChange, viewport }) => {
  console.log('viewport', viewport);
  return (
    <>
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
      <Form.Input
        id='radius'
        fluid
        label='Radius'
        onChange={handleChange}
        value={radius}
      />
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
