import React, { useEffect, useRef, useState } from "react"
import "./Objectives.scss"
import CurrencyFormat from "react-currency-format"



function FormInput ({value, onChange, className, placeHolder, id}) {
        return (
            <input
            placeholder={placeHolder}
            id={id}
            className={className}
            value={value}
            onChange={onChange}
            ></input>
        )
}

export default function Goals ({}) {
    const [initialPromptOpen, setInitialPromptOpen] = useState(true)
    const [selectedForm, setSelectedForm] = useState("")
    const [formData, setFormData] = useState({amount:""})
    const DOMInitialPrompt = useRef()
    const DOMFieldOnScreen = useRef()

    const hideInitialPrompt = () => {
        setInitialPromptOpen(false)
        setTimeout(()=>{
            DOMInitialPrompt.current.parentNode.removeChild(DOMInitialPrompt.current)
            setSelectedForm("objectives__form-kind")
        }, 400)
    }

    const changeFieldOnScreenNext = (nextField) => {
            DOMFieldOnScreen.current.classList.add('fade-out')
            setTimeout(() => {
                setSelectedForm(nextField)
            }, 500);
    }

    const handleChangeInCurrency= ({value}) => {
        setFormData(formData =>{
            formData['amount'] = value
            return {...formData}
        })
    }

    const handleChange = (e) => {
        e.persist()
        setFormData( formData => {
            formData[e.target.id] = e.target.value
            return {...formData}
        })
    }
    const renderSelectedForm = ()=> {
        switch (selectedForm) {

            case 'objectives__form-kind':
                return(
                    <div ref={DOMFieldOnScreen} className="objectives__form-kind fade-in-start">
                        <p>let´s start by defining what kind of financial goal you are trying to achieve:</p>
                        <div className="objectives__input">
                            <select
                            className="objectives__input_select"
                            name="objectives__select"
                            id="kind"
                            onChange={handleChange}
                            >
                                <option value={``}>select:</option>
                                <option value={`paying_of_debt`}>paying of debt</option>
                                <option value={`saving_for_retirement`}>saving for retirement</option>
                                <option value={`build_a_fond`}>build a fond</option>
                                <option value={`Buy_a_house_or_an_apartment`}>buy a house/apartment</option>
                                <option value={`vacation_trip`}>save for vacations or trip</option>
                                <option value={`start_a_business`}>start a new business</option>
                                <option value={`buy_something`}>buy something I want</option>
                            </select>
                        </div>
                        <button onClick={() => changeFieldOnScreenNext('objectives_form-amount')} className="objectives__next_btn">next</button>
                    </div>
                )
                
            case 'objectives_form-amount':
                return(
                    <div ref={DOMFieldOnScreen} className="objectives__form-amount fade-in-start">
                            <p>in order to fullfil this goal how much money do you speect/need to save?:</p>
                            <div className="objectives__input">
                                <CurrencyFormat
                                thousandSeparator={true} 
                                prefix={'$'}
                                customInput={FormInput}
                                className="objectives__form-input-amount"
                                value={formData.amount}
                                onValueChange={handleChangeInCurrency}
                                hintText="amount to save"
                                ></CurrencyFormat> 
                            </div>
                            <div className="objectives__nav_btns">
                            <button onClick={() => changeFieldOnScreenNext()} className="objectives__next_btn">back</button>
                            <button onClick={() => changeFieldOnScreenNext('objectives_form-time')} className="objectives__next_btn">next</button>
                            </div>
                        </div>
                )


            case 'objectives_form-time':
                return(
                    <div ref={DOMFieldOnScreen} className="objectives__form-time fade-in-start">
                        <p>a goal needs a time frame to be fullfiled. When do you expect or need to achieve this goal:</p>
                        <div className="objectives__input">
                            <h2>select a date</h2> 
                        </div>
                        <div className="objectives__nav_btns">
                        <button onClick={() => changeFieldOnScreenNext()} className="objectives__next_btn">back</button>
                        <button onClick={() => changeFieldOnScreenNext(`objectives_form-title`)} className="objectives__next_btn">next</button>
                        </div>
                    </div>
                )

            case 'objectives_form-title':
                return(
                    <div ref={DOMFieldOnScreen} className="objectives__form-title fade-in-start">
                        <p>you don´t know what your aiming for until you know exactly how to call it.<br></br>
                        les put a cool name your objective shall we?:</p>
                        <div className="objectives__input">
                            <FormInput
                            placeHolder="exp: free myself from credit cards"
                            className="objectives__form-input-amount"
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            ></FormInput>
                        </div>
                        <div className="objectives__nav_btns">
                        <button onClick={() => changeFieldOnScreenNext()} className="objectives__next_btn">back</button>
                        <button onClick={() => changeFieldOnScreenNext(`objectives_form-recap`)} className="objectives__next_btn">next</button>
                        </div>
                    </div>
                )

            case 'objectives_form-recap':
                return(
                    <div ref={DOMFieldOnScreen} className="objectives__form-recap fade-in-start">
                        <p>so lest make sure that we have everything set up for your goal:</p>
                        <h5>{formData.title}</h5>
                        <ul>
                            <li>your goal: <br></br> {formData.kind}</li>
                            <li>the amount required:
                                <br></br> 
                                {<CurrencyFormat 
                                value={formData.amount} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                prefix={'$'}
                                ></CurrencyFormat>}
                            </li>
                            <li>when you expect to fullfil it: 
                                <br></br> 
                                {formData.date || "not defined yet"}</li>
                        </ul>
                        <div className="objectives__nav_btns">
                        <button onClick={() => changeFieldOnScreenNext(`objectives_form-recap`)} className="objectives__next_btn">create goal</button>
                        </div>
                    </div>
                )
        
            default:
                return
        }
    }

    return (
        <div className="objectives__container">
            <div className="objectives__title">
                <h1>objectives</h1> 
            </div>
            <div className="objectives__content">
                <div 
                className={`objectives__initial-promt ${initialPromptOpen ? null : `fade-out`}`}
                ref={DOMInitialPrompt}
                >
                    <p>
                    It seems like you haven´t set up any objectives yet.<br></br>
                    let´s start by thinking what is your next financial goal and set it up whenever you feel ready.
                    </p>
                    <button onClick={() => hideInitialPrompt()} className="objectives__add-objective">+</button>
                </div>
                {renderSelectedForm()}
            </div>
        </div>
    )
}