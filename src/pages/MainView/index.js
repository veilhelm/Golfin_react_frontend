import React from "react"
import MainHeroSection from "../../components/MainHeroContainer"
import TransactionCard from "../../components/TransactionCard"
import TransactionForm from "../../components/TransactionForm"
import "./MainView.scss"


export default function MainView() {
    return(
        <div className="page__mainview">
            <MainHeroSection></MainHeroSection>
            <TransactionForm kind="inc"></TransactionForm>
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