import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/Auth";
import { postReducer, userReducer } from "../features/Feed";
import { inidividualPostReducer } from "../features/IndividualPost";
import { postModalReducer } from "../features/PostModal";
import { themeReducer } from "../features/Theme";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    theme: themeReducer,
    postModal: postModalReducer,
    posts: postReducer,
    inidividualPost: inidividualPostReducer,
  },
});
