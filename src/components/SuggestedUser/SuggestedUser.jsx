import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleFollowUser } from "../../features/Feed";
import { handleUserUpdate } from "../../features/Auth";
import "./suggestedUser.css";

export const SuggestedUser = ({ user }) => {
  const { token } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="h-48 suggest-container bg-nav-background dark:bg-dark-background-secondary rounded flex flex-col gap-4 items-center justify-center">
      <div
        onClick={() => navigate(`/profile/${user?.userHandler}`)}
        className="flex-col items-center gap-1"
      >
        <img
          title={`${user?.firstName} ${user?.lastName}`}
          className="cursor-pointer mb-2 h-20 w-20 object-cover rounded-full"
          src={user?.pic}
          alt={user?.userHandler}
        />
        <p className="text-xs cursor-pointer font-medium  dark:text-dark-txt-color text-dark-txt-color-secondary text-center">
          {user?.firstName} {user?.lastName}
        </p>
      </div>
      <button
        onClick={() =>
          dispatch(
            handleFollowUser({
              userId: user?._id,
              token,
              dispatch,
              handleUserUpdate,
            })
          )
        }
        className="text-white bg-gradient-to-r from-blue-600 to-gray-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 font-medium rounded text-sm px-4 py-1 text-center"
      >
        Follow
      </button>
    </div>
  );
};
