let initialState = {
    typeInputSelected : "exp",
}

const ACTIONS = {
    CHANGE_TYPE_INPUT_SELECTED : "CHANGE_TYPE_INPUT_SELECTED",
}

const transactionInputReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.CHANGE_TYPE_INPUT_SELECTED :
            return {
                ...state,
                typeInputSelected: action.payload
            }
            default :
        return state
    }
}

export {
    ACTIONS,
    transactionInputReducer
}