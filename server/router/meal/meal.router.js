const { Router } = require("express");

// Cotrollers
const { addMeal, getAllMeals } = require("../../controller/meal/meal.controller");


const mealRouter = Router();

mealRouter.route("/meals").get(getAllMeals);

mealRouter.route("/meal/add").post(addMeal);

mealRouter.route("/meal:id").get((req, res)=>{});

module.exports = mealRouter;