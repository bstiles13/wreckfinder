import axios from 'axios';

export const FETCH_FAVORITES_REQUEST = 'FETCH_FAVORITES_REQUEST';
export const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';
export const FETCH_FAVORITES_FAILURE = 'FETCH_FAVORITES_FAILURE';
export const CREATE_FAVORITE_REQUEST = 'CREATE_FAVORITE_REQUEST';
export const CREATE_FAVORITE_SUCCESS = 'CREATE_FAVORITE_SUCCESS';
export const CREATE_FAVORITE_FAILURE = 'CREATE_FAVORITE_FAILURE';
export const DELETE_FAVORITE_REQUEST = 'DELETE_FAVORITE_REQUEST';
export const DELETE_FAVORITE_SUCCESS = 'DELETE_FAVORITE_SUCCESS';
export const DELETE_FAVORITE_FAILURE = 'DELETE_FAVORITE_FAILURE';

export const fetchFavorites = () => async (dispatch) => {
  dispatch({ type: FETCH_FAVORITES_REQUEST });
  try {
    const res = await axios.get('/user/favorites');
    dispatch({
      type: FETCH_FAVORITES_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: FETCH_FAVORITES_FAILURE });
    throw Error(error);
  }
};

export const createFavorite = (id) => async (dispatch) => {
  dispatch({ type: CREATE_FAVORITE_REQUEST });
  try {
    await axios.post('/user/favorites/create', { id });
    dispatch({
      type: CREATE_FAVORITE_SUCCESS
    });
  } catch (error) {
    dispatch({ type: CREATE_FAVORITE_FAILURE });
    throw Error(error);
  }
};

export const deleteFavorite = (id) => async (dispatch) => {
  dispatch({ type: DELETE_FAVORITE_REQUEST });
  try {
    await axios.post('/user/favorites/delete', { id });
    dispatch({
      type: DELETE_FAVORITE_SUCCESS
    });
  } catch (error) {
    dispatch({ type: DELETE_FAVORITE_FAILURE });
    throw Error(error);
  }
};
