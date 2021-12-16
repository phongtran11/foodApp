import React from 'react';

import './PlaceList.css';
import Card from '../../shared/UIElement/Card';
import PlaceItem from './PlaceItem';

const PlaceList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="place-list centered">
                <Card>
                    <h2>Chưa Có địa điểm nào! Hãy thêm. </h2>
                    <button>Thêm</button>
                </Card>
            </div>
        );
    }

    return (
        <ul className="place-list">
            {props.items.map((place) => (
                <PlaceItem key={place.id} {...place} />
            ))}
        </ul>
    );
};

export default PlaceList;
