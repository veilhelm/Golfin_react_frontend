import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import MainView from './pages/MainView';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom"
import Login from './pages/Login';

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
        </Switch>
      </Router>
        <NavBar></NavBar>
    </div>
  );
}

export default App;
