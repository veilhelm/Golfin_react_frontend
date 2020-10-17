import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom"
import NavBar from './components/NavBar';
import MainView from './pages/MainView';
import Login from './pages/Login';
import Register from './pages/Register';
import Goals from './pages/Objectives';


function PrivateRoute (props) {
  const history = useHistory()
  useEffect(() => {
    const token = localStorage.getItem('token') 
    if(!token) history.push("/login")
  })
return <Route {...props}></Route>
}

function App() {
  return (
    <div className="MainContainer">
      <Router>
        <Switch>
          <Route exact path='/' component={MainView}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/goals" component={Goals}></Route>
        </Switch> 
      </Router>
        <NavBar></NavBar>
    </div>
  );
}

export default App;
