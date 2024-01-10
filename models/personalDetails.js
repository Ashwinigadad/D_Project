const mongoose = require('mongoose');

const personalDetailsSchema = new mongoose.Schema({
  photo: {
    fileId: mongoose.Schema.Types.ObjectId, 
    filename: String, 
    contentType: String, 
  },
  name:{
    type:String,
    // required:true
  },
  sem:{
    type:String,
    // required:true
  },
  branch:{
    type:String,
    // required:true

  },
  year:{
    type:String,
    // required:true
  },
  email: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  USN: {
    type: String,
    // required: true,
  },
  Phone: {
    type: String,
    // required: true,
  },
  Adress:{
    type:String,
    // required:true
  },
  parentDetails:{
    FatherName:{
        type:String,
        // required:true
    },
    Foccupation:{
        type:String,
        // required:true

    },
    MotherName:{
        type:String,
        // required:true
    },
    Moccupation:{
        type:String,
        // required:true
    }

  },
  studyDetails:{
    SSLC:{
        type:String,
        // required:true
    },
    PUC:{
        type:String,
        // required:true
    }

  }
  

});

module.exports = mongoose.model('PersonalDetails', personalDetailsSchema);
