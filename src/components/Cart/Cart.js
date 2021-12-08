import classes from './Cart.module.css';
import { useContext, useState } from 'react';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmitForm, setDidSubmitFrom] = useState(false);

    const { items, totalAmount, addItem, removeItem, clearCart } = useContext(CartContext);

    const cartItemRemoveHandler = (id) => {
        removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        addItem({ ...item, amount: 1 });
    };

    const orderHanlder = () => {
        setIsCheckout(true);
    };

    const submitOrderhandler = async (user) => {
        setIsSubmitting(true);

        await fetch(
            'https://meal-react-d3321-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
            {
                method: 'POST',
                body: JSON.stringify({
                    user,
                    orderItems: items,
                }),
            }
        );

        setIsSubmitting(false);
        setDidSubmitFrom(true);
        clearCart();
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {items.map((item) => {
                return (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        amount={item.amount}
                        price={item.price}
                        onRemove={cartItemRemoveHandler.bind(null, item.id)}
                        onAdd={cartItemAddHandler.bind(null, item)}
                    ></CartItem>
                );
            })}
        </ul>
    );

    const ModalActions = (props) => {
        return (
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>
                    Đóng
                </button>
                {items.length > 0 && (
                    <button className={classes.button} onClick={orderHanlder}>
                        Đặt Hàng
                    </button>
                )}
            </div>
        );
    };

    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Tổng thanh toán</span>
                <span>{`$${totalAmount.toFixed(2)}`}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderhandler} onCancel={props.onClose} />}
            {!isCheckout && <ModalActions />}
        </>
    );

    const isSubmittingModal = <p>Đang Xác nhận...</p>;

    const didSubmit = (
        <>
            <p>Đã xác nhận</p>
            <div className={classes.actions}>
                <button className={classes['button']} onClick={props.onClose}>
                    Đóng
                </button>
            </div>
        </>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmitForm && cartModalContent}
            {isSubmitting && isSubmittingModal}
            {!isSubmitting && didSubmitForm && didSubmit}
        </Modal>
    );
};

export default Cart;
