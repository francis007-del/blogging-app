import React, { useContext, useEffect, useState} from "react";
import { useParams,Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Post from "../components/post";
const FullDetails=()=>{
    const {id}=useParams();
    const[postInfo,setPostInfo]=useState(null);
    const {setUserInfo,userInfo}=useContext(UserContext);
    const [similar,setSimilar]=useState([]); 
    const navigate = useNavigate();
    useEffect(()=>{
     fetch(`http://localhost:5000/post/${id}`)
     .then(resp=>resp.json().then(postInfo=>{
        setPostInfo(postInfo)
        console.log("hi",postInfo)
        postInfo&&fetch('http://localhost:5000/type/'+postInfo.type).then(
            resp=>resp.json().then(posts=>setSimilar(posts))
          )

    }))
    },[])
     const DeleteBlog=async(e)=>{
     e.preventDefault();
     fetch(`http://localhost:5000/post/${id}`,{
        method:'DELETE',
     }).then(
        resp=>resp.json().then(
          navigate("/")
        )
     )
     }
    if(!postInfo)return '';
    return(
        <div className="full-details-container">
        <div className="fulldetails">
        {
        postInfo.author.username===userInfo.username&&
        <button className="btn" style={{fontWeight:'bolder'}} onClick={DeleteBlog}>Delete Blog</button>
        }
       {
       postInfo.author.username===userInfo.username&&
        <Link to={`/edit/${postInfo._id}`} className="btn">Edit</Link>
        }
         <img className="fulldetailsimage" src={`http://localhost:5000/${postInfo.cover}`}/>
         <h1>Title: {postInfo.title}</h1>
         <h3 className="author">@ {postInfo.author.username}</h3>
         <div dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </div>
        <div className="menu">
           <div className="title">
            Similar Items
           </div>
           {
                similar.length&&similar.map(
                    post=>post._id!=postInfo._id?<Post {...post}/>:''
                )
           }
        </div>
        </div>
    )
}
export default FullDetails;