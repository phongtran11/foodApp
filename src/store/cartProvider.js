import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCart = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updateTotalAmount = state.totalAmount + action.item.amount * action.item.price;
        const existingCartItemIndex = state.items.findIndex((item) => {
            return item.id === action.item.id;
        });
        const existingCartItem = state.items[existingCartItemIndex];
        let updateItems;

        if (existingCartItem) {
            const updateItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };
            updateItems = [...state.items];
            updateItems[existingCartItemIndex] = updateItem;
        } else {
            updateItems = [...state.items, action.item];
        }
        return {
            items: updateItems,
            totalAmount: updateTotalAmount,
        };
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

        const existingItem = state.items[existingCartItemIndex];
        const updateTotalAmount = state.totalAmount - existingItem.price;
        let updateItems;

        if (existingItem.amount === 1) {
            updateItems = state.items.filter((item) => {
                return item.id !== action.id;
            });
        } else {
            const updateItem = { ...existingItem, amount: existingItem.amount - 1 };
            updateItems = [...state.items];
            updateItems[existingCartItemIndex] = updateItem;
        }
        return {
            items: updateItems,
            totalAmount: updateTotalAmount,
        };
    }

    return defaultCart;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCart);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    };
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
