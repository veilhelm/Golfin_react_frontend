const now = new Date()
let initialState = {
    transactions : [],
    yearlyTotals: [{year: now.getUTCFullYear() , totals:{totalinc: 0, totalexp: 0}}],
    monthsTotals: [{month: now.getUTCMonth() , totals:{totalinc: 0 , totalexp: 0}}],
}

const ACTIONS = {
    CHANGE_TRANSACTION_TO_RENDER : "CHANGE_TRANSACTION_TO_RENDER",
    DELETE_TRANSACTION_TO_RENDER: "DELETE_TRANSACTION_TO_RENDER",
    SET_YEARLY_TOTALS_TO_RENDER: "CHANGE_TOTALS_TO_RENDER",
    SET_MONTHLY_TOTALS_TO_RENDER: "SET_MONTHLY_TOTALS_TO_RENDER",
    UPDATE_TOTALS_TO_RENDER: "UPDATE_TOTALS_TO_RENDER",
    UPDATE_TOTALS_BY_DELETE: "UPDATE_TOTALS_BY_DELETE",
}

const updateTotalsHelper = ( transaction , state , actionCase ) => {
    const { ammount, type, createdAt } = transaction
    const dateOfTransaction = new Date(createdAt)
    const newTotalYears = [...state.yearlyTotals]
    const newTotalMonths = [...state.monthsTotals]
    const yearIndex = newTotalYears.findIndex(yearTotal => yearTotal.year === dateOfTransaction.getUTCFullYear())
    const monthIndex = newTotalMonths.findIndex(monthTotal => monthTotal.month === dateOfTransaction.getUTCMonth())
    if(actionCase === 'transactionAdded'){
        newTotalYears[yearIndex].totals[`total${type}`] += ammount
        newTotalMonths[monthIndex].totals[`total${type}`] += ammount
    }
    if(actionCase === 'transactionDeleted'){
        newTotalYears[yearIndex].totals[`total${type}`] -= ammount
        newTotalMonths[monthIndex].totals[`total${type}`] -= ammount
    }
    return{
        newTotalYears,
        newTotalMonths,
    }
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
        case ACTIONS.SET_YEARLY_TOTALS_TO_RENDER :
            return {
                ...state,
                yearlyTotals: action.payload
            }
        case ACTIONS.SET_MONTHLY_TOTALS_TO_RENDER :
            return {
                ...state,
                monthsTotals: action.payload
            }
        case ACTIONS.UPDATE_TOTALS_TO_RENDER :
            const actionCase = action.payload.actionCase
            const transaction = actionCase === 'transactionAdded' ? action.payload.data : state.transactions.find( transaction => transaction._id === action.payload.data )
            const { newTotalYears, newTotalMonths } = updateTotalsHelper(transaction, state, actionCase)
            return {
                ...state,
                yearlyTotals: newTotalYears,
                monthsTotals: newTotalMonths,
            }
        default :
        return state
    }
}

export {
    ACTIONS,
    transactionToRenderReducer
}