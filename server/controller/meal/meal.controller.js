// Models
const Meal = require("../../model/meals.model");
const Order = require("../../model/order.model");

// Utils
const handleAsync = require("../../utils/handleAync");
const ServerError = require("../../utils/ServerError");

/**
 * @description Get all meal
 */
module.exports.getAllMeals = handleAsync(async (req, res, next) => {
    const meals = await Meal.find({});
    res.status(200).send(meals);
});

/**
 * @description Add a meal
 */
module.exports.addMeal = handleAsync(async (req, res) => {
    const meal = new Meal(req.body);
    await meal.save();
    return res.status(201).send(meal);
});