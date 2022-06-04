import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ScrollToTop />
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
