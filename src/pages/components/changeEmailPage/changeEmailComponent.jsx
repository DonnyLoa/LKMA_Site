import { NavLink } from "react-router-dom";
import {useRef} from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

export const ChangeEmailComponent = (props) => {

  const inputEmail=useRef(null);
  const inputEmailConfirm=useRef(null);

  const [email, setEmail] = useState("");

  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = () => {
        const data = {email: email, newEmail: newEmail};
        axios.post("http://localhost:3001/email", data).then((response) => {
        console.log(response.data);
        }); 
    };

  function validate() {
    if(inputEmail.current.value === ""){
        console.log("No email provided")
        document.getElementById("emailError").innerHTML = "Please provide an email"
      }else if(validateEmail(inputEmail.current.value)){
        console.log("Email valid")
        document.getElementById("emailError").innerHTML = ""
      }else{
        console.log("Email invalid")
        document.getElementById("emailError").innerHTML = "Please enter a valid email"
      }


      if(inputEmail.current.value === inputEmailConfirm.current.value && inputEmail.current.value !== "") {
        console.log("Emails match")
        document.getElementById("matchingError").innerHTML = ""
      }else if(inputEmail.current.value === "" || inputEmailConfirm.current.value === ""){
        //Doing nothing as error already given by another error message
        document.getElementById("matchingError").innerHTML = ""
      }else{
        console.log("Email and confirmation email do not match")
        document.getElementById("matchingError").innerHTML = "Email and confirmation email do not match"
      }
  }



    return (
      <div id='change-email' className='text-center'>
        <div className='container'>
          <div className='row'>
            <div class="change-email-form">
                <div class="form-container submit-container">
                    <form action="#">
                        <h1>Change Email</h1>
                        <div id="emailError"></div>
                        <div id="matchingError"></div>
                        {/* THIS IS A TEMP SOLUTION FOR EMAIL CHANGE*/}
                        <input onChange={(e) => {setEmail(e.target.value);}} ref={setEmail} id="email" type="email" placeholder="Old Email"/>

                        <input ref={inputEmail} id="email" type="email" placeholder="Email" required/>
                        <input onChange={(e) => {setNewEmail(e.target.value);}} ref={setNewEmail} id="EmailConfirm" type="email" placeholder="Confirm Email" required/>
                        <button type="button" onClick={changeEmail}>Submit</button>
                    </form>
                </div>
                <div class="overlay-container">
                <div class="overlay">
                        <div class="overlay-panel overlay-right">
                          <img src="/img/resetpassword.jpg"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    )
  }