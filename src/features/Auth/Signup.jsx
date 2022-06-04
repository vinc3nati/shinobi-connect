import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { handleSignup } from "./authSlice";
import logo from "../../assets/logo.png";
import authImage from "../../assets/madara.png";
import { validateEmail } from "../../utils/validator";
import { Loader } from "../../components/Loader/Loader";

export const Signup = ({ title }) => {
  useDocumentTitle(title);
  const { token, isLoading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [signup, setSignup] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [signupError, setSignupError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleChange = (e) => {
    setSignup((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // check for error by iterating on keys i.e. names of signupError object
    let flag = false;
    let tempErr = {};
    Object.keys(signupError).forEach((item) => {
      tempErr[item] = "";
      if (signup[item] === "") {
        tempErr[item] = `${item} cannot be empty`;
        flag = true;
      }
    });
    // if password field has error than we return
    if (signupError.password) return;

    if (flag) {
      setSignupError(tempErr);
      return;
    }
    dispatch(
      handleSignup({
        firstName: signup.firstName,
        lastName: signup.lastName,
        username: signup.email,
        password: signup.password,
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
      <div className="w-full min-h-screen flex text-gray-800">
        <div className="flex flex-col w-full">
          <div className="py-6 flex items-center justify-center">
            <img className="w-25 cursor-pointer" src={logo} alt="hero" />
          </div>
          <div className="px-12 py-4 pb-8 sm:px-6 sm:pt-0 sm:py-3">
            <header className="flex justify-center">
              <span className="text-3xl font-semibold border-b-2 border-primary pb-2 w-fit">
                Sign Up
              </span>
            </header>
            <div className="pt-8">
              <div className="flex gap-4 mb-4 sm:gap-2 sm:mb-2">
                <div className="w-full">
                  <label className="block font-semibold">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-primary-light rounded"
                    value={signup.firstName}
                    onChange={(e) => {
                      handleChange(e);
                      setSignupError((prev) => ({ ...prev, firstName: "" }));
                    }}
                    required
                  />
                  {signupError.firstName && (
                    <div className="text-error font-semibold text-sm">
                      {signupError.firstName}
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <label className="block font-semibold">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-primary-light rounded"
                    value={signup.lastName}
                    onChange={(e) => {
                      handleChange(e);
                      setSignupError((prev) => ({ ...prev, lastName: "" }));
                    }}
                    required
                  />
                  {signupError.lastName && (
                    <div className="text-error font-semibold text-sm">
                      {signupError.lastName}
                    </div>
                  )}
                </div>
              </div>
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@example.com"
                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-primary-light rounded"
                value={signup.email}
                onChange={(e) => {
                  handleChange(e);
                  if (!validateEmail(e.target.value)) {
                    setSignupError((prev) => ({
                      ...prev,
                      email: "Incorrect email format",
                    }));
                  } else {
                    setSignupError((prev) => ({ ...prev, email: "" }));
                  }
                }}
                required
              />
              {signupError.email && (
                <div className="text-error font-semibold text-sm">
                  {signupError.email}
                </div>
              )}
              <label className="block mt-3 font-semibold">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-primary-light rounded"
                value={signup.password}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.value !== "") {
                    setSignupError((prev) => ({ ...prev, password: "" }));
                  }
                }}
                required
              />
              {signupError.password && (
                <div className="text-error font-semibold text-sm">
                  {signupError.password}
                </div>
              )}
              <div>
                <button
                  className="font-semibold w-full my-6 bg-primary text-white py-2 px-6 rounded hover:bg-primary-light"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
                <div className="font-semibold flex flex-col items-center w-full">
                  <p>
                    Already have an account ? &nbsp;
                    <span
                      className="cursor-pointer text-secondary hover:underline"
                      onClick={() => navigate("/login", { state: { from } })}
                    >
                      Login!
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-tertiary-dark w-full md:hidden flex items-center justify-center">
          <img className="w-30" src={authImage} alt="auth logo" />
        </div>
      </div>
    </>
  );
};
