import React, { useEffect, useState } from "react"
import styled from "styled-components"
import MainChart from "../MainChart"
import NormalButton from "../NormalButton"
import { SelectorExpenses, SelectorIncome } from "../TypeInputSelectors"
import "./MainHeroContainer.scss"
import { useDispatch, useSelector } from "react-redux"
import { changeTypeInputSelected } from "../../reducers/transactionInputReducer.actions"
import { getTotals } from "./MainHeroContainer.http"
import { setMonthlyTotalsToRender, setYearlyTotalsToRender } from "../../reducers/transactionToRenderReducer.actions"
import CurrencyFormat from "react-currency-format"

const HeroContainer = styled.div`
  width: 100vw;
  height: 375px;
  padding-top: 15px;
  background: conic-gradient(from 180deg at 50% 50%, rgba(51, 51, 51, 0.4) 0deg, rgba(12, 203, 244, 0.2) 360deg), linear-gradient(180deg, #333333 0%, rgba(98, 85, 85, 0) 100%), #333333;
  display: grid;
  grid-template-areas:  "week month year"
                        "graph graph graph"
                        ". balance ."
                        "selector1 . selector2"
                        ".... .... ....";
  grid-template-rows: 1fr 2fr 1.5fr 1fr 1fr;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-items: center;
`
const months= ['January', 'February', 'Mars', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'Dicember']

export default function MainHeroSection (){
    const selectedTypeInput = useSelector(state => state.transactionInputReducer.typeInputSelected)
    const yearTotals = useSelector(state => state.transactionToRenderReducer.months)
    const monthTotals = useSelector(state => state.transactionToRenderReducer.monthsTotals)
    const [balance, setBalance] = useState(0)
    const [graphData, setGraphData] = useState([])
    const [graphSelected, setGraphSelected] = useState('month')
    const dispatch = useDispatch()
    const now = new Date()

    const setInputSelected = (kind) =>{
         dispatch(changeTypeInputSelected(kind))
    }

    const calculateMainGraphData = () => {
        const [thisMonthData] = monthTotals.filter( monthData => monthData.month === now.getUTCMonth())
        const expValue = thisMonthData.totals.totalexp
        const incValue = thisMonthData.totals.totalinc
        const balance = incValue - expValue
        const mainGraphData = [
            {type: "expenses", value: expValue}, 
            {type: "balance", value: balance  < 0 ? 0 : balance}]   
        return{
            mainGraphData,
            balance,
        } 
    }

    async function setTotals(){
        try {
            const totals = await getTotals()
            dispatch(setYearlyTotalsToRender(totals.years))
            dispatch(setMonthlyTotalsToRender(totals.months))
        } catch (error) {
            
        }
    }

    useEffect(() => {
        setTotals()
    },[])

    useEffect(() => {
      const {mainGraphData, balance} = monthTotals.length > 0 ? calculateMainGraphData() : {mainGraphData:[], balance: 0}
      setBalance(balance)
      setGraphData(mainGraphData)
    },[monthTotals, graphSelected])

    return(
        <HeroContainer className="heroContainer">
            <NormalButton onClick={() => setGraphSelected('week')} className="N_btn-week">week</NormalButton>
            <NormalButton onClick={() => setGraphSelected('month')} className="N_btn-month">{months[ now.getUTCMonth()]}</NormalButton>
            <NormalButton onClick={() => setGraphSelected('year')}className="N_btn-year">year</NormalButton>
            <MainChart 
            className="main_chart"
            data={graphData}
            ></MainChart>
            <h2 className="hero_title">
                <span className="hero_title-desc">balance</span>
                <div className="spacing"></div>
                <CurrencyFormat
                 value={balance}
                 displayType="text"
                 thousandSeparator={true}
                 prefix={"$"}
                 renderText={ value =><span className="hero_title-balance">{value}</span>}
                ></CurrencyFormat>
                
            </h2>
            <SelectorIncome onClick={(e) =>setInputSelected("inc")} active={selectedTypeInput} className="hero_selector-inc">add an inc</SelectorIncome>
            <SelectorExpenses onClick={(e) =>setInputSelected("exp")} active={selectedTypeInput} className="hero_selector-exp">add an exp</SelectorExpenses>
        </HeroContainer>
    )
}