import React from "react";
import Post from "../components/post";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
const Cateogory=()=>{
    
    const [posts,setPosts]=useState([]);
    const {id}=useParams();
    useEffect(()=>{
        fetch('http://localhost:5000/type/'+id).then(
            res=>res.json().then(
                posts=>setPosts(posts)))
                console.log(posts)
            },[])
    return(
    <div className="HomePage">
        {
            posts.length&&posts.map(
                post=><Post {...post}/>
            )
        }
    </div>
    )
}
export default Cateogory;