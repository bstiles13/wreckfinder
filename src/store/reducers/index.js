import { combineReducers } from 'redux';
import { sessionReducer } from './sessionReducer';
import { wrecksReducer } from './wrecksReducer';
import { selectedWreckReducer } from './selectedWreckReducer';
import { filteredWrecksReducer } from './filteredWrecksReducer';

const reducers = combineReducers({
  session: sessionReducer,
  wrecks: wrecksReducer,
  selectedWreck: selectedWreckReducer,
  filteredWrecks: filteredWrecksReducer
});

export default reducers;
