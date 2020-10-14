import axios from "axios"
export const postRegisterUser = async (user) => {
    try {
        const {data, status} = await axios({
            method: "POST",
            baseURL: process.env.REACT_APP_REGISTER_USER_SERVICE_URL,
            data: {
                ...user
            }
        })
        return {data, status}
    } catch (error) {
        throw error
    }
}