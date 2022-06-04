/******* Local Storage Constants *******/
export const AUTHKEY = "SHINOBI_CONNECT_AUTH";

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
