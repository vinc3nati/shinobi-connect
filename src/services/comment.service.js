import axios from "axios";
import { COMMENTSERVICE } from "../utils/constants";

export const getCommentsByPostId = async ({ postId }) =>
  await axios.get(`${COMMENTSERVICE.GETCOMMENTS}/${postId}`);

export const addCommentsByPostId = async ({ postId, commentData, token }) =>
  await axios.post(
    `${COMMENTSERVICE.ADDCOMMENTS}/${postId}`,
    { commentData },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const editComment = async ({ postId, commentId, commentData, token }) =>
  await axios.post(
    `${COMMENTSERVICE.EDITCOMMENTS}/${postId}/${commentId}`,
    { commentData },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deleteComment = async ({ postId, commentId, token }) =>
  await axios.post(
    `${COMMENTSERVICE.DELETECOMMENTS}/${postId}/${commentId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

export const upvoteComment = async ({ postId, commentId, token }) =>
  await axios.post(
    `${COMMENTSERVICE.UPVOTECOMMENTS}/${postId}/${commentId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
