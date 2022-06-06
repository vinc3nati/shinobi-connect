import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ToastMessage } from "../../components";
import {
  followUser,
  unFollowUser,
  getAllUsers,
} from "../../services/user.service";
import { TOASTYPE } from "../../utils/constants";

const initialState = {
  allUsers: [],
  isLoading: false,
};

export const handleGetAllUsers = createAsyncThunk(
  "users/handleGetAllUsers",
  async (_, thunkApi) => {
    try {
      const response = await getAllUsers();
      return response.data.users;
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const handleFollowUser = createAsyncThunk(
  "users/handleFollowUser",
  async ({ userId, token, dispatch, handleUserUpdate }, thunkApi) => {
    try {
      const response = await followUser({ token, userId });
      dispatch(handleUserUpdate({ userData: response.data.user, token }));
      return response.data;
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const handleUnFollowUser = createAsyncThunk(
  "users/handleUnFollowUser",
  async ({ userId, token, dispatch, handleUserUpdate }, thunkApi) => {
    try {
      const response = await unFollowUser({ userId, token });
      dispatch(handleUserUpdate({ userData: response.data.user, token }));
      return response.data;
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleGetAllUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleGetAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload;
    });
    builder.addCase(handleGetAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });

    builder.addCase(handleFollowUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleFollowUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload.allUsers;
    });
    builder.addCase(handleFollowUser.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });

    builder.addCase(handleUnFollowUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleUnFollowUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload.allUsers;
    });
    builder.addCase(handleUnFollowUser.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });
  },
});

export const userReducer = userSlice.reducer;
