import {
  SET_MAP_VIEW,
  SET_MAP_ZOOM,
  SET_MAP_FILTER_TYPE,
  SET_MAP_VIEWPORT,
  SET_MAP_CLICK_EVENT,
  RESET_MAP
} from '../actions/mapActions';
import { v4 as uuidv4 } from 'uuid';

export const INITIAL_STATE = {
  view: [38.0406, -84.5037],
  zoom: 4,
  filterType: 'results'
};

export const mapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MAP_VIEW:
      return { ...state, view: action.payload };
    case SET_MAP_ZOOM:
      return { ...state, zoom: action.payload };
    case SET_MAP_FILTER_TYPE:
      return { ...state, filterType: action.payload };
    case SET_MAP_VIEWPORT:
      return { ...state, viewport: action.payload };
    case SET_MAP_CLICK_EVENT:
      return { ...state, clickEvent: action.payload };
    case RESET_MAP:
      return { ...INITIAL_STATE, key: uuidv4() };
    default:
      return state;
  }
};
