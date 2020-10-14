import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import "./TransactionCard.scss"
import CurrencyFormat from "react-currency-format"
import RoundedButton from "../roundedButton"
import Draggable from "react-draggable"
import { categoryIcons } from "../../utils/transactionCategories"
import Tag from "../tag"
import { deleteTransaction } from "./TransactionCard.http"
import { useDispatch } from "react-redux"
import { deleteTransactionToRender } from "../../reducers/transactionToRenderReducer.actions"

const Card = styled.div`
    background: #333333;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    padding-left: 1.5rem;
    padding-right: 0;
    height: 65px;
    display: grid;
    margin-bottom: 10px;
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
    const [deleted, setDeleted] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const dispatch = useDispatch()

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

    const updateDimensions = () =>{
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener("resize", updateDimensions )
    })

    const handleDelete= async (DOMelement) => {
        const id = DOMelement.getAttribute("data-id")
        try {
            await deleteTransaction(id)
            dispatch(deleteTransactionToRender(id))
        } catch (error) {
            
        }
    }

    const handleOnStop= (event, {x}) =>{
        if(deleteBtnPosition > -350) {
            setDeleteBtnPosition(0)
            setShowDelete(false)
        }
        if(deleted) handleDelete(DOMcard.current)
    }

    const handleDrag=(event,{x}) =>{
        setDeleteBtnPosition(x)
        if(x < -15) setShowDelete(true)
        if(deleteBtnPosition<-200){
            DOMcard.current.classList.add("delete")
            setDeleted(true)
        } 
    }

    const renderTags = (tags = []) => {
        if(tags.length === 0 ) return null
        let limit
        if(windowWidth <= 1024) limit = 6
        if(windowWidth <= 768 ) limit = 4
        if(windowWidth <= 600 ) limit = 3
        if(windowWidth <= 430 ) limit = 2
        return tags.slice(0, limit).map( tag => <Tag>{tag}</Tag>)
    }

    return (
        <Card className="transaction-card" data-id={transaction._id} ref={DOMcard}>
            <CurrencyFormat
            value={transaction.ammount}
            displayType="text"
            thousandSeparator={true}
            prefix={"$"}
            renderText={ value => <span className={`transaction-ammount currency-${transaction.type}`}>{value}</span>}
            ></CurrencyFormat>
            <h3>{transaction.category}</h3>
            <p>{transaction.description}</p>
            <div className="transaction-card-tags">
                {renderTags(transaction.tags)}
            </div>
            {categoryIcons[transaction.category]}
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