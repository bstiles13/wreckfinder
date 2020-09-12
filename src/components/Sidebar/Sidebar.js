import React, { useState } from 'react';
import {
  Icon,
  Menu,
  Segment,
  Sidebar as SemanticSidebar
} from 'semantic-ui-react';
import { Search } from './Search/Search';

import './Sidebar.scss';

export const Sidebar = ({ children }) => {
  const [visible, setVisible] = useState(true);

  const [activeItem, setActiveItem] = useState('tab1');
  const handleItemClick = (e, { name }) => setActiveItem(name);

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
            <div className='map-sidebar-content-body'>
              <Search />
            </div>
            <div>
              <Menu attached='top' tabular>
                <Menu.Item
                  name='tab1'
                  active={activeItem === 'tab1'}
                  onClick={handleItemClick}
                  as='a'
                >
                  <Icon name='user' />Sign In
                </Menu.Item>
                <Menu.Item
                  name='tab2'
                  active={activeItem === 'tab2'}
                  onClick={handleItemClick}
                  as='a'
                >
                  <Icon name='database' />Results
                </Menu.Item>
                <Menu.Item
                  name='tab3'
                  active={activeItem === 'tab3'}
                  onClick={handleItemClick}
                  as='a'
                >
                  <Icon name='newspaper outline' />Articles
                </Menu.Item>
                <Menu.Item
                  name='tab4'
                  active={activeItem === 'tab4'}
                  onClick={handleItemClick}
                  as='a'
                >
                  <Icon name='favorite' />Favorites
                </Menu.Item>
                <Menu.Item
                  name='tab5'
                  active={activeItem === 'tab5'}
                  onClick={handleItemClick}
                  as='a'
                >
                  <Icon name='question' />Trivia
                </Menu.Item>
              </Menu>

              <Segment attached='bottom'>
                {`There are many variations of passages of Lorem Ipsum available, but
                the majority have suffered alteration in some form, by injected
                humour, or randomised words which don't look even slightly believable.
                If you are going to use a passage of Lorem Ipsum, you need to be sure
                there isn't anything embarrassing hidden in the middle of text. All
                the Lorem Ipsum generators on the Internet tend to repeat predefined
                chunks as necessary, making this the first true generator on the
                Internet. It uses a dictionary of over 200 Latin words, combined with
                a handful of model sentence structures, to generate Lorem Ipsum which
                looks reasonable. The generated Lorem Ipsum is therefore always free
                from repetition, injected humour, or non-characteristic words etc.`}
              </Segment>
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
