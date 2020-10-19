let initialState={
    goals: [],
    payments: []
}

const ACTIONS = {
    CHANGE_GOALS : "CHANGE_GOALS",
    CHANGE_PAYMENTS: "CHANGE_PAYMENTS",
    UPDATE_PAYMENTS: "UPDATE_PAYMENTS",
}

const goalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.CHANGE_GOALS:
            return{
                ...state,
                goals: [...action.payload, ...state.goals]
            }
        case ACTIONS.CHANGE_PAYMENTS:
            return{
                ...state,
                payments: [...action.payload]
            }
        case ACTIONS.UPDATE_PAYMENTS:
            return{
                ...state,
                payments: [...action.payload, ...state.payments]
            }
        default:
        return state
    }
}

export {
    ACTIONS,
    goalsReducer
}