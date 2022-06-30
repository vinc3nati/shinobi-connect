import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MdOutlineFeed, MdSportsSoccer } from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { ToastMessage } from "../../components";
import { Loader } from "../../components/Loader/Loader";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { getUserByHandler } from "../../services/user.service";
import { TOASTYPE } from "../../utils/constants";
import {
  handleFollowUser,
  handleGetAllPosts,
  handleUnFollowUser,
} from "../Feed";
import { handleLogout, handleUserUpdate } from "../Auth";
import { FeedCard } from "../../components/FeedCard/FeedCard";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { ProfileModal } from "../../components/ProfileModal/ProfileModal";

export const Profile = ({ title }) => {
  useDocumentTitle(title);
  const { userHandler } = useParams();
  const { user: currUser, token } = useSelector((store) => store.auth);
  const { allPosts, isLoading } = useSelector((store) => store.posts);
  const { allUsers } = useSelector((store) => store.users);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [user, setUser] = useState(null);
  const [falseLoading, setFalseLoading] = useState(false);
  const [isCurrUser, setIsCurrUser] = useState(false);
  const [subNav, setSubNav] = useState("posts");
  const [followModal, setFollowModal] = useState([]);

  const followRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userActivities = [
    ...allPosts.filter(
      (post) =>
        post.userId === user?._id ||
        post.likes.likedBy?.some((us) => us._id === user?._id) ||
        post.likes.dislikedBy?.some((us) => us._id === user?._id) ||
        post.comments?.some(
          (comment) =>
            comment.user?._id === user?._id ||
            post.comments?.some((comment) =>
              comment.replies?.some((reply) => reply.user?._id === user?._id)
            )
        )
    ),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useOnClickOutside(followRef, () => setFollowModal([]));

  useEffect(() => {
    dispatch(handleGetAllPosts());
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setFalseLoading(true);
        const response = await getUserByHandler({ userHandler });
        setUser(response.data.user);
        setIsCurrUser(currUser._id === response.data.user._id);
      } catch (err) {
        ToastMessage(err.response.data, TOASTYPE.Error);
      } finally {
        setFalseLoading(false);
      }
    })();
  }, [userHandler, allUsers, currUser._id]);

  useEffect(() => {
    setFalseLoading(true);
    const timerId = setTimeout(() => {
      setFalseLoading(false);
    }, 500);
    return () => clearTimeout(timerId);
  }, [subNav]);

  return (
    <>
      {showProfileModal && (
        <ProfileModal setShowProfileModal={setShowProfileModal} />
      )}
      {(isLoading || falseLoading) && <Loader />}
      {followModal.length !== 0 && (
        <div className="h-screen w-screen fixed inset-0 flex justify-center items-center z-50 bg-background-faint-dark">
          <div
            ref={followRef}
            className="flex flex-col gap-4 p-6 h-3/5 z-50 dark:bg-dark-background-secondary overflow-y-auto rounded sm:w-9/12 w-1/3 bg-background"
          >
            {followModal.map((item) => (
              <div
                key={item?._id}
                className="cursor-pointer flex items-center gap-4"
                onClick={() => {
                  setFollowModal([]);
                  navigate(`/profile/${item?.userHandler}`);
                }}
              >
                <img
                  src={item?.pic}
                  alt={`${item?.firstName} profile`}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-medium dark:text-dark-txt-color-secondary text-lg text-grey-dark-2">
                    {item?.firstName} {item?.lastName}
                  </p>
                  <p className="dark:text-dark-txt-color-secondary text-grey-dark-2">
                    @{item?.userHandler}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <div className="flex flex-col w-2/5  xl:3/5 lg:w-4/5 md:4/5 sm:w-full gap-4 transition-colors">
          <div className="flex flex-col bg-nav-background dark:bg-dark-background-secondary dark:text-dark-txt-color gap-4 rounded">
            <div className="flex justify-center relative transition-all bg-gradient-to-br from-blue-600 to-gray-400 dark:focus:ring-blue-800 font-medium rounded-t h-40">
              <img
                src={isCurrUser ? currUser?.pic : user?.pic}
                alt={`${
                  isCurrUser ? currUser?.firstName : user?.firstName
                } profile`}
                className="absolute -bottom-16 h-40 w-40 rounded-full border-2 border-tertiary dark:border-dark-background-secondary"
              />
            </div>
            <div className="flex w-full items-center justify-between gap-1 px-3">
              <div className="flex flex-col">
                <p className="text-xl font-semibold sm:text-base text-center">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm">@{user?.userHandler}</p>
              </div>
              {isCurrUser && (
                <button
                  className="py-1 px-2 ring-1 rounded hover:bg-secondary-background dark:hover:bg-primary-accent text-sm sm:text-xs"
                  onClick={() => setShowProfileModal(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
            {(currUser?.bio || user?.bio) && (
              <p className="text-center w-full font-semibold text-lg sm:text-md">
                {isCurrUser ? currUser?.bio : user?.bio}
              </p>
            )}
            {(user?.link || currUser?.link) && (
              <a
                className="flex gap-1 items-center justify-center font-semibold text-primary transition hover:underline active:underline"
                href={user?.link}
                rel="noreferrer"
                target="_blank"
              >
                <MdSportsSoccer />
                Website
              </a>
            )}
            <div className="flex gap-2 justify-center text-base sm:text-sm px-3">
              <p className="cursor-pointer" onClick={() => setSubNav("posts")}>
                {allPosts.filter((item) => item.userId === user?._id).length}{" "}
                Posts
              </p>
              |
              <p
                className="cursor-pointer"
                onClick={() => setFollowModal(user?.following || [])}
              >
                {user?.following?.length || 0} Following
              </p>
              |
              <p
                className="cursor-pointer"
                onClick={() => setFollowModal(user?.followers || [])}
              >
                {user?.followers?.length} Followers
              </p>
            </div>
            <div className="text-center mb-4">
              {isCurrUser || user === null ? (
                <button
                  className="text-error w-32 text-base sm:text-xs border border-error py-1 px-3 rounded transition active:bg-error active:text-white hover:bg-red-100 dark:hover:bg-red-400 dark:hover:text-white"
                  onClick={() => dispatch(handleLogout())}
                >
                  Logout
                </button>
              ) : currUser.following?.some((item) => item._id === user?._id) ? (
                <button
                  className="py-1 px-2 w-32 ring-1 text-base sm:text-xs rounded hover:bg-secondary-background py-1 px-3 dark:hover:bg-primary-accent"
                  onClick={() => {
                    dispatch(
                      handleUnFollowUser({
                        userId: user?._id,
                        token,
                        dispatch,
                        handleUserUpdate,
                      })
                    );
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="py-1 px-2 w-32 ring-1 text-base sm:text-xs rounded hover:bg-secondary-background py-1 px-3 dark:hover:bg-primary-accent"
                  onClick={() => {
                    dispatch(
                      handleFollowUser({
                        userId: user?._id,
                        token,
                        dispatch,
                        handleUserUpdate,
                      })
                    );
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className="flex justify-evenly items-center sm:text-xs bg-nav-background dark:bg-dark-background-secondary dark:text-dark-txt-color gap-10 rounded p-2 sm:p-3">
            <div
              className={`cursor-pointer flex gap-1 uppercase items-center px-3 py-2 rounded ${
                subNav === "posts"
                  ? "bg-primary dark:bg-primary-accent text-white"
                  : ""
              }`}
              onClick={() => setSubNav("posts")}
            >
              <MdOutlineFeed />
              Posts
            </div>
            {isCurrUser && (
              <div
                className={`cursor-pointer flex gap-1 uppercase items-center px-3 py-2 rounded ${
                  subNav === "bookmarked"
                    ? "bg-primary dark:bg-primary-accent text-white"
                    : ""
                }`}
                onClick={() => setSubNav("bookmarked")}
              >
                <BsBookmark />
                Bookmarks
              </div>
            )}
            <div
              className={`cursor-pointer flex gap-1 uppercase items-center px-3 py-2 rounded ${
                subNav === "activities"
                  ? "bg-primary dark:bg-primary-accent text-white"
                  : ""
              }`}
              onClick={() => setSubNav("activities")}
            >
              <AiOutlineHistory />
              Activities
            </div>
          </div>
          {subNav === "posts" && (
            <div className="flex flex-col gap-4">
              {allPosts.filter((item) => item.userId === user?._id).length ===
                0 && (
                <div className="bg-nav-background flex flex-col items-center gap-y-1 dark:bg-dark-background-secondary dark:text-dark-txt-color p-3 rounded">
                  <img
                    src="https://res.cloudinary.com/randomwave45/image/upload/v1654700514/404_4_auukj9.png"
                    alt="empty data"
                    className="h-48 object-cover"
                  />
                  <p className="text-center text-xl">
                    {isCurrUser
                      ? "Seems like you have not posted yet"
                      : `${user?.firstName} haven't posted anything yet`}
                  </p>
                </div>
              )}
              {[...allPosts.filter((item) => item.userId === user?._id)]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item) => (
                  <FeedCard key={item._id} postData={item} />
                ))}
            </div>
          )}
          {subNav === "bookmarked" && (
            <div className="flex flex-col gap-4">
              {[
                ...allPosts.filter((item) =>
                  currUser.bookmarks?.some((bmrk) => bmrk === item._id)
                ),
              ].length === 0 && (
                <div className="bg-nav-background flex flex-col items-center gap-y-1 dark:bg-dark-background-secondary dark:text-dark-txt-color p-3 rounded">
                  <img
                    src="https://res.cloudinary.com/randomwave45/image/upload/v1654700514/404_4_auukj9.png"
                    alt="empty data"
                    className="h-48 object-cover"
                  />
                  <p className="text-center text-xl">
                    Seems like you have not bookmarked yet
                  </p>
                </div>
              )}
              {[
                ...allPosts.filter((item) =>
                  currUser.bookmarks?.some((bmrk) => bmrk === item._id)
                ),
              ]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item) => (
                  <FeedCard key={item._id} postData={item} />
                ))}
            </div>
          )}
          {subNav === "activities" && (
            <>
              {userActivities.length === 0 && (
                <div className="bg-nav-background flex flex-col items-center gap-y-1 dark:bg-dark-background-secondary dark:text-dark-txt-color p-3 rounded">
                  <img
                    src="https://res.cloudinary.com/randomwave45/image/upload/v1654700514/404_4_auukj9.png"
                    alt="empty data"
                    className="h-48 object-cover"
                  />
                  <p className="text-center text-xl">
                    {isCurrUser
                      ? "Seems like you have not been active"
                      : `${user?.firstName} have no activities to show`}
                  </p>
                </div>
              )}
              {userActivities.length !== 0 &&
                userActivities.map((item) => (
                  <FeedCard key={item._id} postData={item} />
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};
