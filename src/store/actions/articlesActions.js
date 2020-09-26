import axios from 'axios';

export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';
export const CLEAR_ARTICLES = 'CLEAR_ARTICLES';

export const fetchArticles = (query) => async (dispatch) => {
  dispatch({ type: FETCH_ARTICLES_REQUEST, payload: query });
  try {
    const res = await axios.get('/api/wrecks/articles', { params: { query } });
    dispatch({
      type: FETCH_ARTICLES_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: FETCH_ARTICLES_FAILURE });
    throw Error(error);
  }
};

export const clearArticles = () => ({ type: CLEAR_ARTICLES });
