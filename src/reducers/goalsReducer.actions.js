import { ACTIONS } from "./goalsReducer"

export const changeGoals = (payload) => {
    return{
        type: ACTIONS.CHANGE_GOALS,
        payload
    }
}