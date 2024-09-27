import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers, postUser, getOneUser, delOneUser } from '../api';
import { decorateAsyncThunk, pendingReducer, rejectedReducer } from './helpers';

export const createUser = decorateAsyncThunk({
  type: 'users/createUser',
  asyncThunk: postUser,
});

export const getUsers = decorateAsyncThunk({
  type: 'users/getUsers',
  asyncThunk: getAllUsers,
});

export const getUser = decorateAsyncThunk({
  type: 'users/getUser',
  asyncThunk: getOneUser,
});

export const deleteUser = decorateAsyncThunk({
  type: 'users/deleteUser',
  asyncThunk: delOneUser,
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    error: null,
    isPending: false,
    userCurrent: null,
    userAuth: null,
  },
  reducers: {
    //sort
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, pendingReducer);
    builder.addCase(getUsers.pending, pendingReducer);
    builder.addCase(getUser.pending, pendingReducer);
    builder.addCase(deleteUser.pending, pendingReducer);

    builder.addCase(createUser.rejected, rejectedReducer);
    builder.addCase(getUsers.rejected, rejectedReducer);
    builder.addCase(getUser.rejected, rejectedReducer);
    builder.addCase(deleteUser.rejected, rejectedReducer);

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.error = null;
      state.users = state.users.filter((user)=>user.id !== action.payload.id);
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.error = null;
      state.userAuth = action.payload;
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isPending = false;
      state.error = null;
      state.users = action.payload;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.error = null;
      state.userCurrent = action.payload;
    });
  },
});

export default usersSlice.reducer;
