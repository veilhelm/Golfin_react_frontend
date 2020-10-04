import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import "./TransactionCard.scss"
import CurrencyFormat from "react-currency-format"

const Card = styled.div`
    background: #333333;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    padding: 1rem;
    height: 10vh;
    z-index:1040;
    display: grid;
    grid-template-columns: 1fr 3fr 10vh;
    grid-template-rows: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
    margin-bottom: 1vh;
    opacity: 0;
    transform: translate(50%, -40%);
    transition: all .5s ease-in;
`
export default function TransactionCard ({transaction}) {
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
    // const {ammount , category, description, tags, type} = transaction
    const type = "exp"
    return (
        <Card ref={DOMcard}>
            <CurrencyFormat
            value={"$5000"}
            displayType="text"
            thousandSeparator={true}
            prefix={"$"}
            renderText={ value => <span className={`transaction-ammount currency-${type}`}>{value}</span>}
            ></CurrencyFormat>
            <h3>category</h3>
            <p>description</p>
            <div>
                <span>tags space</span>
                {/* {tags && tags.forEach( tag => <span>{tag}</span>)} */}
            </div>
        </Card>
    )
}