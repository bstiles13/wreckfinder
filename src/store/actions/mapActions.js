import { get } from 'lodash';
// import { INITIAL_STATE } from '../reducers/mapReducer';
export const SET_MAP_VIEW = 'SET_MAP_VIEW';
export const SET_MAP_ZOOM = 'SET_MAP_ZOOM';
export const SET_MAP_FILTER_TYPE = 'SET_MAP_FILTER_TYPE';
export const SET_MAP_VIEWPORT = 'SET_MAP_VIEWPORT';
export const RESET_MAP = 'RESET_MAP';

export const setMapView = (coordinates) => {
  return {
    type: SET_MAP_VIEW,
    payload: coordinates
  };
};

export const setMapZoom = (zoom) => {
  return {
    type: SET_MAP_ZOOM,
    payload: zoom
  };
};

export const setMapFilterType = (type) => {
  return {
    type: SET_MAP_FILTER_TYPE,
    payload: type
  };
};

export const setMapViewport = (viewport) => {
  return {
    type: SET_MAP_VIEWPORT,
    payload: viewport
  };
};

export const resetMap = () => (dispatch, getStore) => {
  const currentZoom = get(getStore(), 'map.viewport.zoom');
  console.log('ZOOM', currentZoom);

  // if (!currentZoom) return;

  // if (currentZoom > 17) {
  //   dispatch({ type: RESET_MAP });
  // } else {
  //   dispatch(setMapZoom(8));
  // }
};
