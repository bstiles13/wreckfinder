import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  CLEAR_ARTICLES
} from '../actions';

export const INITIAL_STATE = {
  isFetching: false,
  articles: [],
  query: null
};

export const articlesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return { ...state, isFetching: true, query: action.payload };
    case FETCH_ARTICLES_SUCCESS:
      return { ...state, isFetching: false, articles: action.payload };
    case FETCH_ARTICLES_FAILURE:
      return { ...state, isFetching: false };
    case CLEAR_ARTICLES:
      return INITIAL_STATE;
    default:
      return state;
  }
};
