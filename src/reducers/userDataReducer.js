let initialState = {
    isLogged: false,
    firstName: "",
    userPhoto: "",
    userId: "",
}

const ACTIONS = {
    CHANGE_IS_LOGGED: "CHANGE_IS_LOGGED",
    CHANGE_FIRST_NAME: "CHANGE_FIRST_NAME",
    CHANGE_USER_PHOTO: "CHANGE_USER_PHOTO",
    CHANGE_USER_ID: "CHANGE_USER_ID",
}

const userDataReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.CHANGE_FIRST_NAME:
            return {
                ...state,
                firstName: action.payload
            }
        case ACTIONS.CHANGE_IS_LOGGED:
            return {
                ...state,
                isLogged: action.payload
            }
        case ACTIONS.CHANGE_USER_PHOTO:
            return {
                ...state,
                userPhoto: action.payload
            }
        case ACTIONS.CHANGE_USER_ID:
            return {
                ...state,
                userId: action.payload
            }
        default :
        return state
    }
}

export {
    ACTIONS,
    userDataReducer
}