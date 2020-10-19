import { ACTIONS } from "./goalsReducer"

export const changeGoals = (payload) => {
    return{
        type: ACTIONS.CHANGE_GOALS,
        payload
    }
}

export const changePaymentsRecords = (payload) => {
    return{
        type: ACTIONS.CHANGE_PAYMENTS,
        payload
    }
}

export const updatePaymentsRecords = (payload) => {
    return{
        type: ACTIONS.UPDATE_PAYMENTS,
        payload
    }
}