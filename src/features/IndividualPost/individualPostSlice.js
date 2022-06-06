import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ToastMessage } from "../../components";
import { getPostById } from "../../services/post.service";
import { TOASTYPE } from "../../utils/constants";

export const handleGetPostById = createAsyncThunk(
  "post/handleGetPostById",
  async ({ postId }, thunkApi) => {
    try {
      const response = await getPostById({ postId });
      return response.data;
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  post: {},
  isLoading: false,
};

const inidividualPostSlice = createSlice({
  name: "inidividualPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleGetPostById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleGetPostById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload?.post;
    });
    builder.addCase(handleGetPostById.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });
  },
});

export const inidividualPostReducer = inidividualPostSlice.reducer;
