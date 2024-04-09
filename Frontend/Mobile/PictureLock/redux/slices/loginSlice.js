import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    status: false
}

export const loginSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload,
            state.status = true
        },
        logUserOut: (state) => {
            state.user = [],
            state.status = false
        },
    },
})

export const { setUser, logUserOut } = loginSlice.actions

export default loginSlice.reducer