import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from './components/Home/Home';
import { Privacy } from './components/Privacy/Privacy';
import { fetchSession, fetchFavorites, fetchWrecks } from './store/actions';

import './App.scss';

const App = ({ fetchSession, fetchFavorites, fetchWrecks, mapKey }) => {
  const clearHash = () => { // Removes url hash appended by passport facebook bug
    if (document.location.hash === '#_=_') {
      // eslint-disable-next-line no-restricted-globals
      document.location.href = location.href.split('#')[0];
    };
  };

  useEffect(async () => {
    clearHash();
    await fetchSession();
    fetchFavorites();
    fetchWrecks();
  }, []);

  return (
    <div className='app'>
      <Switch>
        <Route exact path='/'><Home /></Route>
        <Route path='/privacy'><Privacy /></Route>
        <Redirect to='/' />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  mapKey: state.map.key
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchSession,
    fetchFavorites,
    fetchWrecks
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
