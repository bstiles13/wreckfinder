import {
  FETCH_SESSION_REQUEST,
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_FAILURE
} from '../actions';

export const INITIAL_STATE = {
  isFetching: false,
  session: {}
};

export const sessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SESSION_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_SESSION_SUCCESS:
      return { ...state, isFetching: false, session: action.payload };
    case FETCH_SESSION_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
