import React from "react";
import style from "./Header.module.css"
import Cart from "../Cart/Cart";

const Header = props => {
    return (
        <React.Fragment>
            <nav className={`navbar navbar-dark bg-primary py-3 ${style.spacingBottom}`}>
                <div className="container">
                    <a className="navbar-brand" href="$">
                        Food Order App
                    </a>
                   <Cart />
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Header;