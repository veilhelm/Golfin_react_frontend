import React from "react"
import styled from "styled-components"
import { MorphicInput } from "../Inputs"
import MorphicButton from "../morphicButton"
import "./LoginCard.scss"

const MorphCard = styled.div`
    min-width: 300px;
    width: 100%;
    height: 100%;
    padding: 10px;
`

export default function LoginCard ({className}) {
    return(
        <MorphCard className={`login_card ${className}`}>
            <label htmlFor="login__email">email</label>
            <MorphicInput
            type="text"
            id="login__email" 
            name="login__email"
            placeHolder="me@mail.com"
            className="login__input"
            ></MorphicInput>
            <label htmlFor="login__password">password</label>
            <MorphicInput
            id="login__password"
            name="login__password"
            placeHolder="password"
            className="login__input"
            ></MorphicInput>
            <div>
                <MorphicButton className="login__btn">login</MorphicButton>
                <a href="#" className="login__forgot">forgot password?</a>
            </div>
        </MorphCard>
    )    

}