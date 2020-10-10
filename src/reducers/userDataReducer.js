let initialState = {
    isLogged: false,
    firstName: "",
    userPhoto: "",
}

const ACTIONS = {
    CHANGE_IS_LOGGED: "CHANGE_IS_LOGGED",
    CHANGE_FIRST_NAME: "CHANGE_FIRST_NAME",
    CHANGE_USER_PHOTO: "CHANGE_USER_PHOTO"
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
        default :
        return state
    }
}

export {
    ACTIONS,
    userDataReducer
}