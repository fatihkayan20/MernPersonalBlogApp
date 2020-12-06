import React from "react";
import "./main.css";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import axios from "axios";
import jwtDecode from "jwt-decode";

import store from "./redux/store";
import { getUserData, logoutUser } from "./redux/actions/userActions";
import { SET_AUTHENTICATED } from "./redux/types";

axios.defaults.baseURL = "http://localhost:5000";

const token = localStorage.token;

if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 3600 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href("/login");
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["x-auth-token"] = token;

    store.dispatch(getUserData());
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
