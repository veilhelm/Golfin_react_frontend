import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom"
import NavBar from './components/NavBar';
import MainView from './pages/MainView';
import Login from './pages/Login';
import Register from './pages/Register';
import Goals from './pages/Objectives';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import "./components/datePicker/DatePicker.scss"
import { getPayments } from './pages/Objectives/Obejctives.http';
import { useDispatch } from 'react-redux';
import { changePaymentsRecords } from './reducers/goalsReducer.actions';


function PrivateRoute (props) {
  const history = useHistory()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token') 
  useEffect(() => {
    async function getUserPayments(){
      try {
        const payments = await getPayments()
        dispatch(changePaymentsRecords(payments))
      } catch (error) {
        if(error.status === 401){
          localStorage.removeItem("token")
          history.push("/login")
        } 
      }
    }
    if(!token) history.push("/login")
    else getUserPayments()
  })


return <Route {...props}></Route>
}

function App() {
  return (
    <div className="MainContainer">
      <Router>
        <Switch>
          <PrivateRoute exact path='/balance' component={MainView}></PrivateRoute>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <PrivateRoute exact path="/goals" component={Goals}></PrivateRoute>
        </Switch> 
      </Router>
        <NavBar></NavBar>
    </div>
  );
}

export default App;
