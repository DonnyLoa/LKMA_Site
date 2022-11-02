import { NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { useRef } from 'react';
import React, { useState } from "react";
import axios from "axios";
import { studentLogout, logIn } from "../profilePage/profileComponent";
import { adminLogout, adminLogIn } from "../adminPage/adminComponent";
import { expRegEmail, expRegPassword, regFirstName, regLastName, exportImage } from "../signUpPage/signUpComponent";
import { useEffect } from "react";

var exportEmail = 'N/A';
var exportPassword = '';
var inputFirstName = 'N/A';
var inputLastName = 'N/A';
var filePath = '';
var uploadFile = '';
var validLogin = false;
var login = false;
var adminLogin = "";
var inputName;

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function checkUppercase(str){
  for (var i=0; i<str.length; i++){
    if (str.charAt(i) === str.charAt(i).toUpperCase() && str.charAt(i).match(/[a-z]/i)){
      return true;
    }
  }
  return false;
};

function checkLowercase(str){
  for (var i=0; i<str.length; i++){
    if (str.charAt(i) === str.charAt(i).toLowerCase() && str.charAt(i).match(/[a-z]/i)){
      return true;
    }
  }
  return false;
};

// Exports Password for use in other components (reset)
export const changePassword = (newPassword) => {
    exportPassword = newPassword;
}
export const changeFilePath = (newFilePath) => {
  filePath = newFilePath;
}

export const loggingOut = () => {
  login = false;
  adminLogout();
  studentLogout();
}

export const GoToLogin = () => {
  exportEmail = expRegEmail;
  exportPassword = expRegPassword;
  inputFirstName = regFirstName;
  inputLastName = regLastName;
  filePath = "\\img\\" + exportImage;
  login = true;
  logIn();
  adminLogIn();
}

export const LoginComponent = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);

  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [uploadedFile, setUploadedFile] = useState({});
  const [user, setUser] = useState();

  useEffect(() => {
    console.log((localStorage.getItem("user")));
  }, [user]);

  const Login = () => {
    const formData = new FormData();
    formData.append('email', inputEmail.current.value);
    formData.append('password', inputPassword.current.value);
    exportEmail = inputEmail.current.value;
    exportPassword = inputPassword.current.value;    
    
    try {
      axios.post("http://localhost:3001/login", formData).then((response) => {
        if (response.data.message !== "Wrong combination") {
          validLogin = true;
          setLoginStatus("Successfully logged in");
    
          inputFirstName = response.data.result[0].first_name;
          inputLastName = response.data.result[0].last_name;    
          const fileName = response.data.fileName;
          filePath = response.data.filePath;

          if (filePath == "") {
            filePath = "\\img\\profile-blank-whitebg.png";
          }

          setUploadedFile({fileName, filePath});
          uploadFile = uploadedFile.filePath;
          const user = {exportEmail, inputFirstName, inputLastName};
          setUser(response.data);
          window.localStorage.setItem("user", JSON.stringify(user));
          window.localStorage.setItem("filePath", JSON.stringify(filePath));
        } else {
          setLoginStatus(response.data.message);
        }
      });
    } catch(err) {
      if (err.response.status === 500) {
        console.log("There was a problem with server.");
      } else {
        console.log(err.response.data.message);
      }
    }
  };

  function Validate() {
    validLogin = false;

    if (inputEmail.current.value === ""){
      console.log("No email provided")
      document.getElementById("emailError").innerHTML = "Please provide an email"
    } else if (!(validateEmail(inputEmail.current.value))){
      console.log("Email invalid")
      document.getElementById("emailError").innerHTML = "Please enter a valid email"
    }else{
      console.log("Email valid")
      document.getElementById("emailError").innerHTML = ""

      if(inputPassword.current.value === ""){
        console.log("No password provided")
        document.getElementById("passwordError").innerHTML = "Please provide a password"
      } else if (inputPassword.current.value.length < 8){
        console.log("Password must be 8 characters or longer in length")
        document.getElementById("passwordError").innerHTML = "Password must be 8 characters or greater in length"
      } else if (!(checkUppercase(inputPassword.current.value))){
        console.log("Password must contain at least one uppercase letter")
        document.getElementById("passwordError").innerHTML = "Password must contain at least one uppercase letter"
      } else if (!(checkLowercase(inputPassword.current.value))){
        console.log("Password must contain at least one lowercase letter")
        document.getElementById("passwordError").innerHTML = "Password must contain at least one lowercase letter"
      } else if (inputPassword.current.value.length > 7 && 
        checkUppercase(inputPassword.current.value) && 
        checkLowercase(inputPassword.current.value)) {
          console.log("Valid Password")
          document.getElementById("passwordError").innerHTML = ""
          Login();
      }
    } 
  }

  const checkAdmin = async () => {
    adminLogin = false;

    try {
      axios.post("http://localhost:3001/admin").then((response) => {
        const adminEmails = response.data.result;
        var i;

        for (i = 0; i < adminEmails.length; i++) {
          if (adminEmails[i].email == exportEmail) {
            adminLogin = true;
          }
        }

        if (adminLogin) {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      });
    } catch(err) {
      if (err.response.status === 500) {
        console.log("There was a problem with server.");
      } else {
        console.log(err.response.data.message);
      }
    }
  };

  const MoveToProfile = async (e) => {
    e.preventDefault();
    
    if (validLogin) {
      login = true;
      logIn();
      adminLogIn();

      //populate adminLogin with the admin email address
      checkAdmin();
      return 0;      
    } else {
      console.log("Incorrect login info. Please enter the correct email and password.")
      document.getElementById("passwordError").innerHTML 
        = "Incorrect login info. Please enter the correct email and password."
    }
  }

    return (
      <div id='login' className='text-center'>
        <div className='container'>
          <div className='row'>
            <div className="login-form">
              {/*
              <div class="form-container sign-in-container">
                  <form action="#">
                      <h1>Sign in</h1>
                      <div id="emailError"></div>
                      <div id="passwordError"></div>
                      <input ref={inputEmail} id="email" type="email" placeholder="Enter your email" required/>
                      <input ref={inputPassword} id="password" type="password" placeholder="Password" minlength="8" required/>
                      <a href="#">Forgot your password?</a>
                      <button type="button" onClick={validate} >Sign In</button>
                  </form>
              </div>
              <div class="overlay-container">
                  <div class="overlay">
                      <div class="overlay-panel overlay-right">
                          <h1>Don't have an account with us yet?</h1>
                          <p>Click the button below to go to the Sign Up page.</p>
                          <NavLink className="nav-link" to="/signup">
                            <button class="ghost" id="logIn">Sign Up</button>
                          </NavLink>
                      </div>
                  </div>
              </div>
              */}
              <div className="form-container sign-in-container">
                <form action="#">
                  <h1>Sign in</h1>
                  <div id="emailError"></div>
                  <div id="passwordError"></div>
                  <input ref={inputEmail} data-testid="inputEmail" id="email" 
                    type="email" placeholder="Enter your email"
                    className="emailInput" onChange={(e) => {
                      setEmail(e.target.value);
                      Validate();
                  }} required/>
                  <input ref={inputPassword} data-testid="inputPassword" 
                    id="password" type="password" placeholder="Password" 
                    className="passwordInput" minLength="8" onChange={(e) => {
                      setPassword(e.target.value);
                      Validate();
                  }} required/>
                  <a href="/forgot">Forgot your password?</a>
                  <button type="button" data-testid="loginSubmit" 
                    onClick={MoveToProfile}>Sign In
                  </button>
                </form>
              </div>
              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-right">
                    <h1>Don't have an account with us yet?</h1>
                    <p>Click the button below to go to the Sign Up page.</p>
                    <NavLink className="nav-link" to="/signup">
                      <button className="ghost" id="logIn">Sign Up</button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    )
  }

  export {exportEmail, exportPassword, inputFirstName, inputLastName, filePath, uploadFile, login};