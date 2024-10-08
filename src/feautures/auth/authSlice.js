import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authAPI } from "../../services/authAPI";

// interface AuthSlice {
//     user: User | null,
//     isAuthenticated: boolean
// }
const initialState = {
    user: null,
    isAuthenticated: false,
};

// interface AuthPayload {
//     user: User,
//     accessToken?: string
// }
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            // payload должен содержать поля user и accessToken
            state.user = payload.user;
            state.isAuthenticated = true;
            if (payload.accessToken) {
                localStorage.setItem('accessToken', payload.accessToken);
            }
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('accessToken');
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authAPI.endpoints.loginUser.matchFulfilled,
            (state, { payload }) => {
                state.user = payload.user;  // Убедись, что payload содержит user
                state.isAuthenticated = true;
                localStorage.setItem('accessToken', payload.accessToken);
            }
        );
        builder.addMatcher(
            authAPI.endpoints.refreshToken.matchFulfilled,
            (state, { payload }) => {
                localStorage.setItem('accessToken', payload.accessToken);
            }
        );
    }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;