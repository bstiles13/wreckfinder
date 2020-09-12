import {
  SET_SELECTED_WRECK,
  RESET_SELECTED_WRECK
} from '../actions/selectedWreckActions';

export const INITIAL_STATE = { selectedWreck: null };

export const selectedWreckReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SELECTED_WRECK:
      return { ...state, selectedWreck: action.payload };
    case RESET_SELECTED_WRECK:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
