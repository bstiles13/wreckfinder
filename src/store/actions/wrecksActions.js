import axios from 'axios';

export const FETCH_WRECKS_REQUEST = 'FETCH_WRECKS_REQUEST';
export const FETCH_WRECKS_SUCCESS = 'FETCH_WRECKS_SUCCESS';
export const FETCH_WRECKS_FAILURE = 'FETCH_WRECKS_FAILURE';

export const fetchWrecks = () => async (dispatch) => {
  dispatch({ type: FETCH_WRECKS_REQUEST });
  try {
    const res = await axios.get('/wrecks');
    dispatch({
      type: FETCH_WRECKS_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: FETCH_WRECKS_FAILURE });
    throw Error(error);
  }
};
