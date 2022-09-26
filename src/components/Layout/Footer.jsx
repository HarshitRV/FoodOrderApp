import React from "react";

const Footer = props => {
    return (
        <body className="d-flex flex-column">
            <div id="page-content">
                <div className="container text-center">
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <h1 className="fw-light mt-4 text-white">Sticky Footer using Flexbox</h1>
                            <p className="lead text-white-50">Use just two Bootstrap utility classNamees and three custom CSS rules and you will have a flexbox enabled sticky footer for your website!</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer id="sticky-footer" className="flex-shrink-0 py-4 bg-primary text-white-50">
                <div className="container text-center">
                    <bold className="fw-bold">Copyright &copy; HarshitRV {new Date().getFullYear()}</bold>
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
            </footer>
        </body>
    )
}

export default Footer