import {combineReducers} from "redux"

import user from "./user"
import messages from "./messages"
import auth from "./auth"
import checkout from "./checkout"
import banner from "./banner"

export default combineReducers({
  user,
  messages,
  auth,
  checkout,
  banner,
})