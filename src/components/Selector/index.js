import React from "react"
import styled from "styled-components"


const SelectorWrapper = styled.div`
    width: 100%;
    position: relative;
`

const SelectorDrop = styled.span`
    position: absolute;
    top:10px;
    right: 0;
    height: 30px;
    width: 20%;
    background-color: #333;
    opacity:0.7;
    pointer-events: none;
    &::before{
        position:absolute;
        left:50%;
        top:50%;
        transform: translate(-50%, -50%);
        content:"";
        border-left: .7em solid transparent;
        border-right: .7em solid transparent;
        border-top: ${props => props.kind === "inc" ? "1rem solid #0FC721" : "1rem solid #9F2E2E" };
    }
`
const StyledSelect = styled.select`
    border: none;
    width: 100%;
    border-bottom: ${props => props.kind === "inc" ? "0.2rem solid #0FC721" : "0.2rem solid #9F2E2E" };
    background: #333333;
    font-family: "Lato", sans-serif;
    text-align: center;
    font-weight: 400;
    line-height: 1.7;
    font-size: 1.6rem;
    margin-top: 1rem;
    appearance: none;
    color: rgba(255, 255, 255, 0.4);
    outline: none;
    appearance: none;
    box-shadow: ${props => props.kind === "inc" ? "inset 0px -5px 0.2px rgba(15, 199, 33, 0.2)" : "inset 0px -5px 0px rgba(159, 46, 46, 0.4)"};
    &[type=number]::-webkit-inner-spin-button,
    &[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    } 
`

export default function Selector ({className, name, id, options, kind, onChange}) {
    
    const renderOptions = options.map(option => <option value={option}>{option}</option>)
    
    return(
        <SelectorWrapper className={className}>
        <StyledSelect 
        className={`input__selector`} 
        name={name}
        id={id}
        kind={kind}
        onChange={onChange}
        >
            {renderOptions} 
        </StyledSelect>
        <SelectorDrop kind={kind}></SelectorDrop>
        </SelectorWrapper>
    )
}