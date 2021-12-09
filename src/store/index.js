import { configureStore } from '@reduxjs/toolkit';

import UIReducer from './UI-slice';
import cartReducer from './cart-slice';

const store = configureStore({
    reducer: {
        UI: UIReducer,
        cart: cartReducer,
    },
});

export default store;
