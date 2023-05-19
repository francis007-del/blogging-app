import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
const LoginPage=()=>{
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const {userInfo,setUserInfo}=useContext(UserContext)
    const navigate=useNavigate()
    const Login=async(e)=>{
      e.preventDefault();
      const response = await fetch("http://localhost:5000/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',    
        },
        body: JSON.stringify({ username,password}),
    })
    const json=await response.json()
    if(json!=="invalid cred")
    {
      localStorage.setItem("token",json)
      navigate("/")
    }
    else{
      alert(json)
    }
  }
    return(
        <div className="login-page">
        <div className="title">
           Login
        </div>
       <form className="register" onSubmit={Login}>
          <input type="text" placeholder="username"
           onChange={e=>setUsername(e.target.value)}/>
          <input type="password" placeholder="password" 
           onChange={e=>setPassword(e.target.value)}/>
          <button>Login</button>
       </form>
       </div>
    );
}
export default LoginPage;