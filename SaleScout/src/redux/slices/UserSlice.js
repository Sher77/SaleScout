import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isLoggedIn: false,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    clearState: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, setIsLoggedIn, clearState } = UserSlice.actions;

export default UserSlice.reducer;
