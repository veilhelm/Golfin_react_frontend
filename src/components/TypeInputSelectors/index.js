import React from "react"
import styled, { ThemeProvider } from "styled-components"

const IncomeSelector = styled.button`
    border: none;
    border-bottom: ${props => props.theme.line};
    background: none;
    font-family: "Lato", sans-serif;
    font-weight: 300;
    line-height: 1.7;
    font-size: ${props => props.theme.fontSize};
    color: ${props => props.theme.fontColor};
    outline: none;
    box-shadow: ${props => props.theme.boxShadow};
    transition: all .2s;
    animation: moveInLeft 1s;
    &:hover{
        border-bottom: 0.2rem solid #0FC721;
        font-size: 1.6rem;
        color: #FFFFFF;
        box-shadow: inset 0px -5px 0px  rgba(15, 199, 33, 0.5);
        transform: translateY(-2px)
    }
`
const ExpenseSelector = styled(IncomeSelector)`
    animation: moveInRight 1s;
    &:hover{
        border-bottom: 0.2rem solid #9F2E2E;
        font-size: 1.6rem;
        color: #FFFFFF;
        box-shadow: inset 0px -5px 0px  rgba(159, 46, 46, 0.5);
        transform: translateY(-2px)
    }
`


export function SelectorIncome({children, active, className, onClick}) {
    const theme = {}
    if(active === "inc") {
        theme.line = "0.2rem solid #0FC721"
        theme.fontColor = "#FFFFFF"
        theme.fontSize = "1.6rem"
        theme.boxShadow = "inset 0px -5px 0px  rgba(15, 199, 33, 0.2)"
    }
    if(active === "exp") {
        theme.line = " 0.2rem solid  rgba(15, 199, 33, 0.5)"
        theme.fontSize = "1.5rem"
        theme.fontColor = "#7D8182"
        theme.boxShadow = "none"
    }

    return (
        <ThemeProvider theme={theme}>
            <IncomeSelector onClick={(e) => onClick} className={className}>{children}</IncomeSelector>
        </ThemeProvider>
    )
}

export function SelectorExpenses({children, active, className, onClick}) {
    const theme = {}
    if(active === "exp") {
        theme.line = "0.2rem solid #9F2E2E"
        theme.fontColor = "#FFFFFF"
        theme.fontSize = "1.6rem"
        theme.boxShadow = "inset 0px -5px 0px  rgba(159, 46, 46, 0.5)"
    }
    if(active === "inc") {
        theme.line = "0.2rem solid  rgba(159, 46, 46, 0.5)"
        theme.fontColor = "#7D8182"
        theme.fontSize = "1.5rem"
        theme.boxShadow = "none"
    }

    return (
        <ThemeProvider theme={theme}>
            <ExpenseSelector onClick={(e) => onClick} className={className}>{children}</ExpenseSelector>
        </ThemeProvider>
    )
}