import { useState, useReducer } from 'react';

const initalInputState = {
    value: '',
    isTouched: false,
};

const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return { value: action.payload, isTouched: state.isTouched };
    }
    if (action.type === 'BLUR') {
        return { isTouched: true, value: state.value };
    }
    if (action.type === 'RESET') {
        return { isTouched: false, value: '' };
    }
    return inputStateReducer;
};

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initalInputState);

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (e) => {
        dispatch({ type: 'INPUT', payload: e.target.value });
    };

    const inputBlurHandler = (e) => {
        dispatch({ type: 'BLUR' });
    };

    const reset = () => {
        dispatch({ type: 'RESET' });
    };

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
    };
};

export default useInput;
