import React, { useState, useEffect } from 'react';
import { Item, Accordion, Icon, Form, Input, Button, Message } from 'semantic-ui-react';
import Skeleton from 'react-loading-skeleton';
import { map, isEmpty, get } from 'lodash';
import ShowMoreText from 'react-show-more-text';
import { ARTICLE_LABELS } from '../../../../../constants';
import { delayAutoFocus } from '../../../../../utils';

import './Articles.scss';

export const Articles = ({ isActive, articles, query, isFetching, fetchArticles, clearArticles }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const [articleQuery, setArticleQuery] = useState(null);
  useEffect(() => {
    setArticleQuery(query);
  }, [query]);
  const handleChange = (e, { value }) => setArticleQuery(value);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  const handleClearArticles = () => {
    setArticleQuery('');
    clearArticles();
  };

  const renderArticles = (articles) => {
    if (isEmpty(articles)) {
      return (
        <div className='results-placeholder'>
          <Message>
            <Message.Header>No results</Message.Header>
            <p>Refine your results by modifying the search above or selecting a wreck
            </p>
          </Message>
        </div>
      );
    }

    return map(Object.keys(articles), (source, i) => {
      const articleRows = map(articles[source], row => {
        return (
          <Item>
            <Item.Image
              size='tiny'
              src={row.img || 'https://react.semantic-ui.com/images/wireframe/image.png'}
              onError={i => { i.target.src = 'https://react.semantic-ui.com/images/wireframe/image.png'; }}
            />

            <Item.Content>
              <Item.Header as='a' href={row.url} target='_blank'>{row.title}</Item.Header>
              <Item.Description>
                <ShowMoreText
                  lines={4}
                  more='Show more'
                  less='Show less'
                  anchorClass='test'
                  expanded={false}
                  width={0}
                >
                  {row.description || 'See article for additional info'}
                </ShowMoreText>
              </Item.Description>
            </Item.Content>
          </Item>
        );
      });

      return (
        <Accordion fluid styled>
          <Accordion.Title
            className='accordion-title'
            active={activeIndex === i}
            index={i}
            onClick={handleClick}
          >
            <div className='accordion-title-left'>
              <Icon name='dropdown' />
              {get(ARTICLE_LABELS, source, 'Error')}
            </div>
            <div className='accordion-title-right'>
              {`${articles[source].length} Results`}
            </div>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === i}>
            <Item.Group>
              {articleRows}
            </Item.Group>
          </Accordion.Content>
        </Accordion>
      );
    });
  };

  if (!isActive) return false;

  console.log('QUERY', query);

  return (
    <div className='articles'>
      <Form className='articles-form'>
        <Form.Field>
          <Input
            id='query'
            fluid
            icon='newspaper outline'
            iconPosition='left'
            onChange={handleChange}
            defaultValue={articleQuery || ''}
            ref={delayAutoFocus}
          />
        </Form.Field>
        <Form.Group as={Button.Group} className='search-form-buttons'>
          <Form.Button
            type='button'
            className='articles-form-button search-form-clear-button'
            onClick={handleClearArticles}
            inverted
          >
            Clear
          </Form.Button>
          <Form.Button
            className='articles-form-button button-primary'
            disabled={isEmpty(articleQuery)}
            onClick={() => fetchArticles(articleQuery)}
          >
            Search Articles
          </Form.Button>
        </Form.Group>
      </Form>
      <div className='articles-results'>
        {
          isFetching
            ? <Skeleton count={20} />
            : renderArticles(articles)
        }
      </div>
    </div>
  );
};
