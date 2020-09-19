import axios from 'axios';

export const FETCH_SESSION_REQUEST = 'FETCH_SESSION_REQUEST';
export const FETCH_SESSION_SUCCESS = 'FETCH_SESSION_SUCCESS';
export const FETCH_SESSION_FAILURE = 'FETCH_SESSION_FAILURE';

export const fetchSession = () => async (dispatch) => {
  dispatch({ type: FETCH_SESSION_REQUEST });
  try {
    const res = await axios.get('/auth/profile');
    dispatch({
      type: FETCH_SESSION_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: FETCH_SESSION_FAILURE });
    throw Error(error);
  }
};
