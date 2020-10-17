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

export const setYearlyTotalsToRender = (payload) => {
    return {
        type: ACTIONS.SET_YEARLY_TOTALS_TO_RENDER,
        payload
    }
}

export const setMonthlyTotalsToRender = (payload) => {
    return {
        type: ACTIONS.SET_MONTHLY_TOTALS_TO_RENDER,
        payload
    }
}

export const updateTotalsToRender = (data, actionCase) => {
    return {
        type: ACTIONS.UPDATE_TOTALS_TO_RENDER,
        payload: {data, actionCase}
    }
}