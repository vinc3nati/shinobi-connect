import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleFollowUser } from "../../features/Feed";
import { handleUserUpdate } from "../../features/Auth";

export const SuggestedUserHorizontal = ({ user }) => {
  const { token } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      key={user?._id}
      className="flex items-center justify-between px-4 py-2 bg-nav-background dark:bg-dark-background-secondary"
    >
      <div
        className="flex items-center gap-3 mr-4 cursor-pointer"
        onClick={() => navigate(`/profile/${user?.userHandler}`)}
      >
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={user?.pic}
          alt={`${user?.firstName} profile`}
        />
        <p>
          {user?.firstName} {user?.lastName}
        </p>
      </div>

      <button
        className="text-white bg-gradient-to-r from-blue-600 to-gray-400 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 font-medium rounded text-sm px-4 py-1 text-center"
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
    </div>
  );
};
