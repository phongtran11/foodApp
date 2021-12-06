import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartBtn.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartBtn = (props) => {
    const { items } = useContext(CartContext);

    const [btnHightlighted, setBtnHightlighted] = useState(false);

    const numberOfCartItems = items.reduce((current, item) => {
        return current + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnHightlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
        }

        setBtnHightlighted(true);

        const timer = setTimeout(() => {
            setBtnHightlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartBtn;
