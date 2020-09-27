import React from 'react';
import { Form, Message, Input } from 'semantic-ui-react';
import { get, isEmpty } from 'lodash';
import { INITIAL_STATE } from '../../../../../../../store/reducers/mapReducer';
import { delayAutoFocus } from '../../../../../../../utils';

export const ProximitySearch = ({ children, latitude, longitude, radius, handleChange, viewport }) => {
  return (
    <>
      <div className='search-form-header'>
        <label>Radius</label>
        {children}
      </div>
      <Form.Field error={!isEmpty(radius) && isNaN(parseInt(radius))}>
        <Input
          id='radius'
          fluid
          onChange={handleChange}
          value={radius}
          ref={delayAutoFocus}
        />
      </Form.Field>
      <Form.Group widths='equal'>
        <Form.Input
          id='latitude'
          fluid
          label='Latitude'
          placeholder={get(viewport, 'center.0', INITIAL_STATE.view[0])}
          onChange={handleChange}
          value={latitude}
          error={!isEmpty(latitude) && isNaN(parseInt(latitude))}
        />
        <Form.Input
          id='longitude'
          fluid
          label='Longitude'
          placeholder={get(viewport, 'center.1', INITIAL_STATE.view[1])}
          onChange={handleChange}
          value={longitude}
          error={!isEmpty(longitude) && isNaN(parseInt(longitude))}
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
