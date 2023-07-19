import { createSlice } from "@reduxjs/toolkit";
import { getCount } from "./countActions";

const initialState = {
  loading: false,
  count: {},
  error: null,
};

const getCountSlice = createSlice({
  name: "count",
  initialState,
  reducers: {},
  extraReducers: {
    [getCount.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getCount.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.count = payload;
    },
    [getCount.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

//write selectors here

export default getCountSlice.reducer;
