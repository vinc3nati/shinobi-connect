import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Login, Signup } from "./features";
import MockMan from "mockman-js";

function App() {
  return (
    <div>
      <ToastContainer style={{ fontWeight: "500", fontSize: "1rem" }} />
      <Routes>
        <Route path="/login" element={<Login title="Login" />} />
        <Route path="/signup" element={<Signup title="Sign Up" />} />
        <Route path="/mock" element={<MockMan />} />
      </Routes>
    </div>
  );
}

export default App;
