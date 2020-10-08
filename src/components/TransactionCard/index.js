import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import "./TransactionCard.scss"
import CurrencyFormat from "react-currency-format"
import RoundedButton from "../roundedButton"
import Draggable from "react-draggable"

const Card = styled.div`
    background: #333333;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    padding-left: 1.5rem;
    padding-right: 0;
    height: 65px;
    display: grid;
    grid-template-columns: 1.5fr 3fr 10vh;
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
    "ammount category delete"
    "tags  description delete";
    align-items: center;
    justify-items: center;
    margin-bottom: 1vh;
    opacity: 0;
    transform: translate(30%, -40%);
    transition: all .5s ease-in;
    color: white;
    position: relative;
`
const DeleteArea = styled.div`
    background-color: #9F2E2E;
    width: ${props => props.width};
    height: 65px;
    position: absolute;
    right:0;
    z-index: 1;
    border-radius: 40px;
`

export default function TransactionCard ({transaction}) {
    const [animationIsOver, setAnimationIsOver] = useState(false)
    const [deleteBtnPosition, setDeleteBtnPosition] = useState(0)
    const [showDelete, setShowDelete] = useState(false)

    const DOMcard = useRef(null)
    const observerObtions = {
        threshold: 0.7,
        rootMargin: "0px 0px -80px 0px"
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

    const handleOnStop= (event, {x}) =>{
        if(deleteBtnPosition > -350) {
            setDeleteBtnPosition(0)
            setShowDelete(false)
        }
    }

    const handleDrag=(event,{x}) =>{
        setDeleteBtnPosition(x)
        if(x < -15) setShowDelete(true)
        if(deleteBtnPosition<-200) DOMcard.current.classList.add("delete")
    }


    return (
        <Card className="transaction-card" ref={DOMcard}>
            <CurrencyFormat
            value={"$5000"}
            displayType="text"
            thousandSeparator={true}
            prefix={"$"}
            renderText={ value => <span className={`transaction-ammount currency-${type}`}>{value}</span>}
            ></CurrencyFormat>
            <h3>category</h3>
            <p>description testing how long can this string be</p>
            <div>
                <span className="">tags space</span>
                {/* {tags && tags.forEach( tag => <span>{tag}</span>)} */}
            </div>
            <Draggable
                axis="x"
                bounds=".transaction-card"
                grid={[10,0]}
                onDrag={handleDrag}
                onStop={handleOnStop}
                position={{x:deleteBtnPosition, y: 0}}
            >
                <RoundedButton 
                size="65px" 
                className="delete-btn"
                >x</RoundedButton>
            </Draggable>
            {showDelete && 
                <DeleteArea 
                width={`${Math.abs(deleteBtnPosition)+60}px`}
                className="transaction-card-delete-area"
                >
                    <span>delete</span>
                </DeleteArea>}
        </Card>
    )
}