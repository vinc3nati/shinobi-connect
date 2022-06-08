import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export const Error = ({ title }) => {
  useDocumentTitle(title);
  const navigate = useNavigate();
  return (
    <section className="w-full bg-nav-background dark:bg-dark-background-secondary min-h-screen px-4 flex justify-center items-center  overflow-hidden">
      <div className="px-3 py-2 rounded w-full h-full flex flex-wrap justify-evenly items-center gap-1 bg-background dark:bg-dark-background text-grey-dark-3 dark:text-dark-txt-color-secondary">
        <img
          src="https://res.cloudinary.com/randomwave45/image/upload/v1654711281/404_6_juekag.png"
          alt="error logo"
          className="w-2/5 md:w-3/5 text-center animate-spin duration-700"
        />
        <div className="uppercase flex flex-col gap-2">
          <div className="font-bold text-8xl text-center">
            <p>Error</p>
            <p>404</p>
          </div>
          <div className="text-3xl font-bold text-center tracking-wide">
            Page Not Found
          </div>
          <div className="mt-1 flex justify-center items-center gap-4">
            <button
              className="px-3 py-2 rounded border border-primary text-primary hover:bg-primary-accent text-lg font-semibold"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              className="px-3 py-2 rounded bg-primary text-white active:bg-primary-light text-lg font-semibold"
              onClick={() => navigate("/explore")}
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
