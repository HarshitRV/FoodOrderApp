import { useReducer } from "react"

const initState = {
    inputValue: "",
    inputTouched: false
}

const formReducer = (state, action) => {
    if(action.type === "INPUT") {
        return {
            inputValue: action.value,
            inputTouched: true
        }
    }
    if(action.type === "BLUR") {
        return {
            ...state,
            inputTouched: true
        }
    }
    if(action.type === "RESET") {
        return initState
    }
    return initState
}

export default function useInput(checkIsValid) {
    const [inputState, dispatchInput] = useReducer(formReducer, initState);

    let inputError;
    if (inputState.inputTouched) inputError = checkIsValid(inputState.inputValue);
    else inputError = true;

    const isInputValid = checkIsValid(inputState.inputValue)

    const inputChangeHandler = (e) => {
        dispatchInput({type: "INPUT", value: e.target.value})
    }

    const inputBlurHandler = (e) => {
        dispatchInput({type: "BLUR"});
    }

    const reset = () => {
        dispatchInput({type: "REST"})
    }

    return {
        inputValue: inputState.inputValue,
        inputError,
        inputChangeHandler,
        inputBlurHandler,
        reset,
        isInputValid
    }
}