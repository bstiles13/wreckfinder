import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import {
  Loader
} from 'semantic-ui-react';
import { Login } from './Login/Login';
import { Search } from './Search/Search';
import { Articles } from './Articles/Articles';
import { Favorites } from './Favorites/Favorites';
import { Trivia } from './Trivia/Trivia';
import { resetMap, setMapFilterType, setSelectedWreck } from '../../../store/actions';

import './Content.scss';

export const Content = ({ activeTab, setActiveTab, fetchingSession, filteredWrecks, selectedWreck, setSelectedWreck, favorites }) => {
  useEffect(() => {
    if (!isEmpty(filteredWrecks)) {
      setActiveTab('search');
    }
  }, [filteredWrecks]);

  if (fetchingSession) return <Loader size='small' active inline='centered'>Loading</Loader>;

  return (
    <>
      <Search isActive={activeTab === 'search'} wrecks={filteredWrecks} selectedWreck={selectedWreck} setSelectedWreck={setSelectedWreck} />
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Content, (props, nextProps) => {
  if (nextProps.activeTab === 'settings') {
    return true;
  }
}));
