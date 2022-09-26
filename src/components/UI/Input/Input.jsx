import React from "react";

const Input = React.forwardRef((props, ref) => {
    return (
        <div>
            <label className="visually-hidden" htmlFor={props.input.id}>{props.lable}</label>
            <input onChange={props.onInputChange} ref={ref} className ="form-control" {...props.input}/>
        </div>
    )
});

export default Input;