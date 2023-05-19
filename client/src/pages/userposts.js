import { useState,useEffect } from "react";
import React from "react";
import Post from "../components/post";
import { useParams } from "react-router-dom";
const UserPosts=()=>{
    const {id}=useParams();
    const [posts,setPosts]=useState([]);
    const [user,setUser]=useState('');
    useEffect(()=>{
        const handle=async()=>{
        await fetch('http://localhost:5000/getuser/'+id,{
            method:'GET'
        }).then(res=>res.json().then(res=>setUser(res)));
        await fetch('http://localhost:5000/getposts/'+id,{
            method:'GET'
        }).then(res=>res.json().then(res=>setPosts(res)))
    }
    handle();
},[])
    return(
        <div>
            <h2 className="authorname">@{user.username}</h2>
          {posts.length&&posts.map(post=><Post {...post}/>)}
        </div>
    )
}
export default UserPosts;