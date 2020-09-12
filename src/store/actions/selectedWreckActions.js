export const SET_SELECTED_WRECK = 'SET_SELECTED_WRECK';
export const RESET_SELECTED_WRECK = 'RESET_SELECTED_WRECK';

export const setSelectedWreck = (wreck) => {
  return {
    type: SET_SELECTED_WRECK,
    payload: wreck
  };
};

export const resetSelectedWreck = () => {
  return {
    type: RESET_SELECTED_WRECK,
    payload: null
  };
};
