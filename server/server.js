// Node modules
const express = require("express");
const morgan = require("morgan")
const cors = require("cors");

// Utils
const ServerError = require("./utils/ServerError");

// Database
const connectDB = require("./utils/connectDB");

// Routers
const mealRouter = require("./router/meal/meal.router");
const orderRouter = require("./router/order/order.router");

// Declaration
const app = express();

app.use(cors());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", mealRouter);
app.use("/", orderRouter)

// Status route
app.route("/").get((req, res) => {
    res.status(200).send({
        status: 200,
        message: "Server is running"
    });
})

// If none of the routes match
app.all('*', (req, res, next) => {
    next(new ServerError('Not Found', 404));
});

// Error handling middleware
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong", stack } = err;
    res.status(status).send({
        message,
        stack
    });
})

app.listen(3001, () => {
    connectDB();
    console.log("Server running on port 3001");
});