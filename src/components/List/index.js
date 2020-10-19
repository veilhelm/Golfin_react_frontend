import React, { useRef } from "react"
import PropTypes from "prop-types"
import "./List.scss"

export default function List ({children, className= ""}) {
    return(
        <div className={`list__wrapper ${className}`}>
            {children}
        </div>
    )
}

List.element = function ({children, className="", id}){
    const handleClick = () => {
        document.querySelectorAll('.list__element').forEach( element => element.classList.remove('selected'))
        document.querySelector(`.list__element[id=${id}]`).classList.add('selected')
    }

    return(
        <div key={id} id={id} onClick={handleClick} className={`list__element ${className}`}>{children}</div>
    )
}

List.title = function ({style, children, onClick =()=>{return}, className =""}){
    return(
        <h5 
        onClick={(e) => onClick(e)} 
        className={`list__title ${className}`} 
        style={style}
        >
            {children}
        </h5>
    )
}

List.text = function ({children, style, onClick =()=>{return}, className=""}){
    return (
        <p 
        onClick={(e) => onClick(e)} 
        className={`list__text ${className}`} 
        style={style}
        >
            {children}
        </p>
    )
}
List.icon = function ({children, className=""}){
    return (
        <div className={`list__icon ${className}`}>
            {children}
        </div>
    )
}

List.section = function ({children, style, className=""}){
    return(
        <div style={style} className={`list__section ${className}`}>
            {children}
        </div>
    )
}

List.title.propTypes={
    style : PropTypes.object,
    children: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
}

List.text.propTypes={
    style : PropTypes.object,
    children: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
}