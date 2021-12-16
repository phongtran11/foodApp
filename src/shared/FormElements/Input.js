import React, { useReducer, useEffect } from 'react';

import { validate } from '../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            console.log(action);
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true,
            };
        default:
            return state;
    }
};

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value || '',
        isTouched: false,
        isValid: props.valid || false,
    });

    const { id, onInput } = props;
    const { value, isValid, isTouched } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    console.log(props.validators);

    const changeHandler = (event) => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators,
        });
    };

    const touchHandler = (event) => {
        dispatch({ type: 'TOUCH' });
    };

    const element =
        props.element === 'input' ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={value}
            />
        ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                onBlur={touchHandler}
                onChange={changeHandler}
            >
                {value}
            </textarea>
        );

    return (
        <div className={`form-control ${!isValid && isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!isValid && isTouched && <p>{props.errorText}</p>}
        </div>
    );
};

export default Input;
