import React from 'react';
import { Map } from './components/Map/Map';
import { Sidebar } from './components/Sidebar/Sidebar';

import './App.scss';

const App = () => {
  return (
    <div className='app'>
      <Sidebar>
        <Map />
      </Sidebar>
    </div>
  );
};

export default App;
