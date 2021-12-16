import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import './PlaceForm.css';
import { useForm } from '../../shared/hook/form-hook';

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

const UpdatePlace = () => {
    const placeId = useParams().placeId;

    const placeLoaded = PLACES.find((place) => place.id === +placeId);

    const [formState, inputHandler] = useForm(
        {
            title: {
                value: placeLoaded.title,
                isValid: true,
            },
            description: {
                value: placeLoaded.description,
                isValid: true,
            },
        },
        true
    );

    if (!placeLoaded) {
        return (
            <div className="centered">
                <h2>Không tìm thấy địa điểm</h2>
            </div>
        );
    }

    return (
        <form className="place-form">
            <Input
                id="title"
                element="input"
                label="Tiêu đề"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Xin nhập tiêu đề"
                value={formState.inputs.title.value}
                valid={true}
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea"
                label="Mô tả"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Xin nhập tối thiểu 5 ký tự"
                value={formState.inputs.description.value}
                valid={true}
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
                Cập nhật
            </Button>
        </form>
    );
};

export default UpdatePlace;
