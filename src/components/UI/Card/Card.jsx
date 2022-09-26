import React from "react";

const Card = props => {
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    { props.children }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Card;