import { combineReducers } from 'redux';
import { sessionReducer } from './sessionReducer';
import { userReducer } from './userActions';
import { mapReducer } from './mapReducer';
import { wrecksReducer } from './wrecksReducer';
import { selectedWreckReducer } from './selectedWreckReducer';
import { filteredWrecksReducer } from './filteredWrecksReducer';

const reducers = combineReducers({
  session: sessionReducer,
  user: userReducer,
  map: mapReducer,
  wrecks: wrecksReducer,
  selectedWreck: selectedWreckReducer,
  filteredWrecks: filteredWrecksReducer
});

export default reducers;
