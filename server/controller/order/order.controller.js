// Models
const Order = require("../../model/order.model");

// Utils
const handleAsync = require("../../utils/handleAync");
const ServerError = require("../../utils/ServerError");

/**
 * @description   Get all orders
 */
module.exports.getAllOrder = handleAsync(async (req, res) => {
    const orders = await Order.find({});
    return res.status(200).send(orders);
});


/**
 * @description   Create a new order
 */
module.exports.newOrder = handleAsync(async (req, res) => {
    console.log(req.body);
    const {
        name, 
        street,
        postalCode,
        city,
        meals
    } = req.body

    const user = { name, street ,postalCode, city }

    const order = new Order({
        user,
        meals
    });

    await order.save();

    return res.status(201).send({
        order
    });
});

/**
 * @description   Get one order
 */
module.exports.getOneOrder = handleAsync(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
        throw new ServerError("Order not found", 404);
    }
    return res.status(200).send({
        order
    });
});

/**
 * @description   Update one order
 */
module.exports.updateOneOrder = handleAsync(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });
    if (!order) {
        throw new ServerError("Order not found", 404);
    }
    return res.status(200).send({
        order
    });
});

/**
 * @description Delete one order
 */
module.exports.deleteOneOrder = handleAsync(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
        throw new ServerError("Order not found", 404);
    }
    return res.status(200).send({
        order
    });
});

/**
 * @description Delete all orders
 */
module.exports.deleteAllOrders = handleAsync(async (req, res)=>{
    await Order.deleteMany({});
    return res.status(200).send({
        message: "All orders deleted"
    });
});