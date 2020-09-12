import {
  FETCH_WRECKS_REQUEST,
  FETCH_WRECKS_SUCCESS,
  FETCH_WRECKS_FAILURE
} from '../actions';

export const INITIAL_STATE = {
  isFetching: false,
  wrecks: []
};

export const wrecksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_WRECKS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_WRECKS_SUCCESS:
      return { ...state, isFetching: false, wrecks: action.payload };
    case FETCH_WRECKS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
