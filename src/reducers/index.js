import { createStore, combineReducers } from "redux"
import { userDataReducer } from "./userDataReducer"
import { transactionInputReducer } from "./transactionInputReducer"

const rootReducer = combineReducers({userDataReducer, transactionInputReducer})

export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())