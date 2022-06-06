import axios from "axios";
import { POSTSERVICE } from "../utils/constants";

export const getAllPost = async () => await axios.get(POSTSERVICE.GETALLPOSTS);

export const getAllPostOfUser = async ({ username }) =>
  await axios.get(`${POSTSERVICE.GETALLPOSTS}/user/${username}`);

export const getPostById = async ({ postId }) =>
  await axios.get(`${POSTSERVICE.GETALLPOSTS}/${postId}`);

export const getPostByObserver = async ({ limit, page }) =>
  await axios.get(`${POSTSERVICE.GETALLPOSTS}/${limit}/${page}`);

export const addPost = async ({ postData, token }) =>
  await axios.post(
    POSTSERVICE.GETALLPOSTS,
    { postData },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const editPost = async ({ postData, token }) =>
  await axios.post(
    `${POSTSERVICE.EDITPOST}/${postData._id}`,
    { postData },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deletePost = async ({ postId, token }) =>
  await axios.delete(`${POSTSERVICE.GETALLPOSTS}/${postId}`, {
    headers: {
      authorization: token,
    },
  });

export const likePost = async ({ postId, token }) =>
  await axios.post(
    `${POSTSERVICE.LIKEPOST}/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const dislikePost = async ({ postId, token }) =>
  await axios.post(
    `${POSTSERVICE.DISLIKEPOST}/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
