import { createSlice } from '@reduxjs/toolkit';

const UISlice = createSlice({
    name: 'UI',
    initialState: {
        cartInvisible: false,
        notification: null,
    },
    reducers: {
        toggle(state) {
            state.cartInvisible = !state.cartInvisible;
        },

        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            };
        },
    },
});

export const UIActions = UISlice.actions;

export default UISlice.reducer;
