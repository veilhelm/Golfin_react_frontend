import React, {  useRef } from "react"
import styled from "styled-components"
import { LightInput } from "../Inputs"
import RoundedButton from "../roundedButton"
import Selector from "../Selector"
import "./TransactionForm.scss"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { expCategories, incCategories } from "../../utils/transactionCategories"

const MainWrapper = styled.div`
    background: #333333;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 120px;
    z-index:1040;
    transform: translateY(-30%);
    animation: moveInBottom 1s ease-out 1s;
    animation-fill-mode: backwards;
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas: 
    ". a a a a . c c c c ."
    ". d d d d . t t t t ."
    ". . . . . . . . . . .";
    align-items: start;
    justify-items: center;
    position:relative;
`
export default function TransactionForm ({kind}) {
    const DOMtranscForm = useRef(null)
    const DOMtagsInputToolTip = useRef(null)

    const handleSubmit = (e, values, errors) => {
        e.preventDefault() 
        if(Object.keys(errors).length !== 0) return console.log(errors)
        if(Object.values(values).some(value => value === "")) return console.log(values)
        values.tags = values.tags.split(",")
        values.category = values.category.replace(" ", "_")
        console.log(values)
    }

    const tooltipAppear = () => {
        DOMtagsInputToolTip.current.classList.add("appear")
    }
    const tooltipDisappear = () => {
        DOMtagsInputToolTip.current.classList.remove("appear")
    }

    const formSchema = Yup.object().shape({
        ammount: Yup.number().required("required field"),
        category: Yup.string().required("required field"),
        description: Yup.string().required("required field"),
        tags: Yup.string().required("required field"),
    })
    
    return(
        <Formik
        initialValues={{ammount:"", category:"--category--", description:"", tags:""}}
        validationSchema={formSchema}
        > 
        {({values, setValues, errors, handleChange }) => ( 
                <Form onSubmit={(e) => handleSubmit(e, values, errors)}>
            <MainWrapper ref={DOMtranscForm} className="transcForm">
                <LightInput 
                    className="transcForm_input-ammount"
                    type="number"
                    id="someId"
                    name="ammount"
                    kind={kind}
                    placeHolder="ammount"
                    onChange={handleChange}
                    value={values.ammount}
                    ></LightInput>
                <Selector
                    className="transcForm_input-category"
                    id="someId"
                    name="category"
                    options={kind === "inc" ? incCategories : expCategories}
                    kind={kind}
                    placeHolder="category"
                    onChange={handleChange}
                    value={values.category}
                    >
                </Selector>
                <LightInput 
                    className="transcForm_input-description"
                    type="text"
                    id="someId"
                    name="description"
                    kind={kind}
                    placeHolder="description"
                    onChange={handleChange}
                    value={values.description}
                    ></LightInput>
                    <div className="transcForm-tags">
                    <LightInput 
                        className="transcForm_input-tags"
                        type="text"
                        id="someId"
                        name="tags"
                        kind={kind}
                        placeHolder="tags"
                        onFocus={tooltipAppear}
                        onBlur={tooltipDisappear}
                        onChange={handleChange}
                        value={values.tags}
                    ></LightInput>
                    <span ref={DOMtagsInputToolTip} className="tooltip-input-tags">write your custom tags separated by a comma like so: "family, business, tips"</span>
                    </div>
                <RoundedButton 
                className="transcForm_input-button"
                type="submit"
                kind={kind}
                size="4rem"
                >+</RoundedButton>
        </MainWrapper>
            </Form>
        )}
        </Formik>
    )
}