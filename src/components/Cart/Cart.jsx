import React, { useState, useContext } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CartContext from "../../context/cartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";
import Spinner from "../UI/Spinner";
import Checkmark from "../UI/SVG/Checkmark";

const Cart = props => {
    const [order, setOrder] = useState(false);
    const [checkout, setCheckout] = useState(false);

    const {
        sendRequest,
        isLoading,
        httpError,
    } = useHttp();

    const cartCtx = useContext(CartContext);

    console.log(`initial cart context`, cartCtx)

    const numCartItems = cartCtx.items.reduce((curr, item) => {
        return curr += item.amount
    }, 0)

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = item => {
        const newItem = { ...item, amount: item.amount + 1 }
        cartCtx.addItem(newItem);
        setOrder(false)
        setCheckout(false)
    }
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
        setOrder(false)
        setCheckout(false)
    }

    const cancelCheckoutHandler = () => {
        setOrder(false);
    }

    const showOrderForm = () => {
        setOrder(true);
    }

    const confirmOrderHandler = async (orderDetails) => {
        const meals = cartCtx.items.map(item => {
            return {
                mealId: item.id,
                quatity: item.amount
            }
        })
        const order = {
            name: orderDetails.name,
            city: orderDetails.city,
            street: orderDetails.street,
            postalCode: orderDetails.postalCode,
            meals
        }

        await sendRequest("http://localhost:3001/order/new", {
            method: "POST",
            body: order,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        setCheckout(true);
        setOrder(false);
    }

    // Modal Hide/Show Logic
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setOrder(false)
        setCheckout(false);
    };
    const handleShow = () => setShow(true);

    const cartItems = (
        <div>
            <ul className="list-group list-group-flush">
                {
                    cartCtx.items.map((item, index) => (
                        <CartItem
                            key={index}
                            id={item.id}
                            mealTitle={item.title}
                            mealCost={item.price}
                            mealAmount={item.amount}
                            onRemove={cartItemRemoveHandler.bind(null, item.id)}
                            onAdd={cartItemAddHandler.bind(null, item)}
                        />
                    ))
                }
            </ul>
            <div className="d-flex justify-content-between">
                <div className="p-2">
                    <h3>Total</h3>
                </div>
                <div className="p-2">
                    <h3>${cartCtx.totalAmount.toFixed(2)}</h3>
                </div>
            </div>
        </div>
    )

    return (
        <React.Fragment>
            <button onClick={handleShow} type="button" className={`btn btn-warning btn-light`}>
                <span className="fw-bold m-2">Cart</span>
                <span className="badge text-bg-primary">
                    {numCartItems}
                </span>
            </button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                    {
                        checkout ?
                            (
                                httpError ?
                                    <p className="text-center fw-bold"> Error sending order 😢 </p>
                                    :
                                    <p className="text-center fw-bold">Order sent 😋</p>
                            )
                            : (cartItems)
                    }
                </Modal.Body>
                <Modal.Footer>
                    {order ?
                        (
                            isLoading ?
                                <Spinner /> :
                                <Checkout
                                    onCancelCheckout={cancelCheckoutHandler}
                                    onConfirmOrder={confirmOrderHandler}
                                />
                        )
                        : (
                            checkout ? (
                                <Checkmark status={httpError ? "fail" : "success"}/>
                            ) : (
                                <div>
                                    <Button className="mx-2" variant="danger" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button disabled={!hasItems} variant="primary" onClick={showOrderForm}>
                                        {hasItems ? "Order" : "Add Items"}
                                    </Button>
                                </div>
                            )
                        )
                    }
                </Modal.Footer>
            </Modal >
        </React.Fragment >
    )
}

export default Cart;