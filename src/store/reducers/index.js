import { combineReducers } from 'redux';
import { wrecksReducer } from './wrecksReducer';
import { selectedWreckReducer } from './selectedWreckReducer';
import { filteredWrecksReducer } from './filteredWrecksReducer';

const reducers = combineReducers({
  wrecks: wrecksReducer,
  selectedWreck: selectedWreckReducer,
  filteredWrecks: filteredWrecksReducer
});

export default reducers;
