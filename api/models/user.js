const mongoose=require('mongoose')
const {Schema,model}=mongoose
const UserSchema=new Schema({
    username:{type:String,required:true,min:4,unique:true},
    password:{type:String,required:true},
    bookmarks:{type:Array,ref:'Post'},
});
const UserModel=model('User',UserSchema);
module.exports=UserModel;