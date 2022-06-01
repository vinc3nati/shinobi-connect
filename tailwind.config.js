import colors from "tailwindcss/colors";
export const content = ["./src/**/*.{html,js,jsx}"];
export const darkMode = "class";
export const theme = {
  colors: {
    primary: "#4361ee",
    "primary-light": "#5e77e7",
    "primary-accent": "rgba(67, 97, 238, 0.2)",
    secondary: "#f72585",
    "secondary-light": "#ec599b",
    tertiary: "#f4faff",
    "tertiary-dark": "#e1e2e4",
    "nav-background": "#FFFFFF",
    background: "#F8F9FA",
    "secondary-background": "#DCF0FF",
    "grey-dark-1": "#777",
    "grey-dark-2": "#555",
    "grey-dark-3": "#333",
    error: "#f44336",
    "error-light": "#f73c2f",
    "error-dark": "#dd1e10",
    success: "#4caf50",
    "success-light": "#62b365",
    "success-dark": "#42a545",
    warning: "#ff9800",
    "warning-light": "#e6a647",
    info: "#7cc6fe",
    "txt-color-hover": "#94a3b8",
    "background-dim": "rgb(0,0,0,0.5)",
    "dark-txt-color": "#f4faff",
    "dark-txt-color-secondary": "#767B9F",
    "dark-background": "#1c2440",
    "dark-background-secondary": "#1E293B",
    ...colors,
  },

  screens: {
    "2xl": { max: "1535px" },
    // => @media (max-width: 1535px) { ... }
    xl: { max: "1279px" },
    // => @media (max-width: 1279px) { ... }
    lg: { max: "1023px" },
    // => @media (max-width: 1023px) { ... }
    md: { max: "850px" },
    // => @media (max-width: 767px) { ... }
    sm: { max: "639px" },
    // => @media (max-width: 639px) { ... }
  },
};
export const plugins = [];
