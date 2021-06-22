import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchRiders = createAsyncThunk(
  'riders/fetchRiders',
  async (data, { getState }) => {
    const response = await fetch(`http://localhost:8080/items?_page=${data}&_limit=10`);
    return await response.json();
  }
)

export const ridersListSlice = createSlice({
  name: 'riders',
  initialState: {
    allRiders: [],
    loading: "idle",
    hasMoreRiders: true,
    error: "",

  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRiders.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      fetchRiders.fulfilled, (state, { payload }) => {
        if (payload.length < 10) state.hasMoreRiders = false;
        state.allRiders.push(...payload);
        state.loading = "loaded";
      });
    builder.addCase(
      fetchRiders.rejected, (state, action) => {
        state.loading = "error";
        state.error = action.error.message;
      });
  }
});

export default ridersListSlice;
