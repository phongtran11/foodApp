import { UIActions } from './UI-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://cart-b2ed3-default-rtdb.firebaseio.com/cart.json'
            );

            if (!response.ok) {
                throw new Error('Could not reach data');
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();

            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity,
                })
            );
        } catch (error) {
            dispatch(
                UIActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching Cart Data Failed',
                })
            );
        }
    };
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            UIActions.showNotification({
                status: 'pendding',
                title: 'Sending',
                message: 'Sending Cart Data',
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                'https://cart-b2ed3-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify(cart),
                }
            );

            if (!response.ok) {
                throw new Error('Sending Data Failed');
            }
        };

        try {
            await sendRequest();

            dispatch(
                UIActions.showNotification({
                    status: 'success',
                    title: 'Success',
                    message: 'Sent Cart Data Success',
                })
            );
        } catch (error) {
            dispatch(
                UIActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending Cart Data Failed',
                })
            );
        }
    };
};
