import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
    const newPasswordRef = useRef();

    const { token } = useContext(AuthContext);

    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();

        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCB48Oddi5nzsz9LP_BmqA8n0ujzaZlQxA',
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken: token,
                    password: newPasswordRef.current.value,
                    returnSecureToken: false,
                }),
                header: {
                    'Content-Type': 'application/json',
                },
            }
        ).then((res) => {
            history.replace('/');
        });
    };

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <div className={classes.control}>
                <label htmlFor="new-password">New Password</label>
                <input ref={newPasswordRef} minLength={7} type="password" id="new-password" />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
};

export default ProfileForm;
