import { useState, useEffect } from 'react';

const SimpleInput = (props) => {
    const [enteredName, setEnterName] = useState('');
    const [enteredNameTouched, setEnterNameTouched] = useState(false);
    // const [formIsValid, setFormIsValid] = useState(false);

    const enteredNameIsValid = enteredName.trim() !== '';
    const enteredInputInvalid = !enteredNameIsValid && enteredNameTouched;
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

    const nameInputChangeHandler = (event) => {
        setEnterName(event.target.value);
    };

    const nameInputBlurHandler = (e) => {
        setEnterNameTouched(true);
    };

    const formSubmitDefault = (e) => {
        e.preventDefault();

        setEnterNameTouched(true);

        if (!enteredNameIsValid) {
            return;
        }
        setEnterName('');
        setEnterNameTouched(false);
    };

    const classForm = enteredInputInvalid ? 'form-control invalid' : 'form-control';

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
                {enteredInputInvalid && <p>Enter valid name</p>}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
