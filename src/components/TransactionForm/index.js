import React, {  useRef } from "react"
import styled from "styled-components"
import { LightInput } from "../Inputs"
import RoundedButton from "../roundedButton"
import Selector from "../Selector"
import "./TransactionForm.scss"

const MainWrapper = styled.div`
    background: #333333;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 10px;
    height: 20vh;
    z-index:1040;
    transform: translateY(-30%);
    animation: moveInBottom 1s ease-out 1s;
    animation-fill-mode: backwards;
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas: 
    ". a a a a . c c c c ."
    ". d d d d . t t t t ."
    ". . . . . b . . . . .";
    align-items: start;
    justify-items: center;
   
`

export default function TransactionForm ({kind}) {
    const DOMtranscForm = useRef(null)
    
    return(
        <MainWrapper ref={DOMtranscForm} className="transcForm">
                <LightInput 
                    className="transcForm_input-ammount"
                    type="number"
                    id="someId"
                    name="ammount"
                    kind={kind}
                    placeHolder="ammount"
                ></LightInput>
                <Selector
                    className="transcForm_input-category"
                    id="someId"
                    name="category"
                    options={['--category--', 'test2']}
                    kind={kind}
                    placeHolder="category"
                >
                </Selector>
                <LightInput 
                    className="transcForm_input-description"
                    type="text"
                    id="someId"
                    name="description"
                    kind={kind}
                    placeHolder="description"
                ></LightInput>
                <LightInput 
                    className="transcForm_input-tags"
                    type="text"
                    id="someId"
                    name="tags"
                    kind={kind}
                    placeHolder="tags"
                ></LightInput>
                <RoundedButton 
                className="transcForm_input-button"
                type="submit"
                kind={kind}
                size="4rem"
                onClick={() => console.log("im working")}
                >+</RoundedButton>
        </MainWrapper>
    )
}