import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { searchData } from "../../utils/searchData";

export const Searchbar = ({ showSearchbar, setShowSearchbar }) => {
  const { allUsers } = useSelector((store) => store.users);
  const [searchText, setSearchText] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  const searchbarRef = useRef();
  let timerId = useRef();

  const navigate = useNavigate();

  const resetSearchbar = () => {
    setSearchText("");
    setSearchedData([]);
    setShowSearchbar(false);
  };

  useEffect(() => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      setSearchedData(searchData(allUsers, searchText));
    }, 500);
  }, [searchText]);

  useOnClickOutside(searchbarRef, resetSearchbar);

  return (
    <div
      className={`absolute top-0 left-0 w-full h-screen flex justify-center bg-background-faint-dark overflow-x-hidden overflow-y-hidden transition-all duration-300 ${
        showSearchbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <IoIosCloseCircleOutline
        onClick={() => resetSearchbar()}
        className="cursor-pointer absolute right-2 mt-6 text-3xl text-tertiary-dark"
      />
      <div
        className="w-full h-fit flex flex-col items-center gap-5 text-dark-txt-color-secondary"
        ref={searchbarRef}
      >
        <div className="w-full py-5 bg-nav-background dark:bg-dark-background-secondary flex justify-center">
          <input
            value={searchText}
            placeholder="Search users"
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            className="sm:w-9/12 w-2/5 bg-background dark:bg-dark-background rounded focus:outline-none border border-txt-color-hover focus:border-primary-light  px-4"
          />
        </div>
        <div className="sm:w-9/12 w-2/5 flex flex-col gap-4 max-h-96 z-50 overflow-y-auto rounded bg-background dark:bg-dark-background">
          {searchText !== "" && searchedData.length === 0 ? (
            <p className="text-center text-lg m-1 font-medium">
              No users found!
            </p>
          ) : (
            searchedData.map((user) => (
              <div
                key={user?._id}
                onClick={() => {
                  navigate(`/profile/${user.userHandler}`);
                  setShowSearchbar(false);
                }}
                className="px-4 pt-3 last-of-type:pb-3 cursor-pointer flex items-center gap-4"
              >
                <img
                  src={user?.pic}
                  alt="user profile"
                  className="w-14 h-14 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-lg">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span>@{user?.userHandler}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
