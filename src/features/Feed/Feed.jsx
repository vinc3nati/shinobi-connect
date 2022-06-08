import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { FaSort, FaFire } from "react-icons/fa";
import { Loader } from "../../components/Loader/Loader";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { openPostModal } from "../PostModal";
import { handleGetAllPosts, handleGetAllPostsByObserver } from "./postSlice";
import { handleGetAllUsers } from "./userSlice";
import "./feed.css";
import { SuggestedUser } from "../../components/SuggestedUser/SuggestedUser";
import { SuggestedUserHorizontal } from "../../components/SuggestedUserHorizontal/SuggestedUserHorizontal";
import { FeedCard } from "../../components/FeedCard/FeedCard";

const LIMIT = 2;

export const Feed = ({ title }) => {
  useDocumentTitle(title);
  const { user, token } = useSelector((store) => store.auth);
  const { allUsers } = useSelector((store) => store.users);
  const { allPosts, isLoading, isLoadingMoreData } = useSelector(
    (store) => store.posts
  );
  const dispatch = useDispatch();

  const [pageNum, setPageNum] = useState(0);
  const [showPostLoader, setShowPostLoader] = useState(false);
  const [subNav, setSubNav] = useState("latest");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const loader = useRef(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const suggestedUserData = allUsers.filter(
    (item) =>
      user._id !== item._id &&
      !user.following?.some((otherUser) => otherUser._id === item._id)
  );

  useEffect(() => {
    dispatch(handleGetAllUsers());
    const elementRef = loader.current;

    const handleIntersectionObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPageNum((prev) => prev + 1);
      }
    };

    const intersectionObserver = new IntersectionObserver(
      handleIntersectionObserver
    );
    if (elementRef) {
      intersectionObserver.observe(elementRef);
    }
  }, []);

  useEffect(() => {
    setShowPostLoader(true);
    setPageNum(0);
    if (pathname !== "/explore") {
      dispatch(handleGetAllPosts());
    }
    const timerId = setTimeout(() => [setShowPostLoader(false)], 400);
    return () => clearTimeout(timerId);
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/explore") {
      dispatch(handleGetAllPostsByObserver({ limit: LIMIT, page: pageNum }));
    }
  }, [pageNum, pathname]);

  useEffect(() => {
    if (pathname.includes("explore")) {
      setFilteredPosts(allPosts);
    } else {
      setFilteredPosts(
        allPosts.filter(
          (post) =>
            user?.followers?.some((item) => item?._id === post?.userId) ||
            user?.following?.some((item) => item?._id === post?.userId) ||
            user?._id === post?.userId
        )
      );
    }
  }, [allPosts, user, pathname]);

  return (
    <>
      {(isLoading || showPostLoader) && <Loader />}
      <div className="flex justify-center gap-5 items-start">
        <div className="flex flex-col gap-4 w-2/5 md:w-4/5 sm:w-full">
          {pathname !== "/explore" && (
            <>
              <div
                className="flex items-center drop-shadow-xl bg-nav-background dark:bg-dark-background-secondary px-4 py-2 rounded gap-4 mb-6 sm:mb-4 sm:py-2 cursor-pointer"
                onClick={() => dispatch(openPostModal())}
              >
                <img
                  src={user?.pic}
                  alt="user profile"
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div className="flex justify-between items-center w-full">
                  <p className="grow text-dark-txt-color-secondary sm:text-sm">
                    What's on your mind, {user?.firstName}
                  </p>
                  <IoMdAddCircle className="text-xl text-dark-txt-color-secondary cursor-pointer" />
                </div>
              </div>
              {/* Latest - Trending Menu */}
              <div
                className="flex dark:bg-dark-background-secondary bg-nav-background
         p-4 rounded gap-4 text-center  font-semibold justify-evenly "
              >
                <div className="w-1/2 border-r-2 border-primary flex items-center justify-center">
                  <span
                    className={`hover:opacity-70 cursor-pointer flex items-center ${
                      subNav === "latest"
                        ? "text-secondary"
                        : "text-dark-txt-color-secondary"
                    }`}
                    onClick={() => setSubNav("latest")}
                  >
                    <FaSort className="pr-2 text-xl" />
                    Latest
                  </span>
                </div>
                <div className="w-1/2 flex items-center justify-center">
                  <span
                    className={`hover:opacity-70 cursor-pointer flex items-center ${
                      subNav === "trending"
                        ? "text-secondary"
                        : "text-dark-txt-color-secondary"
                    }`}
                    onClick={() => setSubNav("trending")}
                  >
                    <FaFire className="pr-2 text-xl" />
                    Trending
                  </span>
                </div>
              </div>
            </>
          )}
          <div className="flex flex-col gap-2 rounded drop-shadow-2xl ">
            <div className="hide-scrollbar w-full gap-1 flex-nowrap overflow-x-scroll hidden md:flex">
              {suggestedUserData.map((item) => (
                <SuggestedUser key={item?._id} user={item} />
              ))}
            </div>
          </div>
          {/* Post Feed */}
          <div className="flex flex-col gap-4">
            {filteredPosts.length === 0 && (
              <div className="flex justify-center bg-nav-background dark:bg-dark-background-secondary rounded drop-shadow-2xl p-5">
                <p className="text-xl text-dark-txt-color-secondary font-medium">
                  No posts yet. You can go{" "}
                  <span
                    onClick={() => navigate("/explore")}
                    className="cursor-pointer text-secondary"
                  >
                    Explore
                  </span>{" "}
                  Feeds
                </p>
              </div>
            )}
            {pathname !== "/explore" &&
            subNav === "latest" &&
            filteredPosts.length !== 0
              ? [...filteredPosts]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((item) => <FeedCard key={item?._id} postData={item} />)
              : pathname !== "/explore"
              ? [
                  ...filteredPosts.filter(
                    (post) =>
                      post?.likes?.likeCount > 0 || post?.comments?.length > 0
                  ),
                ]
                  .sort(
                    (a, b) =>
                      b?.likes?.likeCount +
                      b?.comments?.length -
                      (a?.likes?.likeCount + a?.comments?.length)
                  )
                  .map((item) => <FeedCard key={item?._id} postData={item} />)
              : null}
            {pathname === "/explore" &&
              filteredPosts.map((post, idx) => (
                <FeedCard key={post._id} postData={post} />
              ))}

            {isLoadingMoreData && (
              <div className="flex justify-center">
                <img
                  className="w-20 h-20"
                  src="https://res.cloudinary.com/randomwave45/image/upload/v1654523209/828_tod4rv.gif"
                  alt="infinite loader"
                />
              </div>
            )}
            <div ref={loader}></div>
          </div>
        </div>
        {/* Suggested User Aside */}
        <div className="md:hidden text-center text-dark-txt-color-secondary sticky top-24">
          <p className="text-xl font-semibold">Suggested Users</p>
          <div className="flex flex-col gap-1 max-h-96 overflow-y-auto">
            {suggestedUserData.map((item) => (
              <SuggestedUserHorizontal key={item?._id} user={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
