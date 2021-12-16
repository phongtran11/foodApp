import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const PLACES = [
    {
        id: 1,
        title: 'hue',
        description: 'dep',
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/147/147144.png',
        address: '30/1 hung vuong',
        location: {
            lat: 16.4535435,
            lng: 107.5070723,
        },
        creator: '1',
    },
    {
        id: 2,
        title: 'a',
        description: 'dep',
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/147/147144.png',
        address: '30/1 hung vuong',
        location: {
            lat: 16.4535435,
            lng: 107.5070723,
        },
        creator: '2',
    },
];

const UserPlaces = (props) => {
    const userId = useParams().userId;

    const loadedPlaces = PLACES.filter((place) => place.creator === userId);

    return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
