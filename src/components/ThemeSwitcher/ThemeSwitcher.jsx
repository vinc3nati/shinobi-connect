import { useDispatch, useSelector } from "react-redux";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import {
  handleDarkTheme,
  handleLightTheme,
} from "../../features/Theme/ThemeSlice";
import "./themeSwitcher.css";

export const ThemeSwitcher = () => {
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const toggleTheme = () => {
    theme === "dark"
      ? dispatch(handleLightTheme())
      : dispatch(handleDarkTheme());
  };
  return (
    <div className="theme-switch">
      <MdLightMode className="theme-icon" />
      <label htmlFor="theme-switcher" className="theme-label">
        <input
          type="checkbox"
          name="theme-switcher"
          id="theme-switcher"
          className="theme-input"
          checked={theme === "dark" ? true : false}
          onChange={toggleTheme}
        />
        <span className="theme-slider"></span>
      </label>
      <MdDarkMode className="theme-icon" />
    </div>
  );
};
