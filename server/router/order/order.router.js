const { Router } = require("express");

// Controllers
const {
    getAllOrder,
    newOrder,
    getOneOrder,
    updateOneOrder,
    deleteOneOrder,
    deleteAllOrders
} = require("../../controller/order/order.controller");

// Middlewares
const delay = require("../../middlewares/delay");

const orderRouter = Router();

orderRouter.route("/orders")
    .get(getAllOrder)
    .delete(deleteAllOrders)

orderRouter.route("/order/new")
    .post(delay, newOrder)

orderRouter.route("/order:id")
    .get(getOneOrder)
    .put(updateOneOrder)
    .delete(deleteOneOrder)

module.exports = orderRouter;