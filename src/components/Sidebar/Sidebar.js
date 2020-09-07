import React, { useState } from 'react';
import {
  Icon,
  Menu,
  Sidebar as SemanticSidebar
} from 'semantic-ui-react';

import './Sidebar.scss';

export const Sidebar = ({ children }) => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      {
        !visible && (
          <Icon className='map-sidebar-toggle map-sidebar-toggle-show' name='bars' size='big' onClick={() => setVisible(true)} />
        )
      }
      <SemanticSidebar.Pushable>
        <SemanticSidebar
          className='map-sidebar'
          as={Menu}
          animation='overlay'
          icon='labeled'
          vertical
          visible={visible}
          width='thin'
        >
          <div className='map-sidebar-content'>
            <div className='map-sidebar-content-header'>
              <div className='app-title'>Wreck Finder</div>
              <Icon className='map-sidebar-toggle' name='angle double left' size='large' onClick={() => setVisible(false)} />
            </div>
            <Menu.Item as='a'><Icon name='home' />Home</Menu.Item>
            <Menu.Item as='a'><Icon name='gamepad' />Games</Menu.Item>
            <Menu.Item as='a'><Icon name='camera' />Channels</Menu.Item>
          </div>
        </SemanticSidebar>

        <SemanticSidebar.Pusher className='map-container'>
          {children}
        </SemanticSidebar.Pusher>
      </SemanticSidebar.Pushable>
    </>
  );
};
