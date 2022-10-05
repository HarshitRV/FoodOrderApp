import React from "react";


const Footer = props => {
    return (
        <div className="py-2 bg-primary text-white-50">
            <div className="text-center">
                <p className="fw-bold">Copyright &copy; HarshitRV {new Date().getFullYear()}</p>
            </div>
            <div className="text-center">
                <span>
                    <a className="text-dark text-decoration-none" href="https://github.com/HarshitRV/FoodOrderApp">GitHub</a>
                </span>
                <span className="mx-2">
                    <a className="text-dark text-decoration-none" href="https://twitter.com/hrv_vishwakarma">Twitter</a>
                </span>
                <span>
                    <a className="text-dark text-decoration-none" href="https://www.linkedin.com/in/harshitrv/">LinkedIn</a>
                </span>
            </div>
        </div>
    )
}

export default Footer