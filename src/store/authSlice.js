import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state,action) => {
            state.status = true;
            state.userData = action.payload.userData
        },
        logout: (state,action) => {
            state.status = false;
            state.userData = null
        }
    }
})

export const {login, logout} = authSlice.actions   // dont forget the .actions here. Earlier it caused an error

export default authSlice.reducer