import React, { useEffect, useRef, useState } from "react"
import "./Objectives.scss"
import CurrencyFormat from "react-currency-format"
import Calendar from "../../components/datePicker"
import moment from "moment"
import { getGoals, postNewGoal } from "./Obejctives.http"
import List from "../../components/List"
import { useDispatch, useSelector } from "react-redux"
import { changeGoals,  updatePaymentsRecords } from "../../reducers/goalsReducer.actions"
import PaymentsGoalsChart from "../../components/AreaVsLineChart"
import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";
import GoalsDataCard from "../../components/GoalsDataCard"

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

export default function Goals () {
    const [initialPromptOpen, setInitialPromptOpen] = useState(true)
    const [selectedForm, setSelectedForm] = useState("")
    const [formData, setFormData] = useState({amount:"", title:""})
    const [loading, setLoading] = useState(true)
    const [selectedGoalData, setSelectedGoalData] = useState('chart')
    const [selectedGoal, setSelectedGoal] = useState("")
    const goals = useSelector(state => state.goalsReducer.goals)
    const dispatch = useDispatch()
    const DOMInitialPrompt = useRef()
    const DOMFieldOnScreen = useRef()
    const DOMlist = useRef()
    const DOMcontent = useRef()
    const DOMchart = useRef()

    useEffect(() => {
       async function getUserGoals() {
           const goals = await getGoals()
           if(goals.length > 0) DOMcontent.current.classList.add('hidden')
           dispatch(changeGoals(goals))
           setLoading(false)
       }
       getUserGoals()
    },[])

    //--------------- FUNCTIONS TO CHANGE THE VIEW-----------------------------------

    const hideInitialPrompt = () => {
        setInitialPromptOpen(false)
        setTimeout(()=>{
            DOMInitialPrompt.current.classList.add('hidden')
            setSelectedForm("objectives__form-kind")
        }, 400)
    }

    const hideList = () => {
        DOMchart.current.classList.add('fade-out')
        DOMlist.current.classList.add('fade-out')
        setTimeout(() => {
            DOMchart.current.classList.add('hidden', 'hidden-list')
            DOMlist.current.classList.add('hidden', "hidden-list")
            DOMcontent.current.classList.remove('hidden')
            setSelectedForm("objectives__form-kind")
        }, 500)
    }

    const changeFieldOnScreenNext = (nextField) => {
        DOMFieldOnScreen.current.classList.add('fade-out')
        setTimeout(() => {
            setSelectedForm(nextField)
        }, 500);
    }

    const renderSelectedGoalInfo = (selected) => {
        if(selected ==="chart") return (<PaymentsGoalsChart goalId={selectedGoal}></PaymentsGoalsChart>)
        if(selected === "data") return (<GoalsDataCard goalId={selectedGoal}></GoalsDataCard>)
    }

    //--------------- FUNCTIONS TO HANDLE THE INPUTS-----------------------------------

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

    const handleCloseCalendar = (date) =>{
        setFormData(formData =>{
            formData.date = moment(date.date).format("YYYY-MM-DD")
            return {...formData}
        })
    }

    const handleSubmit = async () => {
        formData.initialDate =  moment(new Date()).format("YYYY-MM-DD")
        const {goal, payment} = await postNewGoal(formData)
        dispatch(changeGoals([goal]))
        dispatch(updatePaymentsRecords([payment]))
        DOMFieldOnScreen.current.classList.add('fade-out')
            setTimeout(() => {
                setSelectedForm("")
                DOMcontent.current.classList.add('hidden')
                DOMlist.current.classList.remove('hidden','hidden-list','fade-out')
                DOMchart.current.classList.remove('hidden','hidden-list','fade-out')
            }, 450);
    }


    //--------------------------------- FORM -----------------------------------

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
                        <button disabled={formData.kind ? false: true} onClick={() => changeFieldOnScreenNext('objectives_form-amount')} className="objectives__next_btn">next</button>
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
                            <button disabled={formData.amount.length === 0 ? true: false} onClick={() => changeFieldOnScreenNext('objectives_form-time')} className="objectives__next_btn">next</button>
                            </div>
                        </div>
                )


            case 'objectives_form-time':
                return(
                    <div ref={DOMFieldOnScreen} className="objectives__form-time fade-in-start">
                        <p>a goal needs a time frame to be fullfiled. When do you expect or need to achieve this goal:</p>
                        <div className="objectives__calendar">
                            <Calendar onClose={handleCloseCalendar}></Calendar>
                        </div>
                        <div className="objectives__nav_btns">
                        <button onClick={() => changeFieldOnScreenNext()} className="objectives__next_btn">back</button>
                        <button disabled={formData.date ? false: true} onClick={() => changeFieldOnScreenNext(`objectives_form-title`)} className="objectives__next_btn">next</button>
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
                        <button disabled={formData.title ? false: true} onClick={() => changeFieldOnScreenNext(`objectives_form-recap`)} className="objectives__next_btn">next</button>
                        </div>
                    </div>
                )

            case 'objectives_form-recap':
                return(
                    <div ref={DOMFieldOnScreen} className="objectives__form-recap fade-in-start">
                        <p>so lest make sure that we have everything set up for your goal:</p>
                        <i className="fas fa-award fa-2x"></i>
                        <h5>{formData.title}</h5>
                        <ul>
                            <li>your goal: <br></br> {formData.kind.replaceAll("_"," ")}</li>
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
                                {formData.date}</li>
                        </ul>
                        <div className="objectives__nav_btns">
                        <button onClick={() => handleSubmit()} className="objectives__next_btn">create goal</button>
                        </div>
                    </div>
                )
        
            default:
                return
        }
    }


    //--------------- RENDER OF THE PAGE-----------------------------------
    return (
        <div className="objectives__container">
            <div className="objectives__title">
                <h1>objectives</h1> 
            </div>

            <div ref={DOMcontent} className="objectives__content">

                {
                !loading && goals.length === 0  && 
                <div className={`objectives__initial-promt ${initialPromptOpen ? null : `fade-out`}`}
                ref={DOMInitialPrompt}
                >
                    <p>
                    It seems like you haven´t set up any objectives yet.<br></br>
                    let´s start by thinking what is your next financial goal and set it up whenever you feel ready.
                    </p>
                    <button onClick={() => hideInitialPrompt()} className="objectives__add-objective">+</button>
                </div>
                }
                {renderSelectedForm()}
            </div>

            {!loading && goals.length !== 0 &&
            <>
                <SimpleBarReact style={{ maxHeight: 420, minWidth: 320}}>
                    <div ref={DOMchart} className="objectives__chart">
                        {renderSelectedGoalInfo(selectedGoalData)}
                    </div>
                </SimpleBarReact>
                <div ref={DOMlist} className="objectives__list">
                    <List>
                        {goals.map( goal => (
                            <List.element 
                                key={`g-${goal._id}`} 
                                id={`g-${goal._id}`}
                                onClick={(id) => setSelectedGoal(id)}
                            >
                                <List.title>{goal.title}</List.title>
                                <List.section>
                                    <List.text>num quotes: {goal.numberOfQuotes}</List.text>
                                    <List.text>quote: {<CurrencyFormat
                                    value={goal.quote} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    prefix={'$'}
                                    decimalScale={0}
                                    ></CurrencyFormat>}</List.text>
                                    <List.text>due to: {moment(goal.date).format("YYYY-MM-DD")}</List.text>
                                </List.section>
                                <List.icon>
                                    <i className="fas fa-award"></i>
                                </List.icon>
                            </List.element>
                        ))
                        }
                    </List>
                    <div className="objectives__select-goal-btns">
                        <span onClick={(e) => setSelectedGoalData('chart')} className="objectives__select-goal left"></span>
                        <span onClick={(e) => setSelectedGoalData('data')} className="objectives__select-goal right"></span>
                    </div>
                    <button onClick={() => hideList()} className="objectives__add-objective">+</button>
                </div>
            </>
            }
        </div>
    )
}