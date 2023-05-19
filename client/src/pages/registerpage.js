import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const RegisterPage=()=>{
   const navigate=useNavigate()
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    async function Register(e){
      e.preventDefault();
      console.log(username,password);
      const res=await fetch('http://localhost:5000/getuser',{
         method:'POST',
         body:JSON.stringify({username,password}),
         headers:{'Content-Type':'application/json'},
       }).catch(err=>{
         console.log(err)
       })
       console.log("res",res)
       if(res&&res.status===404){
        const result= await fetch('http://localhost:5000/register',{
        method:'POST',
        body:JSON.stringify({username,password}),
        headers:{'Content-Type':'application/json'},
      })
      if(result&&result.status===200){
         alert("login successful, redirecting to homepage...")
         navigate('/')
      }
   }
   else{
      alert("username is taken")
   }
    }
    return(
        <div className="register-page">
        <div className="title">
           Register
        </div>
       <form className="register" onSubmit={Register}>
          <input type="text" placeholder="username"
           value={username}
          onChange={e=>setUsername(e.target.value)}
          />
          <input type="password" placeholder="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          />
          <button>Register</button>
       </form>
       </div>
    );
}
export default RegisterPage;