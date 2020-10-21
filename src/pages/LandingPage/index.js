import React, { useEffect } from "react"
import "./LandingPage.scss"
import mockup from "../../resources/mockup2.png"
import mockup2 from "../../resources/mockup.svg"
import Jumbotron from "../../components/Jumbotron"
import { useHistory } from "react-router-dom"

export default function Landing () {
    const history = useHistory()

    const paragraphs = [
        {text: "Set your goals and recieve a custom financial plan that will help you get there", img: <i class="fas fa-award fa-3x"></i>, direction: 'right'},
        {text: "Recieve advice on the spot on your financial health. Record the transaction and see how that would affect your finance", img: <i class="fas fa-file-medical-alt fa-3x"></i>, direction: 'left'},
        {text: "Get  rewards for saving money! the closer you are to your objective, the eaiser we will make it for you", img: <i class="fas fa-hand-holding-usd fa-3x"></i>, direction: 'right'},
        {text: "Connect from every device, just loggin with your account and you are ready to go", img: <i class="fas fa-chalkboard-teacher fa-3x"></i>, direction: 'left'}

    ]

    const setupLandingView = () =>{
        document.querySelector("body").classList.add("landing-active")
    }
    
    const dismountLandingView = () =>{
        document.querySelector("body").classList.remove("landing-active")
    }

    useEffect(() =>{
        setupLandingView()
        return () => dismountLandingView()
    })

    const renderParagraphs = (paragraphs) => {
        return paragraphs.map( (paragraph, index )=> {
            const customClass = `jumbo${index}`
            return (
            <Jumbotron className={customClass} direction={paragraph.direction}>
                <Jumbotron.image>{paragraph.img}</Jumbotron.image>
                <Jumbotron.text>{paragraph.text}</Jumbotron.text>
            </Jumbotron>
            )
        })
    }

    return(
        <div className="landing__container">
            <header className="landing__hero-container">
                <div className="landing__hero-title">
                    <h1>ACHIEVE YOUR FINANCIAL GOALS WITH GOLFIN</h1>
                    <p>Set your goals, record your transactions and 
                        set yourself to your financial sucess with golfin. One simple way to keep your personal accounting on track.
                    </p>
                </div>
                <img className="landing__hero-mockup" src={mockup} alt=""></img>
            </header>
            <main className="landing__main-container">
                {renderParagraphs(paragraphs)}
                <img className="landing__main-mockup" src={mockup2}></img>
            </main>
            <footer className ="landing__footer">
                <div className="landing__footer-call">
                    <h3>sign up for free</h3>
                    <button onClick={()=> history.push("/register")}>sign up</button>
                </div>
                <div className="landing__footer-copyright">
                    <p>created by: Veilhelm Alexander Guarin</p>
                    <a href="https://veilhelm.github.io">get in touch</a>
                    <p>all rights reserved</p>
                    <p>2020</p>
                    <a href="https://github.com/veilhelm" className="landing__footer-icon github"><i class="fab fa-github fa-2x"></i></a>
                    <a href="https://www.linkedin.com/in/alexander-guarin-/" className="landing__footer-icon linkedin"><i class="fab fa-linkedin-in fa-2x"></i></a>
                </div>
            </footer>
            <main>
                
            </main>
        </div>
    )
}