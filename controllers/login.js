const mongoose=require("../models/login");
const logIn=mongoose.model("loginDetails");
const bcrypt=require("bcrypt");
const token=require("jsonwebtoken");
const login=async (req, res) => {
    try {

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

  
        // if User not found, create a new entry
        const loginEntry = new logIn({
          email: req.body.email,
          password:hashedPassword,

        });
        token.sign({loginEntry},"secretKey",{expiresIn:'300s'},(err,tok)=>{
            res.json({
                tok
            })
        })
        
        await loginEntry.save(); 

      }


    catch (err) {
      console.error("Error handling entry/exit:", err.message);
      res.status(500).json({ error: "Internal Server Error" });


    }
  }

  module.exports=login;