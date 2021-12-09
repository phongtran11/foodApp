import { createSlice } from '@reduxjs/toolkit';

const UISlice = createSlice({
    name: 'UI',
    initialState: {
        cartInvisible: false,
    },
    reducers: {
        toggle(state) {
            state.cartInvisible = !state.cartInvisible;
        },
    },
});

export const UIActions = UISlice.actions;

export default UISlice.reducer;
