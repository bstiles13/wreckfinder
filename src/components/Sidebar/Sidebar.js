import React, { useState } from 'react';
import {
  Icon,
  Menu as SemanticMenu,
  Sidebar as SemanticSidebar
} from 'semantic-ui-react';
import Search from './Search/Search';
import Menu from './Menu/Menu';

import './Sidebar.scss';

export const Sidebar = ({ children }) => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      {
        !visible && (
          <Icon className='map-sidebar-toggle map-sidebar-toggle-show' name='bars' size='big' onClick={() => setVisible(true)} title='Show Menu' />
        )
      }
      <SemanticSidebar.Pushable>
        <SemanticSidebar
          className='map-sidebar'
          as={SemanticMenu}
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
            <div className='search-container'>
              <Search />
            </div>
            <div className='menu-container'>
              <Menu />
            </div>
          </div>
        </SemanticSidebar>

        <SemanticSidebar.Pusher className='map-container'>
          {children}
        </SemanticSidebar.Pusher>
      </SemanticSidebar.Pushable>
    </>
  );
};
