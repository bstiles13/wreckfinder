import * as esri from 'esri-leaflet';
import React, { useRef, useState, useEffect } from 'react';
import { Map as LeafletMap, Marker, Popup } from 'react-leaflet';
import { isEmpty, map } from 'lodash';
import axios from 'axios';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Button, Card, Image } from 'semantic-ui-react';

import './Map.scss';

const renderPopupImage = (type) => {
  const types = {
    wreck: require('../../assets/wreck_icon.png'),
    obstruction: require('../../assets/rocks_icon.png')
  };

  return types[type];
};

const renderPopups = (wrecks) => {
  if (isEmpty(wrecks)) return;

  let newWrecks = wrecks.slice(0, 100);

  return map(newWrecks, (wreck, i) => {
    return (
      <Marker key={`wreck-${i}`} position={wreck.geometry.coordinates} transparent>
        <Popup className='wreck-popup'>
          <Card>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src={renderPopupImage(wreck.properties.featureTypeShort)}
              />
              <Card.Header><div className='wreck-popup-name'>{wreck.properties.name}</div></Card.Header>
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

const fetchWrecks = async (cb) => {
  try {
    const res = await axios.get('/wrecks');
    cb(res.data);
  } catch (error) {
    return error;
  }
};

export const Map = () => {
  const mapRef = useRef();

  useEffect(() => {
    if (isEmpty(mapRef.current)) return false;

    esri.basemapLayer('Oceans').addTo(mapRef.current.leafletElement);
  }, []);

  const [wrecks, setWrecks] = useState([]);
  useEffect(() => {
    fetchWrecks(setWrecks);
  }, []);

  return (
    <LeafletMap
      ref={mapRef}
      center={[38.0406, -84.5037]}
      zoom={4}
      minZoom={3}
      style={{ height: '100%', width: '100%' }}
    >
      <MarkerClusterGroup maxClusterRadius={40}>
        {renderPopups(wrecks)}
      </MarkerClusterGroup>
    </LeafletMap>
  );
};
