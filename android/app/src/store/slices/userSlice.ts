import { loginUser } from "../../api/UserApi";
import { User } from "../../models/User";

interface UserState {
    currentUser: User | null;
}

const initialState: UserState = {
    currentUser: null,
};
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<User>) {
            state.currentUser = action.payload;
        },
        logout(state) {
            state.currentUser = null;
        },
        updateUser(state, action: PayloadAction<Partial<User>>) {
            if (state.currentUser) {
                state.currentUser = { ...state.currentUser, ...action.payload };
            }
        }
    },
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
