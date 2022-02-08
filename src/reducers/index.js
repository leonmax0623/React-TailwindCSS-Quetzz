import { combineReducers } from "redux";
import requestReducer from "./requestReducer";
import requestsReducer from "./requestsReducer";
import boardReducer from "./boardReducer";
import jobsReducer from "./jobsReducer";
import userReducer from "./userReducer";
import quetzzesReducer from "./quetzzesReducer";
import networkReducer from "./networkReducer";
import leaderboardReducer from "./leaderboardReducer";
import storeReducer from "./storeReducer";
import notificationsReducer from "./notificationsReducer";
import profileReducer from "./profileReducer";
import proProfileReducer from "./proProfileReducer";
import quetzzalPointsReducer from "./quetzzalPointsReducer";
import configReducer from "./configReducer";
import codesReducer from "./codesReducer";

export default combineReducers({
  request: requestReducer,
  requests: requestsReducer,
  board: boardReducer,
  jobs: jobsReducer,
  user: userReducer,
  quetzzes: quetzzesReducer,
  network: networkReducer,
  leaderboard: leaderboardReducer,
  quetzzalPoints: quetzzalPointsReducer,
  store: storeReducer,
  notifications: notificationsReducer,
  profile: profileReducer,
  proProfile: proProfileReducer,
  config: configReducer,
  codes: codesReducer,
});
