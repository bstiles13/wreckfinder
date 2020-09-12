import React, { useState } from 'react';
import {
  Menu as SemanticMenu,
  Icon,
  Segment
} from 'semantic-ui-react';

export const Menu = () => {
  const [activeItem, setActiveItem] = useState('tab1');
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <>
      <SemanticMenu attached='top' tabular>
        <SemanticMenu.Item
          name='tab1'
          active={activeItem === 'tab1'}
          onClick={handleItemClick}
          as='a'
        >
          <Icon name='user' />Sign In
        </SemanticMenu.Item>
        <SemanticMenu.Item
          name='tab2'
          active={activeItem === 'tab2'}
          onClick={handleItemClick}
          as='a'
        >
          <Icon name='database' />Results
        </SemanticMenu.Item>
        <SemanticMenu.Item
          name='tab3'
          active={activeItem === 'tab3'}
          onClick={handleItemClick}
          as='a'
        >
          <Icon name='newspaper outline' />Articles
        </SemanticMenu.Item>
        <SemanticMenu.Item
          name='tab4'
          active={activeItem === 'tab4'}
          onClick={handleItemClick}
          as='a'
        >
          <Icon name='favorite' />Favorites
        </SemanticMenu.Item>
        <SemanticMenu.Item
          name='tab5'
          active={activeItem === 'tab5'}
          onClick={handleItemClick}
          as='a'
        >
          <Icon name='question' />Trivia
        </SemanticMenu.Item>
      </SemanticMenu>

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
    </>
  );
};

export default Menu;
