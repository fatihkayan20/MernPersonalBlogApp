import {
  SET_POSTS,
  SET_POST,
  LOADING_DATA,
  LIKE_POST,
  COMMENT_POST,
  CREATE_POST,
} from "../types";
import axios from "axios";

export const getPosts = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get("/posts")
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
export const getPostDetail = (id) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get(`/posts/${id}`)
    .then((res) => {
      dispatch({
        type: SET_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
export const likePost = (id) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get(`/posts/${id}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
export const commentPost = (id, data) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .post(`/posts/${id}/comment`, data)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: COMMENT_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
export const createPost = (data) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  console.log(data);
  axios
    .post(`/posts`, data)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: CREATE_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
