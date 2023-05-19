const express=require('express');
const app=express();
const cors=require('cors')
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
mongoose.connect('mongodb+srv://bhatnaveed94:naveed123@cluster0.2cgdtvb.mongodb.net/?retryWrites=true&w=majority')
const User=require('./models/user')
const cookieParser=require('cookie-parser');
const multer=require('multer');
const Post=require('./models/post')
const fs=require('fs');
const uploadMiddleware=multer({dest:'uploads/'})
const secret='naveed123'
app.listen(5000);
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));
console.log("listening to port 5000")
app.post('/register',async (req,res)=>{
    const {username,password}=req.body;
    const bookmarks=[]
    const doc=await User.create({username,password,bookmarks});
    doc?res.status(200).json(doc):res.status(404).json(doc)
})
app.post('/login',async (req,res)=>{
const {username,password}=req.body;
const doc=await User.findOne({username});
const passOk=doc&&doc.password===password
if(passOk){
    jwt.sign({username,id:doc._id},secret,{},(err,token)=>{
        if(err)throw(err);
        res.cookie('token',token).json(token)
    })
}
else
res.json("invalid cred")
})
app.get('/profile',(req,res)=>{
    const token=req.header('auth-token')
    if(token==="")res.json("Invalid token")
    else{
    jwt.verify(token,secret,{},(err,info)=>{
        if(err){
            throw(err);
        }
        res.json(info);
    })
}
    
})
app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok')
})
app.post('/post',uploadMiddleware.single('file'),async (req,res)=>{
   const {originalname,path}=req.file;
   const parts=originalname.split('.');
   const ext=parts[parts.length-1];
   const newpath=path+'.'+ext;
   fs.renameSync(path,newpath);
   const {title,summary,content,type}=req.body;
   const {token}=req.headers;
   if(!token)res.json('error')
   else{
    jwt.verify(token,secret,{},async (err,info)=>{
        if(err)throw(err);
        const doc= await Post.create({
            title,summary,content,
            cover:newpath,author:info.id,type
           });
           res.json(doc);
    })    
}
})
app.get('/getposts',async(req,res)=>{ 
    res.json(await Post.find()
    .populate('author',['username'])
    .sort({createdAt:-1})
    .limit(20))
})


app.post('/getuser',async(req,res)=>{ 
    const {username}=req.body
    const user=await User.findOne({username})
    user?res.status(200).json({user:user}):res.status(404).json({user:user})
  })

app.get('/post/:id',uploadMiddleware.single('file'),async (req,res)=>{
 
  const {id}=req.params;
  const doc=await Post.findById(id).populate('author',['username'])
  res.json(doc);
})
app.get('/type/:id',uploadMiddleware.single('file'),async (req,res)=>{
 
    const {id}=req.params;
   
    const doc=await Post.find({type:id}).populate('author',['username']).limit(20);
    res.json(doc);
  })
app.put('/edit/:id',uploadMiddleware.single('file'),async (req,res)=>{
    const {id}=req.params;
    var docc=await Post.findById(id)
    var newPath=docc.cover;
    if(req.file){
        const {originalname,path}=req.file;
        const parts=originalname.split('.');
        const ext=parts[parts.length-1];
        newPath=path+'.'+ext;
        fs.renameSync(path,newPath);
    }
    const {title,summary,content,type}=req.body
    const doc=await Post.findByIdAndUpdate(id,{
        $set:{title:title,summary:summary,content:content,cover:newPath,type:type},
    })
    res.json(doc);

})
app.delete('/post/:id',async(req,res)=>{
    const {id}=req.params;
    var doc=await Post.findByIdAndDelete(id);
    if(doc)res.json(doc);
    else res.json('');
})
app.get('/bookmark/:id',async(req,resp)=>{
    const {id}=req.params;
    const {token}=JSON.parse(req.headers.token);
    if(token=='')resp.json(false)
    else{
    jwt.verify(token,secret,{},async(err,info)=>{
        if(err)throw(err);
        const doc=await User.findById(info.id);
        let res=doc.bookmarks;
        if(res)res=res.includes(id);
        else res=false;
        resp.json(res);
    })
}
})
app.put('/bookmark/:id',async(req,resp)=>{
    const {username,id}=req.body;
    const {id:bookmarkid}=req.params;
    if(!username)resp.send(false);
    else{
        const doc=await User.findById(id);
        const{username,password}=doc;
        const bookmarks=doc.bookmarks;
        if(bookmarks.includes(bookmarkid)){
         const updated=bookmarks.filter(x=>{return x!==bookmarkid});
         const doc=await User.findByIdAndUpdate(id,{
            $set:{username,password,bookmarks:updated}
         })
         resp.json(false);
        }
        else{ 
         const updated=[...bookmarks,bookmarkid]
         const doc=await User.findByIdAndUpdate(id,{
            $set:{username,password,bookmarks:updated}
         })
         resp.json(true);
        }
    }
}
)
app.post('/getbookmarks',async(req,resp)=>{
   const {token}=req.body;
   if(token=='')resp.json([]);
   else{
    jwt.verify(token,secret,{},async(err,info)=>{
        const user= await User.findById(info.id)
        .populate("bookmarks")
        // .exec();
        resp.json(user.bookmarks);
    })
   }
   //const doc=await User.findById(id);
   //if(doc)resp.json(doc.bookmarks); 
})
app.get('/getusers',async (req,resp)=>{
  const doc=await User.find().select('username');
  resp.json(doc);
})
app.get('/getposts/:id',async(req,res)=>{
    const {id}=req.params;
    var O_id=new mongoose.Types.ObjectId(id);
    const doc=await Post.find({author:O_id});
    res.json(doc);
})
app.get('/getuser/:id',async(req,res)=>{
    const {id}=req.params;
    const doc=await User.findById(id).select('username');
    res.json(doc);
    
})
// mongodb+srv://bhatnaveed94:naveed123@cluster0.2cgdtvb.mongodb.net/?retryWrites=true&w=majority
