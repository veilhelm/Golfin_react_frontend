import React from "react"
import CurrencyFormat from "react-currency-format"
import { useSelector } from "react-redux"
import List from "../List"
import "./GoalsDataCard.scss"
import { DateTime } from "luxon"

export default function GoalsDataCard ({goalId=""}) {
    const payments = useSelector(state => state.goalsReducer.payments)
    const goals = useSelector(state => state.goalsReducer.goals)
    const payment = payments.find( payment => payment.goalId === goalId.split("-")[1]) || {}
    const goal = goals.find( goal => goal._id === goalId.split("-")[1]) || {}
    const listOfPayments = payment.payments
    if(goalId ==="") return <div style={{display:"grid", placeItems:"center"}}><h1>select a goal</h1></div>
    const renderListOfPayments = () =>{
      return listOfPayments.map( payment =>{
        return (<List.element id={`d-${payment.name}`}>
                <List.title>{payment.name}</List.title>
                <List.section>
                    <List.text><CurrencyFormat value={payment.quote} displayType={'text'} thousandSeparator={true} prefix={'amount to save: $'} decimalScale={0}></CurrencyFormat></List.text>
                    <List.text><CurrencyFormat value={payment.payed} displayType={'text'} thousandSeparator={true} prefix={'amount saved: $'} decimalScale={0}></CurrencyFormat></List.text>
                </List.section>
                <List.icon>
                <i className="fas fa-piggy-bank"></i>
                </List.icon>
            </List.element>)
      })
    }
    return (
        <div className="objectives__goal-data">
            <h4>{goal.title}</h4>
            <p>created at: {DateTime.fromISO(goal.createdAt).toFormat("yyyy-MM-dd")}</p>
            <p>due to: {DateTime.fromISO(goal.date).toFormat("yyyy-MM-dd")}</p>
            <p>objective: {goal.kind.replaceAll("_", " ")}</p>
            <p>amount: <CurrencyFormat value={goal.quote} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0}></CurrencyFormat></p>
            <p>number of expected payments: {goal.numberOfQuotes}</p>
            <p>interest Rate: {`%${goal.iRate * 100} M.V.`}</p>
            <br></br>
            <h5>savings plan</h5>

            <List>
                {renderListOfPayments()}
            </List>
        </div>
    )
}