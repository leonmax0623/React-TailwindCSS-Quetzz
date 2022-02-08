import {
  FETCH_EMAIL_CODE,
  SET_EMAIL_CODE,
  FETCH_CODE,
  SET_CODE,
} from "../actions/types";

const initialState = {
  emailCode: "",
  code: "",
};

const codesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMAIL_CODE:
      return { ...state, emailCode: action.payload };
    case SET_EMAIL_CODE:
      return { ...state, emailCode: action.payload };
    case FETCH_CODE:
      return { ...state, code: action.payload };
    case SET_CODE:
      return { ...state, code: action.payload };
    default:
      return state;
  }
};

export default codesReducer;
