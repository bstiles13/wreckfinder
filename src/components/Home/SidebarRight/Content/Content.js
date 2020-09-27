import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import { Loader } from 'semantic-ui-react';
import { Search } from './Search/Search';
import { Articles } from './Articles/Articles';
import { Favorites } from './Favorites/Favorites';
import { Trivia } from './Trivia/Trivia';
import { resetMap, setMapFilterType, setSelectedWreck, fetchArticles, clearArticles } from '../../../../store/actions';

import './Content.scss';

export const Content = (props) => {
  const {
    activeTab,
    setActiveTab,
    fetchingSession,
    filteredWrecks,
    selectedWreck,
    setSelectedWreck,
    favorites,
    articles,
    articlesQuery,
    articlesFetching,
    fetchArticles,
    clearArticles,
    favoritesFetching
  } = props;

  useEffect(() => {
    if (!isEmpty(filteredWrecks)) {
      setActiveTab('search');
    }
  }, [filteredWrecks]);

  if (fetchingSession) return <Loader size='small' active inline='centered'>Loading</Loader>;

  return (
    <div className='sidebar-content'>
      <Search
        isActive={activeTab === 'search'}
        wrecks={filteredWrecks}
        selectedWreck={selectedWreck}
        setSelectedWreck={setSelectedWreck}
      />
      <Favorites
        isActive={activeTab === 'favorites'}
        wrecks={favorites}
        selectedWreck={selectedWreck}
        setSelectedWreck={setSelectedWreck}
        isFetching={favoritesFetching}
      />
      <Articles
        isActive={activeTab === 'articles'}
        articles={articles}
        query={articlesQuery}
        isFetching={articlesFetching}
        fetchArticles={fetchArticles}
        clearArticles={clearArticles}
      />
      <Trivia isActive={activeTab === 'trivia'} />
    </div>
  );
};

const mapStateToProps = state => ({
  session: state.session.session,
  fetchingSession: state.session.isFetching,
  filteredWrecks: state.filteredWrecks.filteredWrecks,
  favorites: state.user.favorites,
  selectedWreck: state.selectedWreck.selectedWreck,
  articles: state.articles.articles,
  articlesQuery: state.articles.query,
  articlesFetching: state.articles.isFetching,
  favoritesFetching: state.user.isFetching
});

const mapDispatchToProps = dispatch => bindActionCreators({
  resetMap,
  setMapFilterType,
  setSelectedWreck,
  fetchArticles,
  clearArticles
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Content);
