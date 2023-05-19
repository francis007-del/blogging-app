import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import {BsFillBookmarkFill} from 'react-icons/bs'
import {CiBookmark} from 'react-icons/ci'
const Post=({_id,title,summary,content,cover,author})=>{
    const {userInfo}=useContext(UserContext)
    const [Bookmarked,setBookmarked]=useState(false)
    useEffect(()=>{
        const handel=async()=>{
        if(localStorage.getItem('token')&&userInfo.username){
        fetch('http://localhost:5000/bookmark/'+_id,{
         headers:{
            'Content-type':'application/json',
            'token':JSON.stringify({token:localStorage.getItem('token')}),
        },
         method:'GET',
        }).then(res=>res.json().then(res=>setBookmarked(res)));
    }
    }
    handel()}
    ,[])
    const ToggleBookmark=async ()=>{
     await fetch('http://localhost:5000/bookmark/'+_id,{
        method:'PUT',
        body:JSON.stringify(userInfo),
        headers:{'Content-Type': 'application/json'},
     }).then(resp=>resp.json().then(res=>setBookmarked(res)));
    }
    return(
     <div>
     <div className="post">
      <img className="image" src={'http://localhost:5000/'+cover}/>
      <div className="Details">
       <div className="title">
       {title}
       </div>
       <div className='author'>
       {(author.username)?`@${author.username}`:''}
       </div>
       <div className="discription">
        {summary}
       </div>
       <div className='bottom'>
       <a href={`/post/${_id}`} className='btn'>Read More</a>
       {
        userInfo&&(
            <div className='bookmark' onClick={ToggleBookmark}>
            {Bookmarked?<BsFillBookmarkFill size={40}/>:<CiBookmark size={40}/>}
            </div>
        )
       }
       </div>
      </div>
     </div>
     </div>
    );
}
export default Post;