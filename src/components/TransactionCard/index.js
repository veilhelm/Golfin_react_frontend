import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import "./TransactionCard.scss"

const Card = styled.div`
    background: #333333;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 10vh;
    z-index:1040;
    transform: translateY(-60%);
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas: 
    ". a a a a . c c c c ."
    ". d d d d . t t t t ."
    ". . . . . b . . . . .";
    align-items: start;
    justify-items: center;
    margin-bottom: 1vh;
    opacity: 0;
    transform: translateX(50%);
    transition: all .5s ease-in;
`
export default function TransactionCard () {
    const [animationIsOver, setAnimationIsOver] = useState(false)
     
    const DOMcard = useRef(null)
    const observerObtions = {
        threshold: 0,
    }

    const observer = new IntersectionObserver( (entries) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) return 
            if(entry.isIntersecting && animationIsOver) entry.target.classList.add("appear", "fade-in")
        })
    }, observerObtions)

    useEffect(() =>{
        setTimeout(()=> setAnimationIsOver(true), 1500)
        observer.observe(DOMcard.current)
    })
    return (
        <Card ref={DOMcard}></Card>
    )
}