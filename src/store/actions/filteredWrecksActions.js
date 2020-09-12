export const SET_FILTERED_WRECKS = 'SET_FILTERED_WRECKS';

export const setFilteredWrecks = (filteredWrecks) => {
  return {
    type: SET_FILTERED_WRECKS,
    payload: filteredWrecks
  };
};
