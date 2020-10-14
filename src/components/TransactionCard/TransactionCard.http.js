import axios from "axios"

export const deleteTransaction = async (id) => {
    try {
        const {data} = await axios({
            headers:{
                Authorization: "Bearer "+ localStorage.getItem('token')
            },
            baseURL: process.env.REACT_APP_TRANSACTION_SERVICE_URL,
            method: "DELETE",
            data:{
                id
            }
        })
        return data
    } catch (error) {
        throw error
    }
}