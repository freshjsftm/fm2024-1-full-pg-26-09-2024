import { createSlice } from '@reduxjs/toolkit';
import { getAllTasks } from '../api';
import { decorateAsyncThunk, pendingReducer, rejectedReducer } from './helpers';

export const getTasks = decorateAsyncThunk({
  type: 'tasks/getTasks',
  asyncThunk: getAllTasks,
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    error: null,
    isPending: false,
    taskCurrent: null,
  },
  reducers: {
    //sort
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, pendingReducer);

    builder.addCase(getTasks.rejected, rejectedReducer);

    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isPending = false;
      state.error = null;
      state.tasks = action.payload;
    });
  },
});

export default tasksSlice.reducer;
