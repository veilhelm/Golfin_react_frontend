import React from "react"
import { useSelector } from "react-redux"
import MainHeroSection from "../../components/MainHeroContainer"
import TransactionCard from "../../components/TransactionCard"
import TransactionForm from "../../components/TransactionForm"
import "./MainView.scss"

export default function MainView() {
    const selectedTypeInput = useSelector(state => state.transactionInputReducer.typeInputSelected)
    return(
        <div className="page__mainview">
            <MainHeroSection></MainHeroSection>
            <TransactionForm kind={selectedTypeInput}></TransactionForm>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
            <TransactionCard></TransactionCard>
        </div>
    )
}