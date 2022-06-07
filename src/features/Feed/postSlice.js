import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ToastMessage } from "../../components";
import {
  addCommentsByPostId,
  deleteComment,
  editComment,
  upvoteComment,
} from "../../services/comment.service";
import {
  addPost,
  deletePost,
  dislikePost,
  editPost,
  getAllPost,
  getPostByObserver,
  likePost,
} from "../../services/post.service";
import { TOASTYPE } from "../../utils/constants";

export const handleGetAllPosts = createAsyncThunk(
  "posts/handleGetAllPosts",
  async (_, thunkApi) => {
    try {
      const response = await getAllPost();
      return response.data.posts;
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const handleGetAllPostsByObserver = createAsyncThunk(
  "posts/handleGetAllPostsByObserver",
  async ({ limit, page }, thunkApi) => {
    try {
      const response = await getPostByObserver({ limit, page });
      return response.data.posts;
    } catch (err) {
      thunkApi.rejectWithValue(err.response);
    }
  }
);

export const handleAddPost = createAsyncThunk(
  "posts/handleAddPost",
  async ({ postData, token }, thunkApi) => {
    try {
      const response = await addPost({ postData, token });
      return response.data.posts;
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const handleEditPost = createAsyncThunk(
  "posts/handleEditPost",
  async ({ postData, token }, thunkApi) => {
    try {
      const response = await editPost({ postData, token });
      return response.data.posts;
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const handleDeletePost = createAsyncThunk(
  "posts/handleDeletePost",
  async ({ postId, token }, thunkApi) => {
    try {
      const response = await deletePost({ postId, token });
      return response.data.posts;
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const handleLikePost = createAsyncThunk(
  "posts/handleLikePost",
  async ({ postId, token }, thunkApi) => {
    try {
      const response = await likePost({ postId, token });
      return response.data.posts;
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const handleDislikePost = createAsyncThunk(
  "posts/handleDislikePost",
  async ({ postId, token }, thunkApi) => {
    try {
      const response = await dislikePost({ postId, token });
      return response.data.posts;
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const handleAddComment = createAsyncThunk(
  "posts/handleAddComment",
  async ({ postId, commentData, token }, thunkApi) => {
    try {
      const response = await addCommentsByPostId({
        postId,
        commentData,
        token,
      });
      return response.data.posts;
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const handleEditComment = createAsyncThunk(
  "posts/handleEditComment",
  async ({ postId, commentId, commentData, token }, thunkApi) => {
    try {
      const response = await editComment({
        postId,
        commentId,
        commentData,
        token,
      });
      return response.data.posts;
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const handleDeleteComment = createAsyncThunk(
  "posts/handleDeleteComment",
  async ({ postId, commentId, token }, thunkApi) => {
    try {
      const response = await deleteComment({ postId, commentId, token });
      return response.data.posts;
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const handleLikeComment = createAsyncThunk(
  "posts/handleLikeComment",
  async ({ postId, commentId, token }, thunkApi) => {
    try {
      const response = await upvoteComment({ postId, commentId, token });
      return response.data.posts;
    } catch (err) {
      thunkApi.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  allPosts: [],
  userPosts: [],
  isLoading: false,
  isLoadingMoreData: false,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(handleGetAllPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleGetAllPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
    });
    builder.addCase(handleGetAllPosts.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });

    builder.addCase(handleGetAllPostsByObserver.pending, (state) => {
      state.isLoadingMoreData = true;
    });
    builder.addCase(handleGetAllPostsByObserver.fulfilled, (state, action) => {
      state.isLoadingMoreData = false;
      state.allPosts = action.payload;
    });
    builder.addCase(handleGetAllPostsByObserver.rejected, (state, action) => {
      state.isLoadingMoreData = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });

    builder.addCase(handleAddPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleAddPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
      ToastMessage("Post updated to feed", TOASTYPE.Success);
    });
    builder.addCase(handleAddPost.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });

    builder.addCase(handleEditPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleEditPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
      ToastMessage("Post update successfully", TOASTYPE.Success);
    });
    builder.addCase(handleEditPost.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });

    builder.addCase(handleDeletePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleDeletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
      ToastMessage("Post deleted successfully", TOASTYPE.Success);
    });
    builder.addCase(handleDeletePost.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });

    builder.addCase(handleLikePost.pending, () => {});
    builder.addCase(handleLikePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
    });
    builder.addCase(handleLikePost.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });

    builder.addCase(handleDislikePost.pending, () => {});
    builder.addCase(handleDislikePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
    });
    builder.addCase(handleDislikePost.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });

    builder.addCase(handleAddComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleAddComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
    });
    builder.addCase(handleAddComment.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });

    builder.addCase(handleEditComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleEditComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
    });
    builder.addCase(handleEditComment.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });

    builder.addCase(handleDeleteComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleDeleteComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
    });
    builder.addCase(handleDeleteComment.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });

    builder.addCase(handleLikeComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleLikeComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
    });
    builder.addCase(handleLikeComment.rejected, (state, action) => {
      state.isLoading = false;
      ToastMessage(action.payload, TOASTYPE.Error);
    });
  },
});

export const postReducer = postSlice.reducer;
