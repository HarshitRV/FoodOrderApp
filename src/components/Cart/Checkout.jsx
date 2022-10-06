import { useState, useEffect } from "react";

/**
 * Custom Hooks
 */
import useInput from "../../hooks/use-input";

const isValidValue = value => value && value.trim().length > 3;
const isValidPostalCode = value => value.trim().length === 6 && Number.isFinite(parseInt(value));

const Checkout = props => {
    const [isFormValid, setFormValid] = useState(false);

    const {
        inputValue: name,
        inputError: nameError,
        isInputValid: nameIsValid,
        inputChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: nameReset
    } = useInput(isValidValue);

    const {
        inputValue: street,
        inputError: streetError,
        isInputValid: streetIsValid,
        inputChangeHandler: streetChangeHandler,
        inputBlurHandler: streetBlurHandler,
        reset: streetReset
    } = useInput(isValidValue)


    const {
        inputValue: postalCode,
        inputError: postalCodeError,
        isInputValid: postalCodeIsValid,
        inputChangeHandler: postalCodeChangeHandler,
        inputBlurHandler: postalCodeBlurHandler,
        reset: postalCodeReset
    } = useInput(isValidPostalCode)

    const {
        inputValue: city,
        inputError: cityError,
        isInputValid: cityIsValid,
        inputChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler,
        reset: cityReset
    } = useInput(isValidValue);

    useEffect(() => {
        if (!nameIsValid || !streetIsValid || !postalCodeIsValid || !cityIsValid) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [nameIsValid, streetIsValid, postalCodeIsValid, cityIsValid]);

    const submitFormHandler = e => {
       
        e.preventDefault();
        if (!isFormValid) {
            return;
        }
        
        props.onConfirmOrder({
            name,
            street,
            city,
            postalCode,
        });

        // Resetting the form values
        nameReset(); streetReset();
        postalCodeReset(); cityReset();
    }

    return (
        <form onSubmit={submitFormHandler} className="w-100">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    value={name}
                    type="text"
                    id="name"
                    className={nameError ? "form-control" : "form-control is-invalid"}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="street" className="form-label">Street</label>
                <input
                    onChange={streetChangeHandler}
                    onBlur={streetBlurHandler}
                    value={street}
                    type="text"
                    id="street"
                    className={streetError ? "form-control" : "form-control is-invalid"}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="postal-code" className="form-label">Postal Code</label>
                <input type="text"
                    onChange={postalCodeChangeHandler}
                    onBlur={postalCodeBlurHandler}
                    value={postalCode}
                    id="postal-code"
                    className={postalCodeError ? "form-control" : "form-control is-invalid"}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text"
                    onChange={cityChangeHandler}
                    onBlur={cityBlurHandler}
                    value={city}
                    id="city"
                    className={cityError ? "form-control" : "form-control is-invalid"}
                />
            </div>
            <button disabled={!isFormValid} type="submit" className="btn btn-primary">Confirm</button>
            <button onClick={props.onCancelCheckout} className="btn btn-danger mx-2">Cancel</button>
        </form>
    )
}

export default Checkout;