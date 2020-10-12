import React from "react"
import styled from "styled-components"

const StyledSpan = styled.span`
    background-color: #43707A;
    color: white;
    border-radius: 2px;
    margin: 1px 3px;
    padding: 0 3px;
`

export default function Tag ({children}) {
    return(
        <StyledSpan>{children}</StyledSpan>
    )
}