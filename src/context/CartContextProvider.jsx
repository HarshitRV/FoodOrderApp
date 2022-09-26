import React, { useReducer } from "react";
import CartContext from "./cartContext";

const defaultCartState = {
    items: JSON.parse(localStorage.getItem("cartItems")) || [],
    totalAmount: +(localStorage.getItem("totalAmount")) || 0
}

const cartReducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
        let updatedTotalAmount
        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
        let updateItem;
        let updatedItems;
        if(existingItemIndex !== -1) {
            updateItem = {
                ...state.items[existingItemIndex],
                amount: action.item.amount
            }
            state.items[existingItemIndex] = updateItem;

            updatedTotalAmount = state.items.reduce((curr, item)=>{
                return curr += (item.price * item.amount);
            }, 0)

            localStorage.setItem("cartItems", JSON.stringify(state.items));
            localStorage.setItem("totalAmount", JSON.stringify(updatedTotalAmount));

            return {
                items: state.items,
                totalAmount: updatedTotalAmount
            }
        } else {
            updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
            updatedItems = state.items.concat(action.item);
            localStorage.setItem("cartItems", JSON.stringify(updatedItems));
            localStorage.setItem("totalAmount", JSON.stringify(updatedTotalAmount));
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        }
    }
    if(action.type === "REMOVE_FROM_CART") {
        const itemIndex = state.items.findIndex(item => item.id === action.id);
        const item = state.items[itemIndex];
        const itemAmount = item.amount - 1;

        const updatedTotalAmount = state.totalAmount - item.price;
        let updatedItems;

        if(itemAmount === 0) {
            updatedItems = state.items.filter(item => item.id !== action.id);
            localStorage.setItem("cartItems", JSON.stringify(updatedItems));
            localStorage.setItem("totalAmount", JSON.stringify(updatedTotalAmount));
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        } else {
            const updatedItem = {...item, amount: itemAmount};
            state.items[itemIndex] = updatedItem;
            localStorage.setItem("cartItems", JSON.stringify(state.items));
            localStorage.setItem("totalAmount", JSON.stringify(updatedTotalAmount));
            return {
                items: state.items,
                totalAmount: updatedTotalAmount
            }
        }
    }

    return defaultCartState;
}

const CartContextProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addCartItemHandler = (item) => {
        dispatchCartAction({ type: "ADD_TO_CART", item });
    }

    const removeCartItemHandler = (id) => {
        dispatchCartAction({ type: "REMOVE_FROM_CART", id })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addCartItemHandler,
        removeItem: removeCartItemHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContextProvider