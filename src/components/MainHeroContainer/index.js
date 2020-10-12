import React from "react"
import styled from "styled-components"
import MainChart from "../MainChart"
import NormalButton from "../NormalButton"
import { SelectorExpenses, SelectorIncome } from "../TypeInputSelectors"
import "./MainHeroContainer.scss"
import { useDispatch, useSelector } from "react-redux"
import { changeTypeInputSelected } from "../../reducers/transactionInputReducer.actions"

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

export default function MainHeroSection (){
    const selectedTypeInput = useSelector(state => state.transactionInputReducer.typeInputSelected)
    const dispatch = useDispatch()
    const setInputSelected = (kind) =>{
         dispatch(changeTypeInputSelected(kind))
    }

    return(
        <HeroContainer className="heroContainer">
            <NormalButton className="N_btn-week">week</NormalButton>
            <NormalButton className="N_btn-month">january</NormalButton>
            <NormalButton className="N_btn-year">year</NormalButton>
            <MainChart className="main_chart"></MainChart>
            <h2 className="hero_title">
                <span className="hero_title-desc">balance</span>
                <div className="spacing"></div>
                <span className="hero_title-balance">$4000</span>
            </h2>
            <SelectorIncome onClick={(e) =>setInputSelected("inc")} active={selectedTypeInput} className="hero_selector-inc">add an inc</SelectorIncome>
            <SelectorExpenses onClick={(e) =>setInputSelected("exp")} active={selectedTypeInput} className="hero_selector-exp">add an exp</SelectorExpenses>
        </HeroContainer>
    )
}