import React, { useEffect, useRef } from "react"
import "./Jumbotron.scss"

export default function Jumbotron({direction, children}){

    const DOMjumbotron = useRef()

    const observerObtions = {
        threshold: 0.7,
        rootMargin: "0px 0px -80px 0px"
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) return 
            if(entry.isIntersecting) entry.target.classList.add("slide", "slide-in")
        })
    }, observerObtions)

    useEffect(()=> {
        observer.observe(DOMjumbotron.current)
    })

    return(
        <div ref={DOMjumbotron} className={`jumbotron__wrapper ${direction}`}>
            {children}
        </div>
    )
}

Jumbotron.text = function ({children}) {
    return (
    <div className ="jumbotron__text">
        <p>{children}</p>
    </div>
    )
}

Jumbotron.image = function({src, alt, children}) {
    if(children)return <div className="jumbotron__img">{children}</div>
    return <img src={src} alt={alt}></img>
}