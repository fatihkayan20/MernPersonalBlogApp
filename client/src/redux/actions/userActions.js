import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  CLEAR_ERRORS,
  SET_ERRORS,
} from "../types";
import axios from "axios";

export const loginUser = (data, history) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  dispatch({ type: CLEAR_ERRORS });

  axios
    .post("/users/login", data)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
      history.push("/");
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
export const signupUser = (data, history) => (dispatch) => {
  dispatch({ type: LOADING_USER });

  axios
    .post("/users/signup", data)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["x-auth-token"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  localStorage.setItem("token", token);
  axios.defaults.headers.common["x-auth-token"] = token;
};
