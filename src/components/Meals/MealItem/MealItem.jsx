import React, { useContext } from "react";
import CartContext from "../../../context/cartContext";
import MealItemForm from "./MealItemForm";

const MealItem = props => {
    const cartCtx = useContext(CartContext)

    const onAddAmountHandler = (amount) => {
        const item = {
            id: props.id,
            title: props.mealTitle,
            price: props.mealCost,
            amount
        }
        // Adding the item to cart.
        console.log("Item adding to cart - ");
        console.log(item);
        cartCtx.addItem(item);
    }

    return (
        <li className="list-group-item">
            <div className="d-flex justify-content-between">
                <div className="p-2 w-100">
                    <h5 className="blockquote">{props.mealTitle}</h5>
                    <p className="card-text blockquote-footer">{props.mealDescription}</p>
                    <p className="text-success blockquote">{props.mealCost.toFixed(2)}$</p>
                </div>
                <div className="p-2 flex-shrink-1">
                    <MealItemForm onAddAmount={onAddAmountHandler} id={props.id} />
                </div>
            </div>
        </li>
    )
}

export default MealItem;