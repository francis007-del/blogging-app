import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
const Header=()=>{
    const {setUserInfo,userInfo}=useContext(UserContext);
    const [username,setUsername]=useState('');
    useEffect(()=>{
        const token=localStorage.getItem("token")
        const handle=async()=>{
        await fetch('http://localhost:5000/profile',{
        credentials:'include',
         method: 'GET',
         headers: {
            'Content-Type': 'application/json', 
            'auth-token':localStorage.getItem("token") 
        }
     }).then(resp=>
        resp.json().then(userInfo=>{
        setUserInfo(userInfo);
        setUsername(userInfo.username);
        
     }))
}
handle();
}
,[])
    function Logout(){
        fetch('http://localhost:5000/logout',{
            credentials:'include',
            method:'POST'
        })
         setUserInfo(null)
         setUsername('');
         localStorage.removeItem('token')
    }
   
    return(
        <>
        <div className="header">
            <Link to="/" className="logo">MyBlog</Link>
            <div className="links">
            <a href="/type/art" className="link">ART</a>
            <a href="/type/technology" className="link">TECHNOLOGY</a>
            <a href="/type/food" className="link">FOOD</a>
            <a href="/type/travel" className="link">TRAVEL</a>
            <a href="/type/education" className="link">EDUCATION</a>
            <a href="/bookmarks" className="link">BOOKMARKS</a>
        {
            username&&(
                <>
                  <Link to="/create" className="write">Write</Link>
                  <a onClick={Logout}>Logout ({userInfo.username})</a>
                </>
                )
            
        }
        {
            !username&&(
                <>
               <div className="Navbar">
                 <a href="/login">Login</a>
                 <a href="/register">Register</a>
               </div>
               </>
            )
        }        
       </div>
       </div>
       <div className="line"></div>
       </>
    );
}
export default Header;