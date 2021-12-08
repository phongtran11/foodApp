import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const notEmpty = (value) => value.trim().length !== 0;
const validPhonenumb = (value) => value.trim().length <= 11 && value.trim().length >= 10;

const Checkout = (props) => {
    const [formInputValid, setFormInputValid] = useState({
        name: true,
        phonenumb: true,
    });

    const nameInputRef = useRef();
    const phonenumbInputRef = useRef();

    const confirmHandler = (e) => {
        e.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredPhonenumb = phonenumbInputRef.current.value;

        const enteredNameIsValid = notEmpty(enteredName);
        const enteredPhonenumbIsValid =
            notEmpty(enteredPhonenumb) && validPhonenumb(enteredPhonenumb);

        setFormInputValid({
            name: enteredNameIsValid,
            phonenumb: enteredPhonenumbIsValid,
        });

        const formIsValid = enteredNameIsValid && enteredPhonenumbIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            phonenumb: enteredPhonenumb,
        });
    };

    return (
        <form onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputValid.name ? '' : classes.invalid}`}>
                <label htmlFor="name">Tên</label>
                <input ref={nameInputRef} type="text" id="name" />
                {!formInputValid.name && <p>Xin nhập tên!</p>}
            </div>
            <div
                className={`${classes.control} ${formInputValid.phonenumb ? '' : classes.invalid}`}
            >
                <label htmlFor="phonenumb">Số điện thoại</label>
                <input ref={phonenumbInputRef} type="number" id="phonenumb" />
                {!formInputValid.phonenumb && <p>Xin nhập số điện thoại!</p>}
            </div>
            <div className={classes.actions}>
                <button tpye="button" onClick={props.onCancel}>
                    Hủy
                </button>
                <button type="submit" className={classes.sumbit}>
                    Xác nhận
                </button>
            </div>
        </form>
    );
};

export default Checkout;
