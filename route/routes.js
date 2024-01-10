const express=require("express");
const route=express.Router();

route.post("/api/signUp",require("../controllers/signup"));
 route.post("/api/login", require("../controllers/login"));
 route.post("/api/entryexit",require("../controllers/libraryEntryExit"));
 route.post("/api/personalDetails",require("../controllers/personalDetails"));

  module.exports=route;