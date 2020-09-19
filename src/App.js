import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Map from './components/Map/Map';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Privacy } from './components/Privacy/Privacy';
import { fetchSession, fetchWrecks } from './store/actions';

import './App.scss';

const App = ({ fetchSession, fetchWrecks }) => {
  useEffect(() => {
    fetchSession();
    fetchWrecks();
  }, []);

  return (
    <div className='app'>
      <Switch>
        <Route exact path='/'><Sidebar><Map /></Sidebar></Route>
        <Route path='/privacy'><Privacy /></Route>
        <Redirect to='/' />
      </Switch>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchSession,
    fetchWrecks
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(App);
