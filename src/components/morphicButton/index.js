import React from "react"
import styled from "styled-components"

const SelectorButton = styled.button`
    border-radius: 20px;
    background: #333333;
    box-shadow: -2px -5px 5px #423f3f, 5px 2px 5px #2a2929;
    width: 10.5rem;
    height: 3.3rem;
    font-size: 1.5rem;
    border: none;
    transition: all .2s;
    outline: none;
    color: #48b328;
    font-family: "Lato", sans-serif;
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 5px;
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 1rem 2rem rgba(0,0,0,.2);
    }
    &:active {
        transform: translateY(-1px);
        box-shadow: 0 .2rem .5rem rgba(0,0,0,.2);
    }
`

export default function MorphicButton({children, className, onClick, type}){
    return(
        <SelectorButton type={type} className={className} onClick={(e)=> onClick}>{children}</SelectorButton>
    )
}