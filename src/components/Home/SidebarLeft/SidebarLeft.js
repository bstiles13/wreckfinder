import React from 'react';
import { Link } from 'react-router-dom';
import { get, isUndefined } from 'lodash';
import {
  Icon,
  Sidebar,
  Menu,
  Popup
} from 'semantic-ui-react';

import './SidebarLeft.scss';

export const SidebarLeft = ({ session, activeTab, setActiveTab, resetMap, setMapFilterType, layer, setLayer }) => {
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

  const authOrigin = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : document.location.origin;

  return (
    <Sidebar
      className='map-sidebar-left'
      style={{ overflow: 'hidden !important' }}
      as={Menu}
      direction='left'
      icon='labeled'
      visible={true}
      width='thin'
      vertical
    >
      <Menu.Item
        className={isUndefined(activeTab) ? 'menu-item-animated' : ''}
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
      <Popup
        content='Coming Soon'
        position='bottom center'
        trigger={
          <Menu.Item
            disabled
            name='trivia'
            active={activeTab === 'trivia'}
            onClick={handleItemClick}
            as='a'
          >
            <Icon name='question' />Trivia
          </Menu.Item>
        }
      />
      <Menu.Item name='settings' onClick={handleItemClick} as='a'>
        <Icon name='ellipsis horizontal' />Settings
        {activeTab === 'settings' && (
          <Menu.Menu onClick={e => e.stopPropagation()}>
            {
              get(session, 'id')
                ? <Menu.Item
                  className='settings-option'
                  vertical
                  as='a'
                  href={`${authOrigin}/auth/logout/`}>
                  Sign Out
                </Menu.Item>
                : (
                  <Menu.Item
                    className='settings-option'
                    vertical
                    as='a'
                    href={`${authOrigin}/auth/login/`}>
                    <Icon className='login-icon' name='facebook' />
                    Sign In
                  </Menu.Item>
                )
            }
            <Menu.Item className='settings-option' vertical as={Link} to='/privacy'>Privacy</Menu.Item>
          </Menu.Menu>
        )}

      </Menu.Item>
      <div className='layer-toggle-container'>
        <div
          className={`layer-toggle layer-toggle-top layer-toggle-oceans ${layer.type === 'Oceans' ? 'active' : 'inactive'}`}
          onClick={() => setLayer({ type: 'Oceans', labels: 'OceansLabels' })}>
          <div className='layer-toggle-text layer-toggle-top-text'>Oceans</div>
        </div>
        <div
          className={`layer-toggle layer-toggle-bottom layer-toggle-imagery ${layer.type === 'Imagery' ? 'active' : 'inactive'}`}
          onClick={() => setLayer({ type: 'Imagery', labels: 'ImageryLabels' })}>
          <div className='layer-toggle-text layer-toggle-bottom-text'>Imagery</div>
        </div>
      </div>
    </Sidebar>
  );
};
