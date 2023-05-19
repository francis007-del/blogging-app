import React, { useEffect, useState } from "react";
import { Navigate,useNavigate } from "react-router-dom";
const SearchBar=()=>{
    const [users,setUsers]=useState([]);
    const [text,setText]=useState('');
    const [show,setShow]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
     const handle=async()=>{
     await fetch('http://localhost:5000/getusers',{
        method:'GET'
     }).then(res=>res.json().then(res=>{
        setUsers(res);
        setShow(res.slice(0,5));
     }))
    }
    handle();
},[])
const HandleChange=(e)=>{
    setText(e.target.value)
    console.log(text);
   const temp=users.filter(user=>user.username.includes(text))
   setShow(temp)
}
    return(
        <div className="searchbox">
            <h2 className="users">Users</h2>
           <input style={{width:'80%',marginBottom:'20px'}} onChange={e=>{
            HandleChange(e)
            }} value={text} placeholder="Search User"/>
            {
             show.length&&show.map((user,index)=>
             <h2 
             className="author searchitem" onClick={e=>navigate(`/${user._id}`)}>{`${index+1}. @${user.username}`}
             </h2>
             )
            }
        </div>
    )
}
export default SearchBar;