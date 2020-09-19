export const SET_MAP_VIEW = 'SET_MAP_VIEW';
export const SET_MAP_ZOOM = 'SET_MAP_ZOOM';
export const SET_MAP_FILTER_TYPE = 'SET_MAP_FILTER_TYPE';
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

export const resetMap = () => ({ type: RESET_MAP });
