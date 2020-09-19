import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty, get } from 'lodash';
import {
  Menu as SemanticMenu,
  Icon,
  Loader,
  Popup,
  Segment
} from 'semantic-ui-react';
import { Default } from './Default/Default';
import { Login } from './Login/Login';
import { Results } from './Results/Results';
import { Articles } from './Articles/Articles';
import { Favorites } from './Favorites/Favorites';
import { Trivia } from './Trivia/Trivia';
import { resetMap, setMapFilterType, setSelectedWreck } from '../../../store/actions';

import './Menu.scss';

export const Menu = ({ session, fetchingSession, resetMap, filteredWrecks, selectedWreck, setSelectedWreck, favorites, setMapFilterType }) => {
  const [activeTab, setActiveTab] = useState(null);
  const handleItemClick = (e, { name: nextTab }) => {
    if (nextTab === activeTab) return false;

    if (nextTab === 'results') {
      resetMap();
      setMapFilterType(nextTab);
    }

    if (nextTab === 'favorites') {
      resetMap();
      setMapFilterType(nextTab);
    }

    setActiveTab(nextTab);
  };

  useEffect(() => {
    if (get(session, 'id')) {
      setActiveTab('results');
    }
  }, [session]);

  useEffect(() => {
    if (!isEmpty(filteredWrecks)) {
      setActiveTab('results');
    }
  }, [filteredWrecks]);

  if (fetchingSession) return <Loader size='small' active inline='centered'>Loading</Loader>;

  return (
    <>
      {
        activeTab && (
          <SemanticMenu className='sidebar-menu' attached='top' tabular>
            <SemanticMenu.Item
              name='results'
              active={activeTab === 'results'}
              onClick={handleItemClick}
              as='a'
            >
              <Icon name='database' />Results
            </SemanticMenu.Item>
            <SemanticMenu.Item
              name='articles'
              active={activeTab === 'articles'}
              onClick={handleItemClick}
              as='a'
            >
              <Icon name='newspaper outline' />Articles
            </SemanticMenu.Item>
            <SemanticMenu.Item
              name='favorites'
              active={activeTab === 'favorites'}
              onClick={handleItemClick}
              as='a'
            >
              <Icon name='favorite' />Favorites
            </SemanticMenu.Item>
            <SemanticMenu.Item
              name='trivia'
              active={activeTab === 'trivia'}
              onClick={handleItemClick}
              as='a'
            >
              <Icon name='question' />Trivia
            </SemanticMenu.Item>
            <Popup
              className='settings-popup'
              on='click'
              position='bottom center'
              offset='0, -11'
              pinned={true}
              basic
              trigger={
                <SemanticMenu.Item name='settings' as='a'>
                  <Icon name='ellipsis horizontal' />Settings
                </SemanticMenu.Item>
              }
              content={<>
                {
                  get(session, 'id')
                    ? (<>
                      <Segment vertical>{`Hi, ${get(session, 'displayName')}!`}</Segment>
                      <Segment className='settings-option' vertical as='a' href='http://localhost:3001/auth/logout/'>Sign Out</Segment>
                    </>)
                    : <Segment className='settings-option' vertical as='a' href='http://localhost:3001/auth/login/'>Sign In</Segment>
                }
                <Segment className='settings-option' vertical as={Link} to='/privacy'>Privacy</Segment>
              </>}
            />
          </SemanticMenu>
        )
      }

      <Default isActive={!activeTab} handleItemClick={handleItemClick} />
      <Results isActive={activeTab === 'results'} wrecks={filteredWrecks} selectedWreck={selectedWreck} setSelectedWreck={setSelectedWreck} />
      <Favorites isActive={activeTab === 'favorites'} wrecks={favorites} selectedWreck={selectedWreck} setSelectedWreck={setSelectedWreck} />
      <Articles isActive={activeTab === 'articles'} />
      <Trivia isActive={activeTab === 'trivia'} />
      <Login isActive={activeTab === 'login'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
