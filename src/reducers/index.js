import { createStore, combineReducers } from "redux"
import { userDataReducer } from "./userDataReducer"

const rootReducer = combineReducers({userDataReducer})

export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())