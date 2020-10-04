import axios from 'axios';
import { get } from 'lodash';
import localStorageHelper from '../../utils/localStorage';
import { sleep } from '../../utils';

export const FETCH_FAVORITES_REQUEST = 'FETCH_FAVORITES_REQUEST';
export const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';
export const FETCH_FAVORITES_FAILURE = 'FETCH_FAVORITES_FAILURE';
export const CREATE_FAVORITE_REQUEST = 'CREATE_FAVORITE_REQUEST';
export const CREATE_FAVORITE_SUCCESS = 'CREATE_FAVORITE_SUCCESS';
export const CREATE_FAVORITE_FAILURE = 'CREATE_FAVORITE_FAILURE';
export const DELETE_FAVORITE_REQUEST = 'DELETE_FAVORITE_REQUEST';
export const DELETE_FAVORITE_SUCCESS = 'DELETE_FAVORITE_SUCCESS';
export const DELETE_FAVORITE_FAILURE = 'DELETE_FAVORITE_FAILURE';

export const fetchFavorites = () => async (dispatch, getStore) => {
  dispatch({ type: FETCH_FAVORITES_REQUEST });
  try {
    let res;
    if (get(getStore(), 'session.session.id')) {
      res = await axios.get('/user/favorites');
    } else {
      res = { data: localStorageHelper.getFavorites() };
    }
    dispatch({
      type: FETCH_FAVORITES_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: FETCH_FAVORITES_FAILURE });
    throw Error(error);
  }
};

export const createFavorite = (wreck) => async (dispatch, getStore) => {
  dispatch({ type: CREATE_FAVORITE_REQUEST });
  try {
    if (get(getStore(), 'session.session.id')) {
      await axios.post('/user/favorites/create', { id: wreck._id });
    } else {
      await sleep(1000);
      localStorageHelper.createFavorite(wreck);
    }
    dispatch({
      type: CREATE_FAVORITE_SUCCESS
    });
  } catch (error) {
    dispatch({ type: CREATE_FAVORITE_FAILURE });
    throw Error(error);
  }
};

export const deleteFavorite = (wreck) => async (dispatch, getStore) => {
  dispatch({ type: DELETE_FAVORITE_REQUEST });
  try {
    if (get(getStore(), 'session.session.id')) {
      await axios.post('/user/favorites/delete', { id: wreck._id });
    } else {
      await sleep(1000);
      localStorageHelper.deleteFavorite(wreck);
    }
    dispatch({
      type: DELETE_FAVORITE_SUCCESS
    });
  } catch (error) {
    dispatch({ type: DELETE_FAVORITE_FAILURE });
    throw Error(error);
  }
};
