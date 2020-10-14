import { createStore, combineReducers } from "redux"
import { userDataReducer } from "./userDataReducer"
import { transactionInputReducer } from "./transactionInputReducer"
import { transactionToRenderReducer } from "./transactionToRenderReducer"

const rootReducer = combineReducers({userDataReducer, transactionInputReducer, transactionToRenderReducer})

export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())