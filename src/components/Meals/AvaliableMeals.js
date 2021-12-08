import { useEffect, useState } from 'react';

import classes from './AvailableMeals.module.css';
import Cart from '../UI/Cart';
import MealItem from './MealItem/MealItem';

const AvaliableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(
                'https://meal-react-d3321-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
            );

            if (!response.ok) {
                throw new Error('Đã có lỗi xảy ra');
            }

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoading) {
        return (
            <section class={classes['meals-loading']}>
                <p>Loading...</p>
            </section>
        );
    }

    if (httpError) {
        return (
            <section className={classes['meals-error']}>
                <p>{httpError}</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => {
        return (
            <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        );
    });

    return (
        <section className={classes.meals}>
            <Cart>
                <ul>{mealsList}</ul>
            </Cart>
        </section>
    );
};

export default AvaliableMeals;
