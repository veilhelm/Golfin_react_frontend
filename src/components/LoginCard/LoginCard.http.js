import axios from "axios"

export const postLoginUser = async (credentials) => {
    try {
        const {data} = await axios({
            method: "POST",
            baseURL: process.env.REACT_APP_LOGIN_SERVICE_URL,
            data: {
                ...credentials
            }
        })
        return data
    } catch (error) {
        throw error
    }
}