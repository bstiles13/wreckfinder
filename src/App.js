import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from './components/Home/Home';
import { Privacy } from './components/Privacy/Privacy';
import { PageLoader } from './components/PageLoader/PageLoader';
import { fetchSession, fetchFavorites, fetchWrecks } from './store/actions';

import './App.scss';

const App = ({ fetchSession, fetchFavorites, fetchWrecks }) => {
  const clearHash = () => { // Removes url hash appended by passport facebook bug
    if (document.location.hash === '#_=_') {
      // eslint-disable-next-line no-restricted-globals
      document.location.href = location.href.split('#')[0];
    };
  };

  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(async () => {
    clearHash();
    await fetchSession();
    fetchFavorites();
    await fetchWrecks();
    setPageLoaded(true);
  }, []);

  return (
    <div className='app'>
      {
        !pageLoaded
          ? <PageLoader />
          : (
            <Switch>
              <Route exact path='/'><Home /></Route>
              <Route path='/privacy'><Privacy /></Route>
              <Redirect to='/' />
            </Switch>
          )
      }
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchSession,
    fetchFavorites,
    fetchWrecks
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(App);
