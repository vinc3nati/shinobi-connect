import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ToastMessage } from "../../components";
import { loginUser, signupUser, updateUser } from "../../services/auth.service";
import { postBookmark, removeBookmark } from "../../services/user.service";
import { AUTHKEY, TOASTYPE } from "../../utils/constants";

const initialState = {
  user: JSON.parse(localStorage.getItem(AUTHKEY))?.user,
  token: JSON.parse(localStorage.getItem(AUTHKEY))?.token,
  isLoading: false,
};

export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await loginUser({ username, password });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "Email/Username or Password is incorrect"
      );
    }
  }
);

export const handleSignup = createAsyncThunk(
  "auth/handleSignup",
  async ({ username, password, firstName, lastName }, thunkAPI) => {
    try {
      const response = await signupUser({
        username,
        password,
        firstName,
        lastName,
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        "User Already exist with entered credentials"
      );
    }
  }
);

export const handleUserUpdate = createAsyncThunk(
  "auth/handleUserUpdate",
  async ({ userData, token }, thunkAPI) => {
    try {
      const response = await updateUser({ userData, token });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Unable to update user, try again!");
    }
  }
);

export const handlePostBookmark = createAsyncThunk(
  "auth/handlePostBookmark",
  async ({ postId, token }, thunkAPI) => {
    try {
      const response = await postBookmark({ postId, token });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const handleRemoveBookmark = createAsyncThunk(
  "auth/handleRemoveBookmark",
  async ({ postId, token }, thunkAPI) => {
    try {
      const response = await removeBookmark({ postId, token });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state) => {
      localStorage.removeItem(AUTHKEY);
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.foundUser;
      state.token = action.payload.encodedToken;
      delete action.payload.foundUser.password;
      localStorage.setItem(
        AUTHKEY,
        JSON.stringify({
          user: action.payload.foundUser,
          token: action.payload.encodedToken,
        })
      );
    });
    builder.addCase(handleLogin.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });

    builder.addCase(handleSignup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleSignup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.createdUser;
      state.token = action.payload.encodedToken;
      delete action.payload.createdUser.password;
      localStorage.setItem(
        AUTHKEY,
        JSON.stringify({
          user: action.payload.createdUser,
          token: action.payload.encodedToken,
        })
      );
    });
    builder.addCase(handleSignup.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });

    builder.addCase(handlePostBookmark.pending, (_) => {});
    builder.addCase(handlePostBookmark.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      const newUser = { ...state.user, bookmarks: action.payload.bookmarks };
      state.user = newUser;
      localStorage.setItem(
        AUTHKEY,
        JSON.stringify({
          token: state.token,
          user: newUser,
        })
      );
      ToastMessage("Post Bookmarked!", TOASTYPE.Success);
    });
    builder.addCase(handlePostBookmark.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });

    builder.addCase(handleRemoveBookmark.pending, (_) => {});
    builder.addCase(handleRemoveBookmark.fulfilled, (state, action) => {
      state.isLoading = false;
      const newUser = { ...state.user, bookmarks: action.payload.bookmarks };
      state.user = newUser;
      localStorage.setItem(
        AUTHKEY,
        JSON.stringify({
          token: state.token,
          user: newUser,
        })
      );
      ToastMessage("Removed Bookmark!", TOASTYPE.Success);
    });
    builder.addCase(handleRemoveBookmark.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });
  },
});

export const { handleLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;
