import { ACTIONS } from "./transactionToRenderReducer"

export const changeTransactionsToRender = (payload) => {
    return {
        type: ACTIONS.CHANGE_TRANSACTION_TO_RENDER,
        payload
    }
}

export const deleteTransactionToRender = (payload) => {
    return {
        type: ACTIONS.DELETE_TRANSACTION_TO_RENDER,
        payload
    }
}