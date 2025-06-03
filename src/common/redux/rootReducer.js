import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import authLoginReducer from "../../components/auth/auth.slice";
import loginReducer from "../../components/auth/login.slice";

// ----------------------------------------------------------------------
const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: ["authLogin", "login"],
};

const productPersistConfig = {
  key: "school",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};

const rootReducer = combineReducers({
  authLogin: authLoginReducer,
  login: loginReducer,
});

export { rootPersistConfig, rootReducer };
