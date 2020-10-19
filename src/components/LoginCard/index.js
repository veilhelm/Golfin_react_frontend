import React from "react"
import styled from "styled-components"
import { MorphicInput } from "../Inputs"
import MorphicButton from "../morphicButton"
import "./LoginCard.scss"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { postLoginUser } from "./LoginCard.http"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"

const MorphCard = styled.div`
    min-width: 300px;
    width: 100%;
    height: 100%;
    padding: 10px;
`


export default function LoginCard ({className}) {
    const history = useHistory()
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
          history.push("/balance")
        }
      })
    
    const handleSubmit = async (values) => {
        try {
            const token = await postLoginUser(values)
            console.log(token)
            localStorage.setItem("token", token)
            Toast.fire({
                icon: 'success',
            title: 'Signed in successfully'
            })
        } catch (error) {
            if(error.response.status === 400 ) Swal.fire('opps!', `${error.response.data}`, 'error')
            else Swal.fire('opps!', 'we couldn´t connect to the server, please make sure you are connected to the internet and try again', 'error')
        }
    }

    const formSchema = new Yup.object().shape({
        email: Yup.string().email().typeError('please provide a vaild email').required("required field"),
        password: Yup.string().required("required Field"),
    })

    return(
        <Formik
            onSubmit={handleSubmit}
            initialValues= {{email:"", password:""}}
            validationSchema= {formSchema}
        >
            {({handleSubmit, handleChange, errors, touched}) => (
                <Form onSubmit={handleSubmit} className={className}>
                    <MorphCard className={`login_card`}>
                        <label htmlFor="email">email</label>
                        <MorphicInput
                        type="text"
                        id="email" 
                        name="email"
                        placeHolder="me@mail.com"
                        className="login__input"
                        onChange={handleChange}
                        ></MorphicInput>
                        {errors.email && touched.email ? (
                        <p className="register__error">{errors.email}</p>
                        ) : null}
                        <label htmlFor="password">password</label>
                        <MorphicInput
                        id="password"
                        type="password"
                        name="password"
                        placeHolder="password"
                        className="login__input"
                        onChange={handleChange}
                        ></MorphicInput>
                        {errors.password && touched.password ? (
                        <p className="register__error">{errors.password}</p>
                        ) : null}
                        <div>
                            <MorphicButton className="login__btn">login</MorphicButton>
                            <a href="/forgotPassword" className="login__forgot">forgot password?</a>
                        </div>
                    </MorphCard>
                </Form>
            )}
        </Formik>
    )    

}