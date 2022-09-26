import React, { useRef, useState } from "react";
import Input from "../../UI/Input/Input";

const MealItemForm = props => {
    const [isValidInput, setValidInput] = useState(true);

    const amountInputRef = useRef();

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value)
        if (!Number.isFinite(value) || value < 1 || value > 5) {
            setValidInput(false);
        } else {
            setValidInput(true);
        }
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const amount = parseInt(amountInputRef.current.value);

        if (!Number.isFinite(amount) || amount < 1 || amount > 5) {
            setValidInput(false);
            return;
        }

        props.onAddAmount(amount);
    }

    return (
        <form onSubmit={onSubmitHandler} className="d-flex flex-column justify-content-end">
            <div className="p-2">
                <Input
                    onInputChange={handleInputChange}
                    ref={amountInputRef}
                    input={{
                        id: "amount_" + props.id,
                        type: "number",
                        step: "1",
                        defaultValue: "1"
                    }}
                />
            </div>
            <div className="p-2">
                <button
                    disabled={!isValidInput}
                    type="submit"
                    className={
                        `btn btn-${isValidInput ? 'primary' : 'danger'} w-100`
                    }
                >{isValidInput ? "Add" : "Range 1-5"}
                </button>
            </div>
        </form>
    );
}

export default MealItemForm;