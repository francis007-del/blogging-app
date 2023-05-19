import React, { useState } from "react";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from "react-router-dom";
const formats=['image','link']
const CreatePost=()=>{
    const [title,setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [file,setFile]=useState('')
    const [redirect,setRedirect]=useState(false);
    const [type,setType]=useState('');
const createNewPost=async (e)=>{
 e.preventDefault();
 const data=new FormData();
 data.set('title',title);
 data.set('summary',summary);
 data.set('content',content);
 data.set('type',type);
 console.log(file);
 data.set('file',file[0]);
 const resp=await fetch('http://localhost:5000/post',{
    method:'POST',
    body:data,
    headers:{
      'token':localStorage.getItem('token')
    }
 })
 if(resp.ok){
   setRedirect(true)
 }
}
if(redirect){
    return <Navigate to={'/'}/>
}
return(
   <form className="createpost" onSubmit={createNewPost}>
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
    <input type="text"value={type} onChange={e=>setType(e.target.value)} placeholder="Type Of Blog"/>
    <ReactQuill 
    value={content} 
    onChange={val=>setContent(val)}
    className="textarea"/>
    <button>Post</button>
   </form>
)
}
export default CreatePost