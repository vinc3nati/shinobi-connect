import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FeedCard } from "../../components/FeedCard/FeedCard";
import { Loader } from "../../components/Loader/Loader";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { handleGetPostById } from "./individualPostSlice";

export const IndividualPost = ({ title }) => {
  useDocumentTitle(title);
  const { postId } = useParams();
  const { allPosts } = useSelector((store) => store.posts);
  const { post, isLoading } = useSelector((store) => store.inidividualPost);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postId) {
      dispatch(handleGetPostById({ postId }));
    }
  }, [postId, allPosts]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex justify-center">
        <div className="flex flex-col w-2/5 md:w-4/5 sm:w-full gap-4">
          <div className="flex flex-col gap-4">
            {post && Object.keys(post).length !== 0 && (
              <FeedCard
                key={post?._id}
                postData={post}
                isIndividualPostPage={true}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
