const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the User model

module.exports = (db) => {
  // Signup route
  router.post('/signup', async (req, res) => {
    try {
      const { firstName, lastName, email, password, dateOfBirth, constituency, uvc } = req.body;

      // Add validation logic here (e.g., check for required fields)

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      // Create a new user instance using the User model
      const newUser = new User({
        firstName,
        lastName,
        email,
        password, // Note: In production, password should be hashed
        dateOfBirth,
        constituency,
        uvc,
      });

      // Save the new user to the database
      await newUser.save();

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Signin route
  router.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body;

      // Add validation logic here (e.g., check for required fields)

      // Find the user in the database
      const user = await User.findOne({ email, password });

      // Check if the user exists and the password is correct
      if (user) {
        res.json({ message: 'Signin successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};
