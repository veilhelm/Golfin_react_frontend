let initialState={
    goals: []
}

const ACTIONS = {
    CHANGE_GOALS : "CHANGE_GOALS",
}

const goalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.CHANGE_GOALS:
            return{
                ...state,
                goals: [...action.payload, ...state.goals]
            }
        default:
        return state
    }
}

export {
    ACTIONS,
    goalsReducer
}