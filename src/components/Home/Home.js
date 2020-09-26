import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import {
  Icon,
  Sidebar,
  Menu
} from 'semantic-ui-react';
import Content from './Content/Content';
import { resetMap, setMapFilterType, setSelectedWreck } from '../../store/actions';

import './Home.scss';

export const Home = ({ children, session, resetMap, setMapFilterType }) => {
  const [activeTab, setActiveTab] = useState(null);
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
    <>
      <Sidebar.Pushable>
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
        <Sidebar
          className='map-sidebar-right'
          as={Menu}
          animation='overlay'
          icon='labeled'
          vertical
          visible={!!activeTab}
          width='thin'
          direction='right'
        >
          <div className='map-sidebar-content'>
            <div className='map-sidebar-content-header'>
              <div className='app-title'>Wreck Finder</div>
              <Icon className='map-sidebar-toggle' name='angle double left' size='large' onClick={() => setActiveTab(null)} />
            </div>
            <div className='content-container'>
              <Content activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>
        </Sidebar>

        <Sidebar.Pusher className='map-container'>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

const mapStateToProps = state => ({
  session: state.session.session,
  fetchingSession: state.session.isFetching,
  filteredWrecks: state.filteredWrecks.filteredWrecks,
  favorites: state.user.favorites,
  selectedWreck: state.selectedWreck.selectedWreck
});

const mapDispatchToProps = dispatch => bindActionCreators({
  resetMap,
  setMapFilterType,
  setSelectedWreck
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
