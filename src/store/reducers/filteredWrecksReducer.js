import {
  SET_FILTERED_WRECKS
} from '../actions';

export const INITIAL_STATE = {
  filteredWrecks: []
};

export const filteredWrecksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FILTERED_WRECKS:
      return { ...state, filteredWrecks: action.payload };
    default:
      return state;
  }
};
