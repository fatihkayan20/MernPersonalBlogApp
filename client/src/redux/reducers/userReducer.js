import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
} from "../types";
const initialState = {
  authenticated: false,
  likes: [],
  posts: [],
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case "LOADING_USER":
      return {
        ...state,
        loading: true,
      };
    case "SET_AUTHENTICATED":
      return {
        ...state,
        authenticated: true,
        loading: false,
      };
    case "SET_UNAUTHENTICATED":
      return {
        ...state,
        authenticated: false,
        loading: false,
      };
    case "SET_USER":
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    default:
      return state;
  }
}
