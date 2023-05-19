import { useState,useEffect } from "react";
import React from "react";
import Post from "../components/post";
const BookMarks=()=>{
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        setPosts([]);
        const handle=async()=>{
     if(localStorage.getItem("token")){
        await fetch('http://localhost:5000/getbookmarks',{
            method:'POST',
            body:JSON.stringify({token:localStorage.getItem('token')}),
            headers:{ 'Content-Type': 'application/json'}
        }).then(res=>res.json().then(
           res=>setPosts(res) 
        ))
    }

}
handle();
}
,[])
    return(
        <div>
            {
             posts&&posts.map(post=><Post {...post}/>)
            }
        </div>
    )
}
export default BookMarks;