import React from "react"
import styled from "styled-components"

const SelectorButton = styled.button`
  background: #333333;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 36.7347px;
  width: 10.5rem;
  height: 3.3rem;
  font-size: 1.5rem;
  border: none;
  color: white;
  transition: all .2s;
  outline: none;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 1rem 2rem rgba(0,0,0,.2);
  }
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 .2rem .5rem rgba(0,0,0,.2);
  }
`

export default function NormalButton({children, className, onClick}){
    return(
        <SelectorButton className={className} onClick={(e)=> onClick}>{children}</SelectorButton>
    )
}