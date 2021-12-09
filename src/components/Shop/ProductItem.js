import { useDispatch, useSelector } from 'react-redux';

import { cartActions } from '../../store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
    const { title, price, description, id } = props;

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    // const addHandler = () => {
    //     const newTotalQuantity = cart.totalQuantity + 1;

    //     const updatedItems = cart.items.slice();

    //     const existingItem = updatedItems.find((item) => item.id === id);

    //     if (existingItem) {
    //         const updatedItem = { ...existingItem };

    //         updatedItem.quantity++;
    //         updatedItem.price = updatedItem.price + price;

    //         const existingItemIndex = updatedItems.findIndex((item) => item.id === id);

    //         updatedItems[existingItemIndex] = updatedItem;
    //     } else {
    //         updatedItems.push({
    //             id,
    //             name: title,
    //             quantity: 1,
    //             totalPrice: price,
    //             price,
    //         });
    //     }

    //     const newCart = {
    //         totalQuantity: newTotalQuantity,
    //         items: updatedItems,
    //     };

    //     dispatch(cartActions.replaceCart(newCart));
    // };

    const addHandler = () => {
        dispatch(
            cartActions.addItemToCart({
                id,
                title,
                price,
            })
        );
    };

    return (
        <li className={classes.item}>
            <Card>
                <header>
                    <h3>{title}</h3>
                    <div className={classes.price}>${price.toFixed(2)}</div>
                </header>
                <p>{description}</p>
                <div className={classes.actions}>
                    <button onClick={addHandler}>Add to Cart</button>
                </div>
            </Card>
        </li>
    );
};

export default ProductItem;
