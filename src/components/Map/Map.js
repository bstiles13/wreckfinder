import React, { useRef, useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map as LeafletMap, Marker, Popup } from 'react-leaflet';
import * as esri from 'esri-leaflet';
import { isEmpty, map, get, some } from 'lodash';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Button, Card, Image, Icon } from 'semantic-ui-react';
import { setMapView, setMapZoom, setSelectedWreck, fetchFavorites, createFavorite, deleteFavorite } from '../../store/actions';

import './Map.scss';

export const Map = ({
  view,
  zoom,
  filterType,
  setMapView,
  setMapZoom,
  setSelectedWreck,
  filteredWrecks,
  selectedWreck,
  favorites,
  fetchFavorites,
  createFavorite,
  deleteFavorite
}) => {
  const mapRef = useRef();

  useEffect(() => {
    if (!isEmpty(selectedWreck) && !!selectedWreck.focus) {
      setMapView([selectedWreck.geometry.coordinates[0], selectedWreck.geometry.coordinates[1] - 0.13]); // offset required to center marker
      setMapZoom(11);
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

  const renderPopupImage = (type) => {
    const types = {
      wreck: require('../../assets/wreck_icon.png'),
      obstruction: require('../../assets/rocks_icon.png')
    };

    return types[type];
  };

  const handleCreateFavorite = async (id) => {
    await createFavorite(id);
    fetchFavorites();
  };

  const handleDeleteFavorite = async (id) => {
    await deleteFavorite(id);
    fetchFavorites();
  };

  const renderMarkers = ({ wrecks, selectedWreck, setSelectedWreck, favorites }) => {
    if (isEmpty(wrecks)) return;

    const openPopup = marker => {
      if (marker && marker.leafletElement && !!marker.props.selected) {
        setTimeout(() => marker.leafletElement.openPopup());
      }
    };

    return map(wrecks, (wreck, i) => {
      const isFavorite = some(favorites, favorite => favorite._id === wreck._id);
      return (
        <Marker
          key={`wreck-${i}`}
          selected={wreck.id === get(selectedWreck, 'id')}
          position={wreck.geometry.coordinates}
          transparent
          ref={openPopup}
          onClick={() => setSelectedWreck(wreck)}
        >
          <Popup className='wreck-popup'>
            <Card>
              <Card.Content>
                <Image
                  floated='right'
                  size='mini'
                  src={renderPopupImage(wreck.properties.featureTypeShort)}
                />
                <Card.Header><div className='wreck-popup-name'>{wreck.properties.name || 'Unknown'}</div></Card.Header>
                <Card.Meta>
                  {wreck.properties.featureTypeShort}
                  {wreck.properties.yearSunk && `: sunk ${wreck.properties.yearSunk}`}
                </Card.Meta>
                <Card.Description>
                  <div className='wreck-popup-history' title={wreck.properties.history}>{wreck.properties.history}</div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra className='wreck-popup-controls'>
                {
                  isFavorite
                    ? (
                      <Button basic color='red' size='tiny' onClick={() => handleDeleteFavorite(wreck._id)}>
                        <Icon name='minus circle' />
                        Remove Favorite
                      </Button>
                    )
                    : (
                      <Button basic color='green' size='tiny' onClick={() => handleCreateFavorite(wreck._id)}>
                        <Icon name='star' />
                        Add Favorite
                      </Button>
                    )
                }
                <Button basic color='black' size='tiny'>Learn More</Button>
              </Card.Content>
            </Card>
          </Popup>
        </Marker>
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
      style={{ height: '100%', width: '100%' }}
      worldCopyJump={true}
    >
      <MarkerClusterGroup maxClusterRadius={40}>
        {renderMarkers({ wrecks, selectedWreck, setSelectedWreck, favorites, createFavorite, deleteFavorite, fetchFavorites })}
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
  setSelectedWreck,
  fetchFavorites,
  createFavorite,
  deleteFavorite
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
