import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Map as LeafletMap, Marker, Popup } from 'react-leaflet';
import * as esri from 'esri-leaflet';
import { isEmpty, map, get } from 'lodash';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Button, Card, Image } from 'semantic-ui-react';
import { setSelectedWreck } from '../../store/actions';

import './Map.scss';
import { bindActionCreators } from 'redux';

const renderPopupImage = (type) => {
  const types = {
    wreck: require('../../assets/wreck_icon.png'),
    obstruction: require('../../assets/rocks_icon.png')
  };

  return types[type];
};

const renderMarkers = ({ filteredWrecks: wrecks, selectedWreck, setSelectedWreck }) => {
  if (isEmpty(wrecks)) return;

  const openPopup = marker => {
    if (marker && marker.leafletElement && !!marker.props.selected) {
      setTimeout(() => marker.leafletElement.openPopup());
    }
  };

  return map(wrecks, (wreck, i) => {
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
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='green'>Favorite</Button>
                <Button basic color='red'>Search</Button>
              </div>
            </Card.Content>
          </Card>
        </Popup>
      </Marker>
    );
  });
};

export const Map = ({ wrecks, setSelectedWreck, filteredWrecks, selectedWreck }) => {
  const mapRef = useRef();

  const [view, setView] = useState([38.0406, -84.5037]);
  const [zoom, setZoom] = useState(4);
  useEffect(() => {
    if (!isEmpty(selectedWreck) && selectedWreck.focus) {
      setView([selectedWreck.geometry.coordinates[0], selectedWreck.geometry.coordinates[1] - 0.13]); // offset required to center marker
      setZoom(11);
    }
  }, [selectedWreck]);

  useEffect(() => {
    if (isEmpty(mapRef.current)) return false;

    esri.basemapLayer('Oceans').addTo(mapRef.current.leafletElement);
    esri.basemapLayer('OceansLabels').addTo(mapRef.current.leafletElement);
  }, []);

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
        {renderMarkers({ filteredWrecks, selectedWreck, setSelectedWreck })}
      </MarkerClusterGroup>
    </LeafletMap>
  );
};

const mapStateToProps = state => ({
  wrecks: state.wrecks.wrecks,
  filteredWrecks: state.filteredWrecks.filteredWrecks,
  selectedWreck: state.selectedWreck.selectedWreck
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setSelectedWreck
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
