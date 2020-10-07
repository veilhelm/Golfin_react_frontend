import React from 'react';
import NavBar from './components/NavBar';
import MainView from './pages/MainView';


function App() {
  return (
    <div className="MainContainer">
      <MainView></MainView>
      <NavBar></NavBar>
    </div>
  );
}

export default App;
