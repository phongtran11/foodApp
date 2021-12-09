import { useDispatch, useSelector } from 'react-redux';
import { UIActions } from '../../store/UI-slice';

import classes from './CartButton.module.css';

const CartButton = (props) => {
    const dispatch = useDispatch();

    const quantity = useSelector((state) => state.cart.totalQuantity);
    console.log(quantity);
    const toggleHandler = () => {
        dispatch(UIActions.toggle());
    };

    return (
        <button onClick={toggleHandler} className={classes.button}>
            <span>My Cart</span>
            <span className={classes.badge}>{quantity}</span>
        </button>
    );
};

export default CartButton;
