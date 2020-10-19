import axios from "axios"

export const postNewGoal = async (goal) =>{
    try {
        const {data} = await axios({
            method: "POST",
            baseURL: process.env.REACT_APP_GOALS_SERVICE_URL,
            data: {
                ...goal
            },
            headers:{
                Authorization: "Bearer "+ localStorage.getItem('token')
            },
        })
        return data
    } catch (error) {
        throw error
    }
}

export const getGoals = async () => {
    try {
        const {data} = await axios({
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            method: "GET",
            baseURL: process.env.REACT_APP_QUERY_SERVICE_URL,
            url:"goals"
        })
        return data
    } catch (error) {
        throw error
    }
}