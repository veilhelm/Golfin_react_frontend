import React from "react"
import MainHeroSection from "../../components/MainHeroContainer"
import TransactionCard from "../../components/TransactionCard"
import TransactionForm from "../../components/TransactionForm"


export default function MainView() {
    return(
        <React.Fragment>
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
        </React.Fragment>
    )
}