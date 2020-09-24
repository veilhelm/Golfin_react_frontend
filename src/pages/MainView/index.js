import React from "react"
import MainHeroSection from "../../components/MainHeroContainer"
import TransactionForm from "../../components/TransactionForm"


export default function MainView() {
    return(
        <React.Fragment>
            <MainHeroSection></MainHeroSection>
            <TransactionForm kind="exp"></TransactionForm>
        </React.Fragment>
    )
}