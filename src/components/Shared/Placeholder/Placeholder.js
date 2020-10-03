import React from 'react';
import { map } from 'lodash';
import { Item, Image } from 'semantic-ui-react';

import './Placeholder.scss';

export const Placeholder = ({ children, rowCount = 1, isFetching }) => {
  return (
    <div className='custom-placeholder'>
      <Item.Group className='custom-placeholder-rows'>
        {map(new Array(rowCount), (_, i) => (
          <Item key={`custom-placeholder-row-${i}`} className='custom-placeholder-row'>
            <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />

            <Item.Content>
              <Item.Description>
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
              </Item.Description>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
      {
        isFetching
          ? <div className='logo-spinner' />
          : children
      }
    </div>
  );
};
