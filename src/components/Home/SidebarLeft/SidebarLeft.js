import React from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import {
  Icon,
  Sidebar,
  Menu
} from 'semantic-ui-react';

// import './SidebarLeft.scss';

export const SidebarLeft = ({ session, activeTab, setActiveTab, resetMap, setMapFilterType }) => {
  const handleItemClick = (e, { name: nextTab }) => {
    if (nextTab === activeTab) return setActiveTab(null);

    if (nextTab === 'search') {
      resetMap();
      setMapFilterType(nextTab);
    }

    if (nextTab === 'favorites') {
      resetMap();
      setMapFilterType(nextTab);
    }

    setActiveTab(nextTab);
  };

  return (
    <Sidebar
      className='map-sidebar-left'
      as={Menu}
      direction='left'
      icon='labeled'
      visible={true}
      width='extra thin'
      vertical
    >
      <Menu.Item
        name='search'
        active={activeTab === 'search'}
        onClick={handleItemClick}
        as='a'
      >
        <Icon name='search' />Search
      </Menu.Item>
      <Menu.Item
        name='articles'
        active={activeTab === 'articles'}
        onClick={handleItemClick}
        as='a'
      >
        <Icon name='newspaper outline' />Articles
      </Menu.Item>
      <Menu.Item
        name='favorites'
        active={activeTab === 'favorites'}
        onClick={handleItemClick}
        as='a'
      >
        <Icon name='favorite' />Favorites
      </Menu.Item>
      <Menu.Item
        name='trivia'
        active={activeTab === 'trivia'}
        onClick={handleItemClick}
        as='a'
      >
        <Icon name='question' />Trivia
      </Menu.Item>
      <Menu.Item name='settings' onClick={handleItemClick} as='a'>
        <Icon name='ellipsis horizontal' />Settings
        {activeTab === 'settings' && (
          <Menu.Menu onClick={e => e.stopPropagation()}>
            {
              get(session, 'id')
                ? (<>
                  {/* <Segment vertical>{`Hi, ${get(session, 'displayName')}!`}</Segment> */}
                  <Menu.Item className='settings-option' vertical as='a' href='http://localhost:3001/auth/logout/'>Sign Out</Menu.Item>
                </>)
                : <Menu.Item className='settings-option' vertical as='a' href='http://localhost:3001/auth/login/'>Sign In</Menu.Item>
            }
            <Menu.Item className='settings-option' vertical as={Link} to='/privacy'>Privacy</Menu.Item>
          </Menu.Menu>
        )}

      </Menu.Item>
    </Sidebar>
  );
};
