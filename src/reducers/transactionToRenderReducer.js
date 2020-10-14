let initialState = {
    transactions : [],
}

const ACTIONS = {
    CHANGE_TRANSACTION_TO_RENDER : "CHANGE_TRANSACTION_TO_RENDER",
    DELETE_TRANSACTION_TO_RENDER: "DELETE_TRANSACTION_TO_RENDER",
}

const transactionToRenderReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.CHANGE_TRANSACTION_TO_RENDER :
            return {
                ...state,
                transactions: [...action.payload, ...state.transactions]
            }
        case ACTIONS.DELETE_TRANSACTION_TO_RENDER :
            return {
                ...state,
                transactions: state.transactions.filter( transaction => transaction._id !== action.payload)
            }
            default :
        return state
    }
}

export {
    ACTIONS,
    transactionToRenderReducer
}