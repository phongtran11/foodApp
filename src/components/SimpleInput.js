import { useState, useEffect } from 'react';
import useInput from '../hook/use-input';

const SimpleInput = (props) => {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameErrorInput,
        valueChangeHandler: nameInputChangeHandler,
        inputBlurHandler: nameInputBlurHandler,
        reset: resetNameInput,
    } = useInput((value) => value.trim() !== '');

    let formIsValid = false;

    if (enteredNameIsValid) {
        formIsValid = true;
    }
    // useEffect(() => {
    //     if (enteredNameIsValid) {
    //         setFormIsValid(true);
    //     } else {
    //         setFormIsValid(false);
    //     }
    // });

    const formSubmitDefault = (e) => {
        e.preventDefault();

        if (!enteredNameIsValid) {
            return;
        }
        resetNameInput();
    };

    const classForm = nameErrorInput ? 'form-control invalid' : 'form-control';

    return (
        <form onSubmit={formSubmitDefault}>
            <div className={classForm}>
                <label htmlFor="name">Your Name</label>
                <input
                    type="text"
                    id="name"
                    onChange={nameInputChangeHandler}
                    onBlur={nameInputBlurHandler}
                    value={enteredName}
                />
                {nameErrorInput && <p>Enter valid name</p>}
            </div>
            <div className="form-actions">
                <button disabled={nameErrorInput}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
