import {
  FETCH_FAVORITES_REQUEST,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_FAILURE,
  CREATE_FAVORITE_REQUEST,
  CREATE_FAVORITE_SUCCESS,
  CREATE_FAVORITE_FAILURE,
  DELETE_FAVORITE_REQUEST,
  DELETE_FAVORITE_SUCCESS,
  DELETE_FAVORITE_FAILURE
} from '../actions';

export const INITIAL_STATE = {
  isFetching: false,
  favorites: []
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FAVORITES_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_FAVORITES_SUCCESS:
      return { ...state, isFetching: false, favorites: action.payload };
    case FETCH_FAVORITES_FAILURE:
      return { ...state, isFetching: false };
    case CREATE_FAVORITE_REQUEST:
      return { ...state, isFetching: true };
    case CREATE_FAVORITE_SUCCESS:
      return { ...state, isFetching: false };
    case CREATE_FAVORITE_FAILURE:
      return { ...state, isFetching: false };
    case DELETE_FAVORITE_REQUEST:
      return { ...state, isFetching: true };
    case DELETE_FAVORITE_SUCCESS:
      return { ...state, isFetching: false };
    case DELETE_FAVORITE_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
