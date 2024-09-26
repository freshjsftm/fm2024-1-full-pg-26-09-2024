import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async ({ page, results }, thunkAPI) => {
    try {
      const data = await fetch(
        `http://localhost:3000/users?page=${page}&amount=${results}`
      ).then((response) => response.json());
      return data.results;
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
