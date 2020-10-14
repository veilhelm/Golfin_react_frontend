import axios from "axios"

export const postTransaction = async (transaction) => {
    try {
        const {data} = await axios({
            headers:{
                Authorization: "Bearer "+ localStorage.getItem('token')
            },
            method: "POST",
            baseURL: process.env.REACT_APP_TRANSACTION_SERVICE_URL,
            data: {
                ...transaction
            },
        })
        return data
    } catch (error) {
        throw error
    }
}