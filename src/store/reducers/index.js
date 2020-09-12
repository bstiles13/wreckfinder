import { combineReducers } from 'redux';
import { wrecksReducer } from './wrecksReducer';
import { selectedWreckReducer } from './selectedWreckReducer';

const reducers = combineReducers({
  wrecks: wrecksReducer,
  selectedWreck: selectedWreckReducer
});

export default reducers;
