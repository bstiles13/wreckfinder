import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import {
  Menu as SemanticMenu,
  Icon
} from 'semantic-ui-react';
import { Login } from './Login/Login';
import { Results } from './Results/Results';
import { Articles } from './Articles/Articles';
import { Favorites } from './Favorites/Favorites';
import { Trivia } from './Trivia/Trivia';
import { setSelectedWreck } from '../../../store/actions';

import './Menu.scss';

export const Menu = ({ filteredWrecks, selectedWreck, setSelectedWreck }) => {
  const [activeTab, setActiveTab] = useState('results');
  const handleItemClick = (e, { name }) => setActiveTab(name);

  useEffect(() => {
    if (!isEmpty(filteredWrecks)) {
      setActiveTab('results');
    }
  }, [filteredWrecks]);

  return (
    <>
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
        <SemanticMenu.Item
          name='login'
          active={activeTab === 'login'}
          onClick={handleItemClick}
          as='a'
        >
          <Icon name='user' />Sign In
        </SemanticMenu.Item>
      </SemanticMenu>

      <Results isActive={activeTab === 'results'} filteredWrecks={filteredWrecks} selectedWreck={selectedWreck} setSelectedWreck={setSelectedWreck} />
      <Articles isActive={activeTab === 'articles'} />
      <Favorites isActive={activeTab === 'favorites'} />
      <Trivia isActive={activeTab === 'trivia'} />
      <Login isActive={activeTab === 'login'} />
    </>
  );
};

const mapStateToProps = state => ({
  filteredWrecks: state.filteredWrecks.filteredWrecks,
  selectedWreck: state.selectedWreck.selectedWreck
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setSelectedWreck
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
