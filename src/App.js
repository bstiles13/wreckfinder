import React from 'react';
import { Map } from './components/Map/Map';

import './App.scss';

const App = () => {
  return (
    <div className='app'>
      Wreck Finder
      <Map />
    </div>
  );
};

export default App;
