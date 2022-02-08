import Cookie from "js-cookie";
import { applicationMounted, csrfTokenAvailable, initialLogin } from "./global";
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";
import { handleNotification } from "./helpers";
import {
  adjustNotificationCount as adjustProNotificationCount,
  fetchNotifications as fetchProNotifications,
  markNotificationRead as markProNotificationRead,
} from "./actions/proNotificationsAction";
import {
  adjustNotificationCount as adjustUserNotificationCount,
  fetchNotifications as fetchUserNotifications,
  markNotificationRead as markUserNotificationRead,
} from "./actions/userNotificationsAction";
import store from "./store";
import history from "./history";
import { notificationsAPI } from "./resources/notifications";
import { userAPI } from "./resources/users";
import { setUser } from "./actions/userAction";

export default function () {
  let client;

  Promise.all([csrfTokenAvailable, applicationMounted, initialLogin]).then(
    () => {
      client = webstomp.over(SockJS("/api/ws"), {
        debug: false,
        protocols: webstomp.VERSIONS.supportedProtocols().pop(),
      });
      client.connect({ "X-XSRF-TOKEN": Cookie.get("XSRF-TOKEN") }, () =>
        client.subscribe("/user/queue/messages", (message) => {
          message = JSON.parse(message.body);
          handleNotification(message);
          console.log(message);

          setTimeout(() => {
            const target = message.type.target;
            const l = history.location;
            if (l.pathname === "/user-notifications" && l.search === "") {
              fetchUserNotifications(0)(store.dispatch)
                .then(() => new Promise((r) => setTimeout(r, 3000)))
                .then(() =>
                  store
                    .getState()
                    .notifications.userNotifications.allNotifications.filter(
                      (n) => !n.read
                    )
                    .forEach((n) =>
                      notificationsAPI.markRead(n.id).then(() => {
                        adjustUserNotificationCount(-1)(store.dispatch);
                        markUserNotificationRead(n)(store.dispatch);
                      })
                    )
                );
            } else if (l.pathname === "/pro-notifications" && l.search === "") {
              fetchProNotifications(0)(store.dispatch)
                .then(() => new Promise((r) => setTimeout(r, 3000)))
                .then(() =>
                  store
                    .getState()
                    .notifications.proNotifications.allNotifications.filter(
                      (n) => !n.read
                    )
                    .forEach((n) =>
                      notificationsAPI.markRead(n.id).then(() => {
                        adjustProNotificationCount(-1)(store.dispatch);
                        markProNotificationRead(n)(store.dispatch);
                      })
                    )
                );
            } else if (target === "pro") {
              adjustProNotificationCount(1)(store.dispatch);
            } else if (target === "user") {
              adjustUserNotificationCount(1)(store.dispatch);
            }
            // console.log(message.type.name);
            if (message.type.name === "PROFILE_APPROVED") {
              setUser({ proStatus: "COMPLETED" })(store.dispatch);
            }
          }, 1000);
        })
      );
    }
  );
}
