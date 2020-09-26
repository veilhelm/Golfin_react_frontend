import React from "react"
import styled from "styled-components"

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
export default function Input ({className, type, id, name, kind, placeHolder }) {
    return(
            <InputField 
            className={className}
            type={type}
            id={id}
            name={name}
            kind={kind}
            placeholder={placeHolder}
            ></InputField>
    )
}