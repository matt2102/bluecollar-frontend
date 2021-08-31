import {combineReducers} from "redux"

import user from "./user"
import messages from "./messages"
import auth from "./auth"

export default combineReducers({
  user,
  messages,
  auth
})