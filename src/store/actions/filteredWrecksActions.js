import { setSelectedWreck } from './index';
export const SET_FILTERED_WRECKS = 'SET_FILTERED_WRECKS';

export const setFilteredWrecks = (filteredWrecks) => (dispatch) => {
  dispatch({
    type: SET_FILTERED_WRECKS,
    payload: filteredWrecks
  });

  // If a single result then focus wreck
  if (filteredWrecks && filteredWrecks.length === 1) {
    dispatch(setSelectedWreck({ ...filteredWrecks[0], focus: true }));
  }
};
