import React from "react"
import styled, { ThemeProvider } from "styled-components"

const Rounded = styled.button`
background: #333333;
box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
width: ${props => props.theme.size};
height: ${props => props.theme.size};
font-size: 3rem;
color: ${props => props.theme.color};
border-radius: 100px;
border: none;
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

export default function RoundedButton ({
  children, 
  className, 
  kind,
  type, 
  size, 
  onClick,
  style,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  ref,
  }) {
    const theme = {}
    theme.color = "white"
    if(kind) theme.color = kind === "inc" ? "#0FC721" : "#9F2E2E"
    theme.size = size || "4rem"
    
    console.log(ref)
    return (
      <ThemeProvider theme={theme}>
        <Rounded 
        style={style} 
        onClick={onClick} 
        type={type} 
        className={className}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        ref={ref}
        >
        {children}
        </Rounded>
      </ThemeProvider>
    )
}