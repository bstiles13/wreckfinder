import React, { useRef, useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map as LeafletMap } from 'react-leaflet';
import * as esri from 'esri-leaflet';
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
  fetchArticles
} from '../../store/actions';
import { Marker } from './Marker/Marker';

import './Map.scss';

export const Map = ({
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
  setActiveTab
}) => {
  const mapRef = useRef();

  useEffect(() => {
    if (!isEmpty(selectedWreck) && !!selectedWreck.focus) {
      setMapView([selectedWreck.geometry.coordinates[1], selectedWreck.geometry.coordinates[0] - 0.13]); // offset required to center marker
      setMapZoom(10);
    }
  }, [selectedWreck]);

  const [layer, setLayer] = useState({ type: 'Oceans', labels: 'OceansLabels' });
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
      return (
        <Marker
          key={`wreck-${wreck._id}`}
          wreck={wreck}
          isFavorite={isFavorite}
          selectedWreck={selectedWreck}
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
      onClick={e => setMapClickEvent({ ...e, type: 'single' })}
      onDblClick={e => setMapClickEvent({ ...e, type: 'double' })}
    >
      <MarkerClusterGroup maxClusterRadius={40}>
        {renderMarkers({ wrecks, selectedWreck, setSelectedWreck, favorites, createFavorite, deleteFavorite, fetchFavorites, fetchArticles, setActiveTab })}
      </MarkerClusterGroup>
      <div
        className={`layer-toggle ${layer.type === 'Oceans' ? 'layer-toggle-imagery' : 'layer-toggle-oceans'}`}
        onClick={() => layer.type === 'Oceans' ? setLayer({ type: 'Imagery', labels: 'ImageryLabels' }) : setLayer({ type: 'Oceans', labels: 'OceansLabels' })}>
        {layer.type === 'Oceans' ? 'Imagery' : 'Oceans'}
      </div>
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
  selectedWreck: state.selectedWreck.selectedWreck
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
  fetchArticles
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
