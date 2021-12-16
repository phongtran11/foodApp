import React from 'react';
import GoogleMapReact from 'google-map-react';

import './Map.css';

const PlaceLocation = (props) => <div className="map__marker"></div>;

const Map = (props) => {
    return (
        <div className={`map ${props.className}`} style={props.style}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: '' }}
                defaultCenter={props.location}
                defaultZoom={16}
            >
                <PlaceLocation lng={props.location.lng} lat={props.location.lat} />
            </GoogleMapReact>
        </div>
    );
};

export default Map;
