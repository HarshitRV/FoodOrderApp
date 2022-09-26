import React, { useState, useContext} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CartContext from "../../context/cartContext";
import CartItem from "./CartItem";

const Cart = props => {
    const [order, setOrder] = useState(false);
    const [confirm, setConfirm] = useState(false)

    const cartCtx = useContext(CartContext);

    console.log(`initial cart context`,cartCtx)

    const numCartItems = cartCtx.items.reduce((curr, item) => {
        return curr += item.amount
    }, 0)

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = item => {
        const newItem = { ...item, amount: item.amount + 1 }
        cartCtx.addItem(newItem);
        setOrder(false)
        setConfirm(false);
    }
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
        setOrder(false)
        setConfirm(false);
    }

  

    const confirmOrder = () => {
        setOrder(true);
        setTimeout(() => {
            setConfirm(true)
            console.log(`
            🅾🆁🅳🅴🆁
            🅲🅾🅽🅵🅸🆁🅼🅴🅳   
        `)
        }, 2000);
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setOrder(false)
        setConfirm(false);
    };
    const handleShow = () => setShow(true);

    const cartItems = (
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
                    {cartItems}
                    <div className="d-flex justify-content-between">
                        <div className="p-2">
                            <h3>Total</h3>
                        </div>
                        <div className="p-2">
                            <h3>${cartCtx.totalAmount.toFixed(2)}</h3>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {order ? (
                        <div className="w-100">
                            <button className={`btn btn-${confirm ? "success" : "primary"} w-100 btn-lg`}>
                                {
                                    confirm ?
                                        (<svg xmlns="http://www.w3.org/2000/svg" width="40" height="38" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                                        </svg>) :
                                        (
                                            <div className="spinner-border text-light" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        )
                                }
                            </button>

                        </div>
                    ) : (
                        <div>
                            <Button className="mx-2" variant="danger" onClick={handleClose}>
                                Close
                            </Button>
                            <Button disabled={!hasItems} variant="primary" onClick={confirmOrder}>
                                {hasItems ? "Order" : "Add Items"}
                            </Button>
                        </div>
                    )
                    }
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default Cart;