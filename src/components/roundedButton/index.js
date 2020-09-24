import React from "react"
import styled from "styled-components"

const Rounded = styled.button`
background: #333333;
box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
width: 50px;
height: 50px;
font-size: 3rem;
color: ${props => props.theme.color};
border-radius: 100px;
border: none;
margin-top: 20px;
transition: all .2s;
outline: none !important;
&:hover {
    transform: translateY(-3px);
    box-shadow: 0 1rem 2rem rgba(0,0,0,.2);
  }
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 .2rem .5rem rgba(0,0,0,.2);
  }
`

export default function RoundedButton ({children, className, kind}) {
    const theme = {}
    
    if(kind){
        theme.color = kind === "inc" ? "#0CCBF4" : "#9F2E2E"
    }
    
    theme.color = ""
    
    return (
        <Rounded className={className}>{children}</Rounded>
    )
}