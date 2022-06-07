import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BiSearch, BiHomeAlt, BiSun, BiMoon } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { searchData } from "../../utils/searchData";
import {
  handleDarkTheme,
  handleLightTheme,
} from "../../features/Theme/ThemeSlice";

export const Navbar = () => {
  const navigate = useNavigate();
  const { theme } = useSelector((store) => store.theme);
  const { user } = useSelector((store) => store.auth);
  const { allUsers } = useSelector((store) => store.users);
  const [searchText, setSearchText] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [showSearchbar, setShowSearchbar] = useState(false);
  const searchbarRef = useRef();
  let timerId = useRef();

  const dispatch = useDispatch();

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
    <nav className="w-full sticky top-0 min h-20 sm:18 left-0 right-0 leading-10 z-40 dark:bg-dark-background drop-shadow-xl bg-nav-background shadow">
      <div className="flex justify-between relative items-center p-4 sm:p-2  h-full">
        <header
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            className="h-12 sm:h-10 max-w-full align-middle"
            src={logo}
            alt="App logo"
          />
        </header>
        <ul className="text-primary flex items-center gap-5 text-2xl">
          <li
            className="cursor-pointer flex items-center"
            onClick={() => setShowSearchbar(true)}
            title="search"
          >
            <BiSearch />
          </li>
          <li
            className="cursor-pointer flex items-center"
            onClick={() => navigate("/explore")}
            title="Explore"
          >
            <MdOutlineExplore />
          </li>
          <li
            className="cursor-pointer flex items-center"
            onClick={() => navigate("/")}
            title="Home"
          >
            <BiHomeAlt />
          </li>
          {theme === "dark" ? (
            <li
              className="cursor-pointer flex items-center"
              onClick={() => dispatch(handleLightTheme())}
              title="swicth-theme"
            >
              <BiMoon />
            </li>
          ) : (
            <li
              className="cursor-pointer flex items-center"
              onClick={() => dispatch(handleDarkTheme())}
              title="swicth-theme"
            >
              <BiSun />
            </li>
          )}
          <li className="cursor-pointer">
            <img
              src={user?.pic}
              alt="Profile img"
              className="w-10 h-10 object-cover rounded-full"
              onClick={() => navigate(`/profile/${user.userHandler}`)}
            />
          </li>
        </ul>
        {showSearchbar && (
          <div className="absolute top-0 left-0 w-full h-screen flex justify-center bg-background-faint-dark overflow-x-hidden overflow-y-hidden">
            <IoIosCloseCircleOutline
              onClick={() => resetSearchbar()}
              className="cursor-pointer absolute right-2 sm:mt-24 mt-6 text-3xl text-tertiary"
            />
            <div
              ref={searchbarRef}
              className="sm:w-9/12 w-2/5 mt-6 sm:mt-24 flex flex-col items-center gap-5 text-dark-txt-color-secondary"
            >
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                type="search"
                className="w-full bg-background dark:bg-dark-background rounded focus:outline-none px-4"
              />
              <div className="w-full flex flex-col gap-4 max-h-96 z-50 overflow-y-auto rounded bg-background dark:bg-dark-background">
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
                      <p className="font-medium text-lg">
                        {user?.firstName} {user?.lastName}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
