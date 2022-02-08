import { SET_PROFILE, SET_PRO_PROFILE } from "./types";
import { profileAPI } from "../resources/profile";
import { proProfileAPI } from "../resources/proProfile";
import { momentifyProProfile, uncdnifyProProfile, getBaseProfileInfo, getCDNProfileInfo } from "./util";

export const fetchProfile = (id) => (dispatch) =>
  profileAPI.find(id).then((profile) =>
    dispatch({
      type: SET_PROFILE,
      payload: profile,
    })
  );

export const fetchProProfile = (id) => (dispatch) =>
  proProfileAPI.find(id).then((profile) => {
    return dispatch({
      type: SET_PRO_PROFILE,
      payload: momentifyProProfile(profile),
    });
  });

export const updateProfile = (profile) => (dispatch) =>
  profileAPI.save(profile).then((profile) =>
    dispatch({
      type: SET_PROFILE,
      payload: profile,
    })
  );

export const updateProfileAvatar = (avatar) => (dispatch, getState) =>
  profileAPI.saveAvatar(avatar).then(() =>
    dispatch({
      type: SET_PROFILE,
      payload: {
        ...getState().profile,
        avatar,
      },
    })
  );

export const updateProProfile = (profile) => (dispatch) =>
  proProfileAPI.save({
    proUserProfileRequestDto: {
      baseProUserProfileRequestData: getBaseProfileInfo(profile.proUserProfile),
      cdnProUserProfileRequestData: getCDNProfileInfo(profile.proUserProfile)
    }
  }).then(() =>
    dispatch({
      type: SET_PRO_PROFILE,
      payload: uncdnifyProProfile(profile),
    })
  );

export const setProfile = (profile) => (dispatch) =>
  dispatch({
    type: SET_PROFILE,
    payload: profile,
  });

export const setProProfile = (profile) => (dispatch) =>
  dispatch({
    type: SET_PRO_PROFILE,
    payload: profile,
  });
