import React from 'react';

import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hook/form-hook';
import './PlaceForm.css';

const NewPlace = (props) => {
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            },
            address: {
                value: '',
                isValid: false,
            },
        },
        false
    );

    const placeSubmitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
            <Input
                element="input"
                label="Tên địa điểm"
                type="text"
                id="title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Xin Nhập tiêu đề "
                onInput={inputHandler}
            />
            <Input
                element="textarea"
                label="Mô tả"
                id="description"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                errorText="Nhập mô tả hợp lệ (ít nhất 5 chữ cái)"
                onInput={inputHandler}
            />
            <Input
                element="input"
                label="Địa Chỉ"
                id="address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Xin Nhập Địa Chỉ"
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
                Thêm
            </Button>
        </form>
    );
};

export default NewPlace;
