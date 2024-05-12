const express=require("express");
const route=require("./route/routes");

const app=express();
app.use(express.json());
const port=8060;

app.use("/",route);


const mongoos=require("mongoose");
mongoos.connect("mongodb+srv://ashwinigadad3:2004%40ashu@cluster0.ewtr0b5.mongodb.net/D_Project")
.then(()=>{
    console.log("Mongodb got connected");
})
.catch((err)=>{
    console.log(err)
    console.log("error");
})


app.listen(port,()=>{
    console.log(`The server started on port ${port}`);
})