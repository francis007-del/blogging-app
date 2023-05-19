import React, { useEffect, useState } from "react";
import Post from "../components/post";
import SearchBar from "../components/searchbar";
const HomePage=()=>{
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        try{

            fetch('http://localhost:5000/getposts').then(
                res=>res.json().then(
                    posts=>setPosts(posts)))
                    console.log(posts)
        }
        catch(err){
            console.log(err)
        }
    },[])
    return(
        <div className="homepage-container">
              <SearchBar/>
    <div className="HomePage">
        {
            posts.length&&posts.map(
                post=><Post {...post}/>
            )
        }
        {/* <div className="footer">© Naveed</div> */}
    </div>
    </div>
    )
}
export default HomePage