import React from "react";

const CartItem = props => {

    return (
        <li className="list-group-item">
            <div className="d-flex justify-content-between">
                <div className="w-100">
                    <h5 className="blockquote">{props.mealTitle} x {props.mealAmount}</h5>
                    <p className="text-success blockquote">{props.mealCost.toFixed(2)}$</p>
                </div>
                <div className="flex-shrink-1">
                    <div className="d-flex">
                        <button onClick={props.onAdd} className="btn btn-primary mx-2 px-4">+</button>
                        <button onClick={props.onRemove} className="btn btn-danger px-4">-</button>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default CartItem;