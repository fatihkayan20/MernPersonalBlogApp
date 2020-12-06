import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";
const initialState = {
  loading: false,
  errors: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case "LOADING_UI":
      return {
        ...state,
        loading: true,
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: [],
      };

    default:
      return state;
  }
}
