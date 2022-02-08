import {
  FETCH_EMAIL_CODE,
  SET_EMAIL_CODE,
  FETCH_CODE,
  SET_CODE,
} from "./types";

export const fetchEmailCode = (emailCode) => (dispatch) => {
  dispatch({
    type: FETCH_EMAIL_CODE,
    payload: emailCode,
  });
};

export const setEmailCode = (emailCode) => (dispatch) =>
  dispatch({
    type: SET_EMAIL_CODE,
    payload: emailCode,
  });

export const fetchCode = (code) => (dispatch) => {
  dispatch({
    type: FETCH_CODE,
    payload: code,
  });
};

export const setCode = (code) => (dispatch) =>
  dispatch({
    type: SET_CODE,
    payload: code,
  });
