import axios from "axios";
import { USERSERVICE } from "../utils/constants";

export const getAllUsers = async () => axios.get(USERSERVICE.GETALLUSER);

export const getUserById = async (userId) =>
  axios.get(`${USERSERVICE.GETSINGLEUSER}/${userId}`);

export const getUserByHandler = async (userHandler) =>
  axios.get(`${USERSERVICE.GETUSERHANDLER}/${userHandler}`);

export const getBookmarks = async ({ token }) =>
  axios.get(USERSERVICE.BOOKMARK, {
    headers: {
      authorization: token,
    },
  });

export const postBookmark = async ({ postId, token }) =>
  axios.post(
    `${USERSERVICE.BOOKMARK}/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const removeBookmark = async ({ postId, token }) =>
  axios.post(`${USERSERVICE.REMOVEBOOKMARK}/${postId}`, {
    headers: {
      authorization: token,
    },
  });

export const followUser = async ({ userId, token }) =>
  axios.post(
    `${USERSERVICE.FOLLOW}/${userId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const unFollowUser = async ({ userId, token }) =>
  axios.post(
    `${USERSERVICE.UNFOLLOW}/${userId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
