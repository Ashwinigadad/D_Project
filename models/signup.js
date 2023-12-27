const mongoose=require("mongoose")
const librarySchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true
    },
    
        
})

module.exports=mongoose.model("SignUp",librarySchema);