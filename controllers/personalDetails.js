const PersonalDetails = require('../models/personalDetails'); 
const fs = require('fs');
const { MongoClient, GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');

// MongoDB using GridFS
async function uploadImageToMongoDB(filePath, personalDetailsId) {
  const conn = mongoose.connection;
  const bucket = new GridFSBucket(conn.db());

  const uploadStream = bucket.openUploadStream('image.jpg', {
    metadata: {
      ownerId: personalDetailsId,
    },
  });

  const readStream = fs.createReadStream(filePath);

  readStream.pipe(uploadStream);

  return new Promise((resolve, reject) => {
    uploadStream.on('finish', (fileInfo) => {
      resolve(fileInfo);
    });

    uploadStream.on('error', (error) => {
      reject(error);
    });
  });
}

const storePersonalDetails = async (req, res) => {
  try {
    let filePath = '';
    if (req.file && req.file.path) {
      filePath = req.file.path;
    }

    const parentDetails = req.body.parentDetails || {};
    
    const personalDetails = new PersonalDetails({
      name: req.body.name || '',
      sem: req.body.sem || '',
      branch: req.body.branch || '',
      year: req.body.year || '',
      email: req.body.email || '',
      password: req.body.password || '',
      USN: req.body.USN || '',
      Phone: req.body.Phone || '',
      Adress: req.body.Adress || '',
      parentDetails: {
        FatherName: parentDetails.FatherName || '',
        Foccupation: parentDetails.Foccupation || '',
        MotherName: parentDetails.MotherName || '',
        Moccupation: parentDetails.Moccupation || '',
      },
      studyDetails: {
        SSLC: req.body.studyDetails?.SSLC || '', 
        PUC: req.body.studyDetails?.PUC || '', 
      },
    });

    const savedPersonalDetails = await personalDetails.save();

    if (filePath) {
      const uploadedImage = await uploadImageToMongoDB(filePath, savedPersonalDetails._id);
    }

    res.status(200).json({ message: 'Personal details saved successfully' });
  } catch (error) {
    console.error('Error occurred while storing personal details:', error);
    res.status(500).json({ error: 'An error occurred while storing personal details' });
  }
};

module.exports = storePersonalDetails;
