import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {
    const cartInvisible = useSelector((state) => state.UI.cartInvisible);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.UI.notification);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        if (cart.change) {
            dispatch(sendCartData(cart));
        }
    }, [cart, dispatch]);

    return (
        <>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            <Layout>
                {cartInvisible && <Cart />}
                <Products />
            </Layout>
        </>
    );
}

export default App;
