import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { handleLogin } from "./authSlice";
import logo from "../../assets/logo.png";
import authImage from "../../assets/madara.png";
import { validateEmail } from "../../utils/validator";
import { Loader } from "../../components/Loader/Loader";

export const Login = ({ title }) => {
  useDocumentTitle(title);
  const { token, isLoading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({
    email: "",
    password: "",
  });

  const testLogin = {
    email: "vinit@ceo.com",
    password: "12345678",
  };

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleChange = (e) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e, login) => {
    e.preventDefault();
    let flag = false;
    let tempErr = {};
    Object.keys(loginError).forEach((key) => {
      tempErr[key] = "";
      if (login[key] === "") {
        tempErr[key] = `${key} cannot be empty`;
        flag = true;
      }
    });

    if (flag) {
      setLoginError(tempErr);
      return;
    }
    dispatch(
      handleLogin({
        username: login.email,
        password: login.password,
      })
    );
  };

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="w-full min-h-screen flex text-gray-800 dark:text-tertiary">
        <div className="bg-tertiary-dark dark:bg-primary-accent w-full md:hidden flex items-center justify-center">
          <img className="w-30" src={authImage} alt="auth logo" />
        </div>
        <div className="flex flex-col w-full">
          <div className="py-6 flex items-center justify-center">
            <img className="w-25 cursor-pointer" src={logo} alt="hero" />
          </div>
          <div className="px-12 py-4 pb-8 sm:px-6 sm:pt-0 sm:py-3">
            <header className="flex justify-center">
              <span className="text-3xl font-semibold border-b-2 border-primary pb-2 w-fit">
                Login
              </span>
            </header>
            <div className="pt-8">
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@example.com"
                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 text-gray-600 focus:ring-primary-light rounded"
                value={login.email}
                onChange={(e) => {
                  handleChange(e);
                  if (!validateEmail(e.target.value)) {
                    setLoginError((prev) => ({
                      ...prev,
                      email: "Incorrect email format",
                    }));
                  } else {
                    setLoginError((prev) => ({ ...prev, email: "" }));
                  }
                }}
                required
              />
              {loginError.email && (
                <div className="text-error font-semibold text-sm">
                  {loginError.email}
                </div>
              )}
              <label className="block mt-3 font-semibold">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none text-gray-600 focus:ring-1 focus:ring-primary-light rounded"
                value={login.password}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.value !== "") {
                    setLoginError((prev) => ({ ...prev, password: "" }));
                  }
                }}
                required
              />
              {loginError.password && (
                <div className="text-error font-semibold text-sm">
                  {loginError.password}
                </div>
              )}
              <div>
                <button
                  className="font-semibold w-full my-6 bg-primary text-white py-2 px-6 rounded hover:bg-primary-light"
                  type="submit"
                  onClick={(e) => handleSubmit(e, login)}
                >
                  Login
                </button>
                <div className="font-semibold flex flex-col items-center w-full">
                  <span
                    className="font-semibold cursor-pointer py-4 text-primary text-center underline hover:text-primary-light"
                    onClick={(e) => {
                      // setLogin((prev) => testLogin);
                      handleSubmit(e, testLogin);
                    }}
                  >
                    Guest Login
                  </span>
                  <p>
                    Don't have an account ? &nbsp;
                    <span
                      className="cursor-pointer text-secondary hover:underline"
                      onClick={() => navigate("/signup", { state: { from } })}
                    >
                      Sign up!
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
