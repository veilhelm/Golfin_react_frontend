import { createStore, combineReducers } from "redux"
import { userDataReducer } from "./userDataReducer"
import { transactionInputReducer } from "./transactionInputReducer"
import { transactionToRenderReducer } from "./transactionToRenderReducer"
import { goalsReducer } from "./goalsReducer"

const rootReducer = combineReducers({userDataReducer, transactionInputReducer, transactionToRenderReducer, goalsReducer })

export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())