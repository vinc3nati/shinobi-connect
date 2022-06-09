import { useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../features/Auth";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

export const Account = ({
  user,
  showProfileDropdown,
  dispatch,
  setShowProfileDropdown,
}) => {
  const profileDropdownRef = useRef();
  const navigate = useNavigate();

  useOnClickOutside(profileDropdownRef, () => setShowProfileDropdown(false));
  return (
    <li
      className="cursor-pointer relative cursor-pointer"
      ref={profileDropdownRef}
    >
      <div
        className="flex gap-1 items-center text-base border-l-2 border-primary-light pl-2"
        onClick={() => setShowProfileDropdown((prev) => !prev)}
      >
        <img
          src={user?.pic}
          alt="Profile img"
          className="w-7 h-7 object-cover rounded-full"
        />
        <span className="font-semibold">{user?.firstName}</span>
        <IoIosArrowDown />
      </div>
      {showProfileDropdown && (
        <div className="absolute top-10 w-max">
          <ul className="p-2 text-base bg-background rounded dark:bg-dark-background-secondary drop-shadow-xl">
            <li
              className="rounded hover:bg-secondary-background px-2 py-1"
              onClick={() => {
                navigate(`/profile/${user.userHandler}`);
                setShowProfileDropdown(false);
              }}
            >
              Profile
            </li>
            <li
              className="text-error rounded hover:bg-secondary-background px-2 py-1"
              onClick={() => {
                dispatch(handleLogout());
                setShowProfileDropdown(false);
              }}
            >
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </li>
  );
};
