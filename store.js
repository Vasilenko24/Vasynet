import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "../services/authAPI";
import authReducer from '../feautures/auth/authSlice';
import usersReducer from '../feautures/getUsers/getUsersSlice'
const store = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer,
        auth: authReducer,
        users: usersReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authAPI.middleware)

})


export default store