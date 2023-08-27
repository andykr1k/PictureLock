import { configureStore } from "@reduxjs/toolkit";
import userStateReducer from './slices/loginSlice'

export const store = configureStore({
    reducer: {
        userState: userStateReducer
    },
})