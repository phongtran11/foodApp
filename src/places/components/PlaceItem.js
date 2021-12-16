import React, { useState } from 'react';

import './PlaceItem.css';
import Card from '../../shared/UIElement/Card';
import Button from '../../shared/FormElements/Button';
import Modal from '../../shared/UIElement/Modal';
import Map from '../../shared/UIElement/Map';

const PlaceItem = (props) => {
    const [showMap, setShowMap] = useState(false);

    const openMapHandler = () => {
        setShowMap(true);
    };

    const closeMapHandler = () => {
        setShowMap(false);
    };

    return (
        <>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>Đóng</Button>}
            >
                <div className="map-container">
                    <Map location={props.location} title={props.title} />
                </div>
            </Modal>
            <li className="place-item">
                <Card className="place-item">
                    <div className="place-item__image">
                        <img src={props.imageUrl} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>
                            Xem Trên bảng đồ
                        </Button>
                        <Button to={`/places/${props.id}`}>Chỉnh Sửa</Button>
                        <Button danger>Xóa</Button>
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItem;
