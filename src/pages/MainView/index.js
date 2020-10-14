import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import MainHeroSection from "../../components/MainHeroContainer"
import TransactionCard from "../../components/TransactionCard"
import TransactionForm from "../../components/TransactionForm"
import { getTransactions } from "./MainView.http"
import "./MainView.scss"
import { changeTransactionsToRender } from "../../reducers/transactionToRenderReducer.actions"


export default function MainView() {
    const transactions = useSelector(state => state.transactionToRenderReducer.transactions)
    const dispatch = useDispatch()

    useEffect(()=>{
        async function setTransactions(){
            try {
                const transactions = await getTransactions()
                console.log(transactions)
                dispatch(changeTransactionsToRender(transactions))
            } catch (error) {
                console.log({errorFetch: error})
            }
        }
        setTransactions()
    },[])

    const renderTransactions = () =>{
        console.log("i got executed")
    return transactions.length === 0 ? null : transactions.map( transaction => {
        console.log({testingTransc: transaction})
    return <TransactionCard key={transaction._id} transaction={transaction}></TransactionCard>
    })
    }
    const selectedTypeInput = useSelector(state => state.transactionInputReducer.typeInputSelected)
    return(
        <div className="page__mainview">
            <MainHeroSection></MainHeroSection>
            <TransactionForm kind={selectedTypeInput}></TransactionForm>
            {renderTransactions()}
        </div>
    )
}