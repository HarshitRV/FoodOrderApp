import React from "react";
import Card from "../UI/Card/Card";
import MealItem from "./MealItem/MealItem";
import { DUMMY_MEALS } from "../../sample/sample.data";

const AvailableMeals = props => {
    const mealList = DUMMY_MEALS.map((meal, index) => (
        <MealItem 
            key={index}
            id={meal.id}
            mealTitle={meal.title}
            mealDescription={meal.description}
            mealCost={meal.price}
        />
    ));
    return (
        <section>
            <Card>
                <ul className="list-group list-group-flush">
                    {mealList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;