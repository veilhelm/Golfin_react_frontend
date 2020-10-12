import { ACTIONS } from "./transactionInputReducer"

export const changeTypeInputSelected = (payload) =>{
    return{
        type: ACTIONS.CHANGE_TYPE_INPUT_SELECTED,
        payload
    }
}   