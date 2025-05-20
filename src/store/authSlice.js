// this is just to confirm whether user is authenticated or not
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false, //user is not authenticated yet
    userData: null // user data is null yet in initial state
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData
        },
        logout: (state, action) => {
            state.status = false
            state.userData = null
        }
    }
})
 
export const { login, logout } = authSlice.actions // destructiring actions to be used somewhere else in App (action is basically login & logout)

export default authSlice.reducer // exporting reducer function to use in store