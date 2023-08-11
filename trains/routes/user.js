const express = require("express");
const router = express.Router();
const User = require('../models/userModel');
const { generateToken} = require('../jwt');
const axios = require('axios');

router.post('/', async (req, res) => {
  const { companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;

  try {
    const newUser = new User({
      companyName,
      ownerName,
      rollNo,
      ownerEmail,
      accessCode,
    });
    const savedUser = await newUser.save();
    const token = generateToken({ rollNo: savedUser.accessCode });
    res.status(200).json({ user: savedUser, token });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
