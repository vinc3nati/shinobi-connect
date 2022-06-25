import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSearch, BiHomeAlt, BiSun, BiMoon } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDarkTheme,
  handleLightTheme,
} from "../../features/Theme/ThemeSlice";
import { Account } from "./Account";
import { Searchbar } from "./Searchbar";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

export const Navbar = () => {
  const navigate = useNavigate();
  const { theme } = useSelector((store) => store.theme);
  const { user } = useSelector((store) => store.auth);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSearchbar, setShowSearchbar] = useState(false);

  const dispatch = useDispatch();

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
        <ul className="text-primary flex items-center gap-5 text-2xl sm:text-xl">
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
          <ThemeSwitcher />
          {/* {theme === "dark" ? (
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
          )} */}
          <Account
            dispatch={dispatch}
            setShowProfileDropdown={setShowProfileDropdown}
            showProfileDropdown={showProfileDropdown}
            user={user}
          />
        </ul>
        <Searchbar
          setShowSearchbar={setShowSearchbar}
          showSearchbar={showSearchbar}
        />
      </div>
    </nav>
  );
};
