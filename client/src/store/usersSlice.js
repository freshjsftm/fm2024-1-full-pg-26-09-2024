import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers, postUser } from '../api';

export const createUser = createAsyncThunk(
  'users/createUser',
  async (values, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await postUser(values);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async ({ page, amount }, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await getAllUsers({ page, amount });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    error: null,
    isPending: false,
  },
  reducers: {
    //sort
  },
  extraReducers: (builder) => {
    //eslint-disable-next-line
    builder.addCase(createUser.pending, (state, action) => {
      state.isPending = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.users.push(action.payload);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.payload;
    });
    //eslint-disable-next-line
    builder.addCase(getUsers.pending, (state, action) => {
      state.isPending = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isPending = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.payload;
    });
  },
});

export default usersSlice.reducer;
