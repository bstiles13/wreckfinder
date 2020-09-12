import React, { useState } from 'react';
import {
  Menu as SemanticMenu,
  Icon
} from 'semantic-ui-react';
import { Login } from './Login/Login';
import { Results } from './Results/Results';
import { Articles } from './Articles/Articles';
import { Favorites } from './Favorites/Favorites';
import { Trivia } from './Trivia/Trivia';

export const Menu = () => {
  const [activeTab, setActiveTab] = useState('login');
  const handleItemClick = (e, { name }) => setActiveTab(name);

  return (
    <>
      <SemanticMenu attached='top' tabular>
        <SemanticMenu.Item
          name='login'
          active={activeTab === 'login'}
          onClick={handleItemClick}
          as='a'
        >
          <Icon name='user' />Sign In
        </SemanticMenu.Item>
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
      </SemanticMenu>

      <Login isActive={activeTab === 'login'} />
      <Results isActive={activeTab === 'results'} />
      <Articles isActive={activeTab === 'articles'} />
      <Favorites isActive={activeTab === 'favorites'} />
      <Trivia isActive={activeTab === 'trivia'} />
    </>
  );
};

export default Menu;
