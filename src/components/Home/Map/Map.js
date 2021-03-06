import React, { useRef, useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map as LeafletMap, Marker as LeafletMarker, Popup } from 'react-leaflet';
import * as esri from 'esri-leaflet';
import { divIcon } from 'leaflet';
import { isEmpty, map, get, some, debounce } from 'lodash';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import {
  setMapView,
  setMapZoom,
  setMapViewport,
  setMapClickEvent,
  setSelectedWreck,
  fetchFavorites,
  createFavorite,
  deleteFavorite,
  fetchArticles,
  resetSelectedWreck
} from '../../../store/actions';
import { Marker } from './Marker/Marker';

import './Map.scss';

export const Map = props => {
  const {
    layer,
    view,
    zoom,
    filterType,
    setMapView,
    setMapZoom,
    setMapViewport,
    setMapClickEvent,
    setSelectedWreck,
    filteredWrecks,
    selectedWreck,
    favorites,
    fetchFavorites,
    createFavorite,
    deleteFavorite,
    fetchArticles,
    setActiveTab,
    clickEvent,
    resetSelectedWreck
  } = props;

  const mapRef = useRef();

  useEffect(() => {
    if (!isEmpty(selectedWreck) && !!selectedWreck.focus) {
      setMapView([selectedWreck.geometry.coordinates[1], selectedWreck.geometry.coordinates[0] + 0.13]); // offset required to center marker
      setMapZoom(10);
    }
  }, [selectedWreck]);

  useEffect(() => {
    const map = get(mapRef, 'current.leafletElement');

    if (!map) return false;

    // Removes stale layers before adding new layers
    map.eachLayer(layer => {
      layer._url && map.removeLayer(layer);
    });

    esri.basemapLayer(layer.type).addTo(map);
    esri.basemapLayer(layer.labels).addTo(map);
  }, [layer]);

  const renderMarkers = ({ wrecks, selectedWreck, setSelectedWreck, favorites, fetchArticles, setActiveTab }) => {
    if (isEmpty(wrecks)) return;

    return map(wrecks, wreck => {
      const isFavorite = some(favorites, favorite => favorite._id === wreck._id);
      const isSelected = wreck._id === get(selectedWreck, '_id');
      return (
        <Marker
          key={`wreck-${wreck._id}`}
          wreck={wreck}
          isFavorite={isFavorite}
          selected={isSelected}
          setSelectedWreck={setSelectedWreck}
          createFavorite={createFavorite}
          deleteFavorite={deleteFavorite}
          fetchFavorites={fetchFavorites}
          fetchArticles={fetchArticles}
          setActiveTab={setActiveTab}
        />
      );
    });
  };

  const onMapClick = (e, type) => {
    if (type === 'double') {
      resetSelectedWreck();
      setActiveTab('search');
    }
    setMapClickEvent({ ...e, type });
  };

  const wrecks = filterType === 'favorites'
    ? favorites
    : filteredWrecks;

  return (
    <LeafletMap
      className='map'
      ref={mapRef}
      center={view}
      zoom={zoom}
      minZoom={3}
      maxZoom={20}
      style={{ height: '100%', width: '100%' }}
      onViewportChanged={debounce(setMapViewport, 500)}
      worldCopyJump={true}
      onClick={e => onMapClick(e, 'single')}
      onDblClick={e => onMapClick(e, 'double')}
    >
      {
        (!isEmpty(clickEvent.latlng) && clickEvent.type === 'double') && (
          <LeafletMarker
            position={[clickEvent.latlng.lat, clickEvent.latlng.lng]}
            icon={divIcon({
              html: renderToStaticMarkup(
                <div className='radius-marker-container'>
                  <div className='radius-marker' />
                </div>
              )
            })}>
            <Popup>
              {`Double click automatically opens and populates the proximity search at the cursor's coordinates`}
            </Popup>
          </LeafletMarker>
        )
      }
      <MarkerClusterGroup key={`marker-group-${get(selectedWreck, '_id', '')}`} maxClusterRadius={40}>
        {
          renderMarkers({
            wrecks,
            selectedWreck,
            setSelectedWreck,
            favorites,
            createFavorite,
            deleteFavorite,
            fetchFavorites,
            fetchArticles,
            setActiveTab
          })
        }
      </MarkerClusterGroup>
      <div className='map-logo' />
    </LeafletMap>
  );
};

const mapStateToProps = state => ({
  view: state.map.view,
  zoom: state.map.zoom,
  filterType: state.map.filterType,
  wrecks: state.wrecks.wrecks,
  favorites: state.user.favorites,
  filteredWrecks: state.filteredWrecks.filteredWrecks,
  selectedWreck: state.selectedWreck.selectedWreck,
  clickEvent: get(state, 'map.clickEvent', {})
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setMapView,
  setMapZoom,
  setMapViewport,
  setMapClickEvent,
  setSelectedWreck,
  fetchFavorites,
  createFavorite,
  deleteFavorite,
  fetchArticles,
  resetSelectedWreck
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
