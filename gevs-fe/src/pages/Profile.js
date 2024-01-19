import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, 
  Paper,
  Avatar,
} from '@mui/material';

const Profile = () => {
 
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch user data from the backend API
    fetch('http://localhost:5001/api/users/profile') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    };

  const handleSave = () => {
    setIsEditing(false);
    console.log('User data updated:', userData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);

    // Simulate a delay and then show the account deleted message
    setTimeout(() => {
      setIsAccountDeleted(true);
    }, 1000); // Wait for 1 second
  };

  const handleCloseAccountDeleted = () => {
    setIsAccountDeleted(false);
    navigate('/signup'); // You can customize the route
  };

  const profileContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh', // Adjust this value as needed
  };

  const paperStyle = {
    padding: '20px',
    maxWidth: '100%',
    width: '100%',
    textAlign: 'center',
    margin: '0px',
  };

  const avatarStyle = {
    width: '150px',
    height: '150px',
    margin: '0 auto',
  };

  const actionsStyle = {
    display: 'flex',
    justifyContent: 'center', // Center the buttons horizontally
    marginTop: '10px',
  };

  
const buttonSpacing = {
  marginLeft: '10px', // Adjust this value to control the space between buttons
};
  return (
    <div style={profileContainerStyle}>
      <Paper elevation={3} style={paperStyle}>
        <Avatar
          alt="User Profile"
          src="./images/man.jpg" // Replace with your profile photo URL
          style={avatarStyle}
        />
        <h2>{userData.name}</h2>
        <p>Email: {userData.email}</p>
        <p>Date of Joining: {userData.dateOfJoining}</p>
        {isEditing ? (
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={userData.bio}
              onChange={handleInputChange}
            ></textarea>
            <br />
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={userData.location}
              onChange={handleInputChange}
            />
            <br />
          </div>
        ) : (
          <p>Bio: {userData.bio}</p>
        )}
        <p>Location: {userData.location}</p>
        {isEditing ? (
        <div style={actionsStyle}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCancel}
            style={buttonSpacing} // Add spacing to this button
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div style={actionsStyle}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditProfile}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteAccount}
            style={buttonSpacing} // Add spacing to this button
          >
            Delete Account
          </Button>
        </div>
      )}
    </Paper>
      {/* Delete confirmation dialog */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        maxWidth="sm"
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteModal}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Account deleted message */}
      <Dialog
        open={isAccountDeleted}
        onClose={handleCloseAccountDeleted}
        maxWidth="sm"
      >
        <DialogTitle>Account Deleted</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your account has been successfully deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseAccountDeleted}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
