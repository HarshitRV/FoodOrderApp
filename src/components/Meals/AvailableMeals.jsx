import React, { useEffect } from "react";

/**
 * Custom Hooks
 */
import useHttp from "../../hooks/use-http";

/**
 * Components
 */
import Card from "../UI/Card/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = props => {
    const { 
        sendRequest: fetchMeals,
        items: meals,
        isLoading,
        httpError
    } = useHttp();

    useEffect(()=>{
        fetchMeals("http://localhost:3001/meals");
    }, [fetchMeals])
    

    const mealList = meals.map((meal, index) => (
        <MealItem 
            key={index}
            id={meal._id}
            mealTitle={meal.title}
            mealDescription={meal.description}
            mealCost={meal.price}
        />
    ));

    return (
        <section className="mb-3">
            <Card>
                <ul className="list-group list-group-flush">
                    {isLoading && "Loading..."}
                    {httpError}
                    {!isLoading && !httpError && mealList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;