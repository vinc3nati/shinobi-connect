import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import {
  handleDeleteComment,
  handleEditComment,
  handleLikeComment,
} from "../../features/Feed/postSlice";
import { ToastMessage } from "../ToastMessage/ToastMessage";
import { TOASTYPE } from "../../utils/constants";
import { v4 as uuid } from "uuid";

export const CommentCard = ({ comment }) => {
  const { user: currUser, token } = useSelector((store) => store.auth);
  const { allPosts } = useSelector((store) => store.posts);

  const { _id, content, user, postId, votes, replies } = comment;

  const [showMenu, setShowMenu] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [edittedComment, setEdittedComment] = useState(content || "");
  const [reply, setRepy] = useState("");
  const [showReply, setShowReply] = useState(false);

  const commentRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLiked = votes.upvotedBy.some((vtUser) => vtUser._id === currUser._id);

  useOnClickOutside(commentRef, () => setShowMenu(false));
  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex w-full items-center gap-3">
          <img
            onClick={() => navigate(`/profile/${user.userHandler}`)}
            className="cursor-pointer rounded-full object-cover w-10 h-10 mt-1"
            src={user.pic}
            alt="comment profile"
          />
          <p
            onClick={() => navigate(`/profile/${user.userHandler}`)}
            className="cursor-pointer font-normal"
          >{`${user.firstName} ${user.lastName}`}</p>
          <div className="ml-auto relative">
            {(currUser._id === user._id ||
              allPosts.find((item) => item._id === postId)?.userId ===
                currUser._id) && (
              <BsThreeDotsVertical
                className="cursor-pointer text-sm text-dark-txt-color-secondary font-bold"
                onClick={() => {
                  setShowMenu(true);
                }}
              />
            )}
            {showMenu && (
              <div ref={commentRef} className="absolute right-0">
                <div className="w-24 text-txt-secondary-color dark:text-dark-txt-color-secondary bg-secondary-background dark:bg-dark-background rounded">
                  {currUser._id === user._id && (
                    <button
                      onClick={() => {
                        setIsEditMode(true);
                        setShowMenu(false);
                      }}
                      className="flex gap-1 items-center w-full px-2.5 py-1.5 text-sm font-medium rounded hover:text-blue-700 focus:z-10   focus:text-blue-700"
                    >
                      <FaEdit />
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => {
                      dispatch(
                        handleDeleteComment({ postId, commentId: _id, token })
                      );
                      setShowMenu(false);
                    }}
                    className="flex gap-1 items-center w-full px-2.5 py-1.5 text-sm font-medium rounded text-red-500 hover:text-red-500 focus:z-10 focus:text-red-600"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 px-3">
          {!isEditMode ? (
            <p className='font-light text-lg text-"dark-txt-color-secondary'>
              {content}
            </p>
          ) : (
            <div className="w-full flex flex-col gap-2 ">
              <input
                className="w-full bg-background dark:bg-dark-background dark:text-dark-txt-color-secondary mt-1 border border-txt-hover-color  active:outline-none focus:outline-none rounded py-0.5 px-3"
                value={edittedComment}
                type="text"
                onChange={(e) => setEdittedComment(e.target.value)}
              />
              <div className="flex gap-1 ml-auto">
                <button
                  onClick={() => setIsEditMode(false)}
                  className="text-white bg-error focus:outline-none rounded text-sm px-4 py-1 text-center"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (edittedComment === "") {
                      ToastMessage(
                        "Please write something in the comment",
                        TOASTYPE.Info
                      );
                      return;
                    }
                    dispatch(
                      handleEditComment({
                        postId,
                        commentId: _id,
                        commentData: { ...comment, content: edittedComment },
                        token,
                      })
                    );
                    setIsEditMode(false);
                  }}
                  className="text-white bg-info focus:outline-none rounded text-sm px-4 py-1 text-center"
                >
                  Update
                </button>
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <div
              className="flex gap-1 items-center text-primary"
              onClick={() =>
                dispatch(handleLikeComment({ postId, commentId: _id, token }))
              }
            >
              {isLiked ? <AiFillLike /> : <AiOutlineLike />}
              {votes.upvotedBy.length > 0 && (
                <span>{votes.upvotedBy.length}</span>
              )}
            </div>
            <p
              onClick={() => setShowReply(true)}
              className="font-light text-primary cursor-pointer"
            >
              Reply
            </p>
          </div>
          {showReply && (
            <div className="w-full flex flex-col gap-2">
              <input
                value={reply}
                placeholder="Enter your Reply"
                className="w-full bg-background dark:text-dark-txt-color-secondary dark:bg-dark-background mt-1 border border-txt-hover-color  active:outline-none focus:outline-none rounded-md py-0.5 px-3"
                type="text"
                onChange={(e) => setRepy(e.target.value)}
              />
              <div className="flex gap-1 ml-auto">
                <button
                  onClick={() => {
                    setRepy("");
                    setShowReply(false);
                  }}
                  className="text-white bg-error focus:outline-none rounded text-sm px-4 py-1 text-center"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (reply === "") {
                      ToastMessage(
                        "Please write something in the comment",
                        TOASTYPE.Info
                      );
                      return;
                    }
                    dispatch(
                      handleEditComment({
                        postId,
                        commentId: _id,
                        commentData: {
                          ...comment,
                          replies: comment.replies.concat({
                            _id: uuid(),
                            user: currUser,
                            content: reply,
                          }),
                        },
                        token,
                      })
                    );
                    setRepy("");
                    setShowReply(false);
                  }}
                  className="text-white bg-info focus:outline-none rounded text-sm px-4 py-1 text-center"
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {replies.map((item) => (
        <div key={item._id} className="flex gap-4 flex-grow pl-12">
          <img
            className="rounded-full object-cover w-9 h-9 mt-1"
            src={item.user.pic}
            alt="comment profile"
          />
          <div>
            <p className="font-normal">{`${item.user.firstName} ${item.user.lastName}`}</p>
            <p className="font-light text-dark-txt-color-secondary">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
