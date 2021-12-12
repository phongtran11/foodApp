import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useContext(AuthContext);

    const history = useHistory();

    const emailRef = useRef();
    const passwordRef = useRef();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredemail = emailRef.current.value;
        const enteredpassword = passwordRef.current.value;

        setIsLoading(true);

        let url;

        if (isLogin) {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCB48Oddi5nzsz9LP_BmqA8n0ujzaZlQxA';
        } else {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCB48Oddi5nzsz9LP_BmqA8n0ujzaZlQxA';
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredemail,
                password: enteredpassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                setIsLoading(false);
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then((data) => {
                        let errorMessage = 'Authentication failed!';

                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message;
                        }
                        throw new Error(errorMessage);
                    });
                }
            })
            .then((data) => {
                const expirationTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
                login(data.idToken, expirationTime.ISOString());
                history.replace('/');
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" required ref={emailRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input type="password" id="password" required ref={passwordRef} />
                </div>
                <div className={classes.actions}>
                    {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                    {isLoading && <p>sending...</p>}
                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
