import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate, useParams } from "react-router-dom";
const formats=['image','link']
const EditPage=()=>{
    const [title,setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [file,setFile]=useState('')
    const [type,setType]=useState('');
    const [redirect,setRedirect]=useState(false)
    const {id}=useParams();
useEffect(()=>{
    fetch(`http://localhost:5000/post/${id}`)
     .then(resp=>resp.json().then(postInfo=>{
        setTitle(postInfo.title)
        setContent(postInfo.content);
        setSummary(postInfo.summary);
        setType(postInfo.type);
    }))
},[])
const EditPost=async (e)=>{
 e.preventDefault();
 const data=new FormData();
 data.set('title',title);
 data.set('summary',summary);
 data.set('content',content);
 data.set('type',type);
 console.log(file);
 if(file){
 data.set('file',file[0]);
}
 const resp=await fetch(`http://localhost:5000/edit/${id}`,{
    method:'PUT',
    body:data,
    credentials:'include'
 })
 if(resp.ok){
   setRedirect(true)
 }
}
if(redirect){
    return <Navigate to={'/'}/>
}
return(
   <form className="editpost" onSubmit={EditPost}>
    <input type="title" 
    placeholder={'Title'}
    value={title}
    onChange={e=>setTitle(e.target.value)}
    />
    <input type="summary"
     placeholder={'Summary'}
     value={summary}
     onChange={e=>setSummary(e.target.value)}
     />
    <input type="file" onChange={e=>setFile(e.target.files)}/>
    <input type="text" placeholder="Type of Blog" value={type} onChange={e=>setType(e.target.value)}/>
    <ReactQuill 
    value={content} 
    onChange={val=>setContent(val)}
    className="textarea"/>
    <button>Post</button>
   </form>
)
}
export default EditPage;