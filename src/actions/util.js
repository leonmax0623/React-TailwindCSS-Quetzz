import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import store from "../store";

export const getBaseProfileInfo = fullProfile => ({
  profession: fullProfile.profession,
  knownLanguages: fullProfile.knownLanguages,
  userEducationInfos: fullProfile.userEducationInfos,
  userExperienceInfos: fullProfile.userExperienceInfos,
  userCertificationInfos: fullProfile.userCertificationInfos
})

export const getCDNProfileInfo = fullProfile => ({
  photo: fullProfile.photo,
  offers: fullProfile.offers
})

export const momentifyRequest = (request) => ({
  ...request,
  created: moment(request.created),
  expiration: moment(request.expiration),
  end_date: moment(request.end_date),
  completed: moment(request.completed),
  cancelled: moment(request.cancelled),
});

export const momentifyQuetzz = (quetzz) => ({
  ...quetzz,
  created: moment(quetzz.created),
});

export const momentifyNotification = (notification) => ({
  ...notification,
  created: moment(notification.created),
});

export const processNotification = (notification) => {
  const contentParts = notification.content
    .split("{}")
    .map((text) => ({ type: "text", text }));
  const params = notification.parameters;
  const notificationParts = [];
  for (
    let i = 0;
    contentParts[i] !== undefined || params[i] !== undefined;
    i++
  ) {
    for (let arr of [contentParts, params]) {
      if (arr[i] !== undefined) {
        notificationParts.push(arr[i]);
      }
    }
  }
  return notificationParts;
};

export const notificationToJSX = (notification) =>
  processNotification(notification).map((notification) => {
    switch (notification.type) {
      case "text":
        return <span>{notification.text}</span>;
      case "link":
        return <Link to={notification.uri}>{notification.text}</Link>;
    }
  });

const momentifyProProfileItem = (item) => ({
  ...item,
  ...(item.start ? { start: moment(item.start) } : {}),
  ...(item.end ? { end: moment(item.end) } : {}),
  ...(item.date ? { date: moment(item.date) } : {}),
  ...(item.expiration ? { expiration: moment(item.expiration) } : {}),
});

export const momentifyProProfile = (profile) => ({
  ...profile,
  proUserProfile: {
    ...profile.proUserProfile,
    userEducationInfos: profile.proUserProfile.userEducationInfos.map(
      momentifyProProfileItem
    ),
    userExperienceInfos: profile.proUserProfile.userExperienceInfos.map(
      momentifyProProfileItem
    ),
    userCertificationInfos: profile.proUserProfile.userCertificationInfos.map(
      momentifyProProfileItem
    ),
  },
});

const cdnUrlPattern = "amazonaws.com/";

export const cdnify = (obj) => ({
  keyName:
    obj.keyName ||
    obj.url.slice(obj.url.lastIndexOf(cdnUrlPattern) + cdnUrlPattern.length),
  mimeType: obj.mimeType,
});

export const uncdnify = (obj) => {
  const cdnBasePath = store.getState().config.cdnBasePath;
  return {
    url: obj.url || `${cdnBasePath}${obj.keyName}`,
    mimeType: obj.mimeType,
  };
};

export const cdnifyProProfile = (profile) => ({
  ...profile,
  proUserProfile: {
    ...profile.proUserProfile,
    photo: cdnify(profile.proUserProfile.photo),
    offers: profile.proUserProfile.offers.map((offer) => ({
      ...offer,
      attachments: offer.attachments.map(cdnify),
    })),
  },
});

export const uncdnifyProProfile = (profile) => ({
  ...profile,
  proUserProfile: {
    ...profile.proUserProfile,
    photo: uncdnify(profile.proUserProfile.photo),
    offers: profile.proUserProfile.offers.map((offer) => ({
      ...offer,
      attachments: offer.attachments.map(uncdnify),
    })),
  },
});
