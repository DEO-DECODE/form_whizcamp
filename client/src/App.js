import React from "react";
import UserForm from "./components/UserForm";
import img1 from "./assets/Group.png";
import "./App.css";
const App = () => {
  return (
    <div className="App">
      <div className="header">
        <img src={img1} alt="HERE IT is"></img>
        <h1 id="heading">Build your portfolio in minutes</h1>
      </div>

      <div className="container">
        <div className="leftContainer">
          <div className="text1">Build your Portfolio instantly !!</div>
          <div className="text2">Start testing in minutes !</div>
        </div>
        <div className="rightContainer">
          <UserForm />
        </div>
      </div>
    </div>
  );
};

export default App;
