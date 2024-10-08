import { createSlice } from "@reduxjs/toolkit"
import { authAPI } from "../../services/authAPI"

const initialState = {
    users: [],
    isLoading: false
}

const usersSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
        setUsers: (state, { payload }) => {
            state.users = payload
        },
        setLoading: (state) => {
            state.isLoading = true
        }
    }
})

export const { setUsers, setLoading } = usersSlice.actions
export default usersSlice.reducer