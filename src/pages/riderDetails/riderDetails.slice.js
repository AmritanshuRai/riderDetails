import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const fetchRidersDetail = createAsyncThunk(
  'ridersDetail/fetchRidersDetail',
  async (id, { getState }) => {
    const response = await fetch(`http://localhost:8080/items/${id}`);
    return await response.json();
  }
)
export const postRating = createAsyncThunk(
  "ridersDetail/postRating",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success(`Successfully posted`);
      return await response.json();
    } catch (err) {
      toast.error("error occured");
      return rejectWithValue(err.message)
    }
  }
);

export const ridersDetailsSlice = createSlice({
  name: 'ridersDetail',
  initialState: {
    ridersDetail: {},
    loading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRidersDetail.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      fetchRidersDetail.fulfilled, (state, { payload }) => {
        state.ridersDetail = payload;
        state.loading = "loaded";
      });
    builder.addCase(
      fetchRidersDetail.rejected, (state, action) => {
        state.loading = "error";
        state.error = action.error.message;
      });
  }
});

export default ridersDetailsSlice;
