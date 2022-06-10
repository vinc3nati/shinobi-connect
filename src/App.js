import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Login, Signup } from "./features";
import MockMan from "mockman-js";
import { useSelector } from "react-redux";
import { Skeleton } from "./components/Skeleton/Skeleton";
import { Feed } from "./features/Feed/Feed";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { PostModal } from "./features/PostModal/PostModal";
import { IndividualPost } from "./features/IndividualPost/IndividualPost";
import { Profile } from "./features/Profile/Profile";
import { Error } from "./components/Error/Error";

function App() {
  const { theme } = useSelector((store) => store.theme);
  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <div
        data-theme={theme}
        className="min-h-screen  bg-background dark:bg-dark-background"
      >
        <ToastContainer style={{ fontWeight: "500", fontSize: "1rem" }} />
        <Routes>
          <Route path="/login" element={<Login title="Login" />} />
          <Route path="/signup" element={<Signup title="Sign Up" />} />
          <Route path="/mock" element={<MockMan />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Skeleton />
              </PrivateRoute>
            }
          >
            <Route index element={<Feed title="Home" />} />
            <Route path="explore" element={<Feed title="Explore" />} />
            <Route
              path="post/:postId"
              element={<IndividualPost title="post" />}
            />
            <Route
              path="profile/:userHandler"
              element={<Profile title="profile" />}
            />
          </Route>
          <Route path="*" element={<Error title="error" />} />
          <Route path="/error" element={<Error title="error" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
