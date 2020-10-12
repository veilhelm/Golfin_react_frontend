import React from "react"
import styled from "styled-components"
import "./Inputs.scss"

const InputField =styled.input`
    border: none;
    width: 100%;
    border-bottom: ${props => props.kind === "inc" ? "0.2rem solid #0FC721" : "0.2rem solid #9F2E2E" };
    background: none;
    font-family: "Lato", sans-serif;
    text-align: center;
    font-weight: 400;
    line-height: 1.7;
    font-size: 1.6rem;
    margin-top: 1rem;
    appearance: none;
    color: white;
    outline: none;
    box-shadow: ${props => props.kind === "inc" ? "inset 0px -5px 0.2px rgba(15, 199, 33, 0.2)" : "inset 0px -5px 0px rgba(159, 46, 46, 0.4)"};
    &[type=number]::-webkit-inner-spin-button,
    &[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    }
`
export function LightInput ({className, type, id, name, kind, placeHolder, value, onChange, onFocus, onBlur}) {
    return(
            <InputField 
            className={className}
            type={type}
            id={id}
            name={name}
            kind={kind}
            placeholder={placeHolder}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            ></InputField>
    )
}

const MorphicInputField = styled.input`
    outline: none;
    border-radius: 20px;
    width: 250px;
    border: none;
    background: #333;
    z-index:4;
    height: 25px;
    color: white;
    font-family: "Lato", sans-serif;
    text-align: center;
    font-weight: 400;
    line-height: 1.7;
    font-size: 1.6rem;
    margin-top: .5rem;
    margin-bottom: .5rem;
    padding: 5px;
    height: 3rem;

`
export function MorphicInput ({className, id, name, placeHolder, value, onChange}) {
    return(
        <div className={`morphic-input ${className}`}>
            <MorphicInputField
                id={id}
                name={name}
                placeHolder={placeHolder}
                value={value}
                onChange={onChange}
            >
            </MorphicInputField>
        </div>
    )
}