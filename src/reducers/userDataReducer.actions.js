import { ACTIONS } from "./userDataReducer"

export const changeUserIsLogged = (payload) => {
    return {
        type: ACTIONS.CHANGE_IS_LOGGED,
        payload
    }
}

export const changeUserFirstName = (payload) => {
    return {
        type: ACTIONS.CHANGE_FIRST_NAME,
        payload
    }
}

export const changeUserPhoto = (payload) => {
    return {
        type: ACTIONS.CHANGE_USER_PHOTO,
        payload
    }
}