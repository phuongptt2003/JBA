import { loginUser } from "../../api/user-api";
import { User } from "../../models/user";

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
        loginStore(state, action: PayloadAction<User>) {
            state.currentUser = action.payload;
        },
        logoutStore(state) {
            state.currentUser = null;
        },
        updateUserStore(state, action: PayloadAction<Partial<User>>) {
            if (state.currentUser) {
                state.currentUser = { ...state.currentUser, ...action.payload };
            }
        }
    },
});



export const { loginStore, logoutStore, updateUserStore } = userSlice.actions;
export default userSlice.reducer;
