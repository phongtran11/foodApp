import useInput from '../hook/use-input';

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');

const BasicForm = (props) => {
    const {
        value: firstNameValue,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: restFirstName,
    } = useInput(isNotEmpty);

    const {
        value: lastNameValue,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: restLastName,
    } = useInput(isNotEmpty);

    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: restEmail,
    } = useInput(isEmail);

    let formIsValid = false;

    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
        formIsValid = true;
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (!formIsValid) {
            return;
        }

        restFirstName();
        restLastName();
        restEmail();
    };

    const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
    const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
    const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

    return (
        <form onSubmit={submitHandler}>
            <div className="control-group">
                <div className={firstNameClasses}>
                    <label htmlFor="name">First Name</label>
                    <input
                        type="text"
                        id="name"
                        value={firstNameValue}
                        onChange={firstNameChangeHandler}
                        onBlur={firstNameBlurHandler}
                    />
                    {firstNameHasError && <p>enter valid</p>}
                </div>
                <div className={lastNameClasses}>
                    <label htmlFor="name">Last Name</label>
                    <input
                        type="text"
                        id="name"
                        value={lastNameValue}
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                    />
                    {lastNameHasError && <p>enter valid</p>}
                </div>
            </div>
            <div className={emailClasses}>
                <label htmlFor="name">E-Mail Address</label>
                <input
                    type="text"
                    id="name"
                    value={emailValue}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                />
                {emailHasError && <p>enter valid</p>}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
