/******* Local Storage Constants *******/
export const AUTHKEY = "SHINOBI_CONNECT_AUTH";
export const THEMEKEY = "SHINOBI_CONNECT_THEME";

/******Toast Types Constants ******/
export const TOASTYPE = {
  Warn: "warn",
  Success: "success",
  Info: "info",
  Error: "error",
};

/*******Service Constants *******/
export const AUTHSERVICE = {
  LOGIN: "/api/auth/login",
  SIGNUP: "/api/auth/signup",
  UPDATE: "/api/users/edit",
};

export const USERSERVICE = {
  GETALLUSER: "/api/users",
  GETSINGLEUSER: "/api/users/id",
  GETUSERHANDLER: "/api/users/handler",
  BOOKMARK: "/api/users/bookmark",
  REMOVEBOOKMARK: "/api/users/remove-bookmark",
  FOLLOW: "/api/users/follow",
  UNFOLLOW: "/api/users/unfollow",
};

export const POSTSERVICE = {
  GETALLPOSTS: "/api/posts",
  EDITPOST: "/api/posts/edit",
  LIKEPOST: "/api/posts/like",
  DISLIKEPOST: "/api/posts/dislike",
};

export const COMMENTSERVICE = {
  GETCOMMENTS: "/api/comments",
  ADDCOMMENTS: "/api/comments/add",
  EDITCOMMENTS: "/api/comments/edit",
  DELETECOMMENTS: "/api/comments/delete",
  UPVOTECOMMENTS: "/api/comments/upvote",
  DOWNVOTECOMMENTS: "/api/comments/downvote",
};

export const SORTCOMMENTS = {
  MOST_RELEVANT: "Most Relevant",
  LEAST_RELEVANT: "Least Relevant",
};
