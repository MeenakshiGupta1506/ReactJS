import {createStore} from "redux"
import {AuthReducer} from "./reducer"

var store = createStore(AuthReducer)

export default store