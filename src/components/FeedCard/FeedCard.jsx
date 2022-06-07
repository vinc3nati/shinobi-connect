import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BsThreeDotsVertical,
  BsShareFill,
  BsChat,
  BsBookmark,
  BsBookmarkFill,
} from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { getUserById } from "../../services/user.service";
import { TOASTYPE } from "../../utils/constants";
import { ToastMessage } from "../ToastMessage/ToastMessage";
import { openPostModal } from "../../features/PostModal/postModalSlice";
import {
  handleAddComment,
  handleDeletePost,
  handleDislikePost,
  handleLikePost,
} from "../../features/Feed/postSlice";
import { CommentCard } from "../CommentCard/CommentCard";
import { handlePostBookmark, handleRemoveBookmark } from "../../features/Auth";

export const FeedCard = ({ postData, isIndividualPostPage }) => {
  const { _id, content, createdAt, likes, pic, userId, comments } = postData;
  const { user: currUser, token } = useSelector((store) => store.auth);

  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const menuRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLiked = likes.likedBy.some((item) => item._id === currUser._id);
  const isBookMarked = currUser.bookmarks.some((item) => item === _id);

  useOnClickOutside(menuRef, () => setShowMenu(false));

  useEffect(() => {
    (async () => {
      try {
        const response = await getUserById({ userId });
        if (response.data) {
          setUser(response.data.user);
        }
      } catch (err) {
        ToastMessage(err.response.data, TOASTYPE.Error);
      }
    })();
  }, [userId]);

  return (
    <>
      {user && (
        <div className="flex flex-col gap-4 bg-nav-background dark:bg-dark-background-secondary dark:text-dark-txt-color rounded p-5">
          <div className="flex gap-4 grow">
            <img
              onClick={() => navigate(`/profile/${user?.userHandler}`)}
              className="cursor-pointer rounded-full w-14 h-14 object-cover"
              src={currUser._id === userId ? currUser?.pic : user?.pic}
              alt="post profile"
            />
            <div className="flex justify-between grow">
              <div className="flex flex-col">
                <p
                  onClick={() => navigate(`/profile/${user?.userHandler}`)}
                  className="text-xl cursor-pointer"
                >{`${user?.firstName} ${user?.lastName}`}</p>
                <p className="text-xs dark:text-dark-txt-color-secondary text-txt-color-hover">
                  {new Date(createdAt).toDateString()}
                </p>
              </div>
              {user._id === currUser._id && !isIndividualPostPage && (
                <div className="relative">
                  <BsThreeDotsVertical
                    className="text-xl cursor-pointer"
                    onClick={() => setShowMenu((prev) => !prev)}
                  />
                  {showMenu && (
                    <div
                      ref={menuRef}
                      className="w-40 absolute right-0 text-grey-dark-2 dark:text-dark-txt-color-secondary bg-secondary-background dark:bg-dark-background border-gray-200 dark:border-none rounded"
                    >
                      <button
                        type="button"
                        className="relative flex gap-2 items-center w-full px-4 py-2 text-sm font-medium rounded hover:text-blue-700 focus:z-10 focus:text-blue-700"
                        onClick={() => dispatch(openPostModal(postData))}
                      >
                        <FaEdit />
                        Edit
                      </button>
                      <button
                        type="button"
                        className="relative flex gap-2 items-center w-full px-4 py-2 text-sm font-medium rounded hover:text-red-500 focus:z-10 focus:text-red-700"
                        onClick={() => {
                          dispatch(handleDeletePost({ postId: _id, token }));
                          if (isIndividualPostPage) navigate("/");
                        }}
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => navigate(`/post/${_id}`)}
            className="cursor-pointer flex flex-col gap-6 grow"
          >
            <p className="px-4">{content}</p>
            {pic && (
              <img
                className="rounded max-h-96 w-full object-contain"
                src={pic}
                alt="post fig"
              />
            )}
          </div>
          <div className="flex gap-4 sm:gap-2 grow py-1 items-center justify-evenly font-normal text-dark-txt-color-secondary">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() =>
                isLiked
                  ? dispatch(handleDislikePost({ postId: _id, token }))
                  : dispatch(handleLikePost({ postId: _id, token }))
              }
            >
              {isLiked ? (
                <AiFillLike className="text-primary" />
              ) : (
                <AiOutlineLike />
              )}
              {isLiked && <span>{likes.likedBy.length}</span>}
            </div>
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => {
                if (!isIndividualPostPage) navigate(`/post/${_id}`);
              }}
            >
              <BsChat />
              <span>{comments?.length}</span>
            </div>
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() =>
                isBookMarked
                  ? dispatch(handleRemoveBookmark({ postId: _id, token }))
                  : dispatch(handlePostBookmark({ postId: _id, token }))
              }
            >
              {isBookMarked ? (
                <BsBookmarkFill className="text-primary" />
              ) : (
                <BsBookmark />
              )}
            </div>
            <div
              className="flex items-center cursor-pointer gap-1"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://shinobi-connect.netlify.app/post/${_id}`
                );
                ToastMessage("Link copied to clipboard", TOASTYPE.Success);
              }}
            >
              <BsShareFill />
              {/* <span>Share</span> */}
            </div>
          </div>
          {isIndividualPostPage && (
            <div className="flex gap-3 flex-col border-t border-dark-txt-color-secondary  pt-6">
              {comments.map((cmt) => (
                <CommentCard key={cmt._id} comment={cmt} />
              ))}
              <div className="flex w-full  shadow-sm  rounded-md">
                <input
                  value={commentInput}
                  placeholder="Enter your comment"
                  className="w-full border border-dark-txt-color-secondary dark:bg-dark-background dark:text-dark-txt-color-secondary focus:border-primary active:border-primary active:outline-none focus:outline-none rounded-l-md p-1.5 px-3"
                  type="text"
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <button
                  onClick={() => {
                    if (commentInput === "") {
                      ToastMessage(
                        "Please write something in the comment",
                        TOASTYPE.Info
                      );
                      return;
                    }
                    dispatch(
                      handleAddComment({
                        postId: _id,
                        commentData: { content: commentInput, postId: _id },
                        token,
                      })
                    );
                    setCommentInput("");
                  }}
                  className="text-white bg-gradient-to-r from-blue-600 to-gray-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 font-medium rounded-r text-sm px-4 py-1 text-center"
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
