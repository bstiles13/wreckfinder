import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Map from './components/Map/Map';
import { Sidebar } from './components/Sidebar/Sidebar';
import { fetchWrecks } from './store/actions';

import './App.scss';

const App = ({ fetchWrecks }) => {
  useEffect(() => {
    fetchWrecks();
  }, []);

  return (
    <div className='app'>
      <Sidebar>
        <Map />
      </Sidebar>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchWrecks
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(App);
