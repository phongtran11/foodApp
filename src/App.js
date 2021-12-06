import { useState } from 'react';

import './App.css';

import CartProvider from './store/cartProvider';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

function App() {
    const [cartIsShow, setCartIsShow] = useState(false);

    const showCartHandler = () => {
        setCartIsShow(true);
    };
    const hideCartHandler = () => {
        setCartIsShow(false);
    };

    return (
        <>
            <CartProvider>
                {cartIsShow && <Cart onClose={hideCartHandler} />}
                <Header onShowCart={showCartHandler} />
                <main>
                    <Meals />
                </main>
            </CartProvider>
        </>
    );
}

export default App;
