import axios from "axios"

export const getTotals = async () => {
    try {
        const {data} = await axios({
            headers:{
                Authorization: "Bearer "+ localStorage.getItem('token')
            },
            method:"GET",
            baseURL: process.env.REACT_APP_QUERY_SERVICE_URL,
            url:"totals"
        })
        return data
    } catch (error) {
        throw error
    }
}