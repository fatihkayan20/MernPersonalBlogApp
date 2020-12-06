// import { SET_POSTS, SET_POST, LOADING_DATA, LIKE_POST ,COMMENT_POST} from "../types";
const initialState = {
  posts: [],
  post: {},
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case "LOADING_DATA":
      return {
        ...state,
        loading: true,
      };
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case "SET_POST":
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case "LIKE_POST":
      return {
        ...state,
        post: {
          ...state.post,
          post: action.payload,
        },
        loading: false,
      };

    case "COMMENT_POST":
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
          post: {
            ...state.post.post,
            commentCount: state.post.post.commentCount + 1,
          },
        },
        loading: false,
      };

    case "CREATE_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };

    default:
      return state;
  }
}
