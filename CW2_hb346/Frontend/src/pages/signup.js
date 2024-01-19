import React, { useState } from 'react';
import { Link  } from 'react-router-dom'; // Import Link for navigation
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LinkMui from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import { QrReader } from 'react-qr-reader';


// Function to display copyright information
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <LinkMui color="inherit" href="https://netflix.com/">
        GEVS webapp
      </LinkMui>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const defaultTheme = createTheme();

// Define the SignUp component
export default function SignUp() {
  const navigate = useNavigate();
   // State to store form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth:'',
    constituency:'',
    uvc:'',
  });
  const [qrResult, setQrResult] = useState(null);

  const handleQrScan = (result) => {
    if (result) {
      setQrResult(result);
      setFormData({
        ...formData,
        uvc: result, // Set the UVC value from the QR code
      });
    }
  };

  const handleError = (error) => {
    console.error('Error scanning QR code:', error);
  };


  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (!/^\d{8}$/.test(formData.uvc)) {
    //   toast.error('UVC must be an 8-digit number');
    //   return;
    // }
   
    try {
      // Send a POST request to the signup endpoint
      const response = await fetch('http://localhost:5001/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('User signed up successfully');
        toast.success('Proceed to Signin');
        
        navigate("/signin");
     
        // Redirect to signin page
        // Handle successful signup
        console.log('User signed up successfully');
      } else {
        // Handle signup failure
        const errorData = await response.json();
        toast.error(errorData.error);
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('Error during signup');
    }
  };

  // Function to handle input field changes
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="icon-container">
            {/* Link to the home page */}
            <Link to="/">
              <img src="./images/logo4.png" alt="Loop Logo" width="300" height="300" />
            </Link>
          </div>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="dateOfBirth"
                  required
                  fullWidth
                  id="dateOfBirth"
                  label="DOB"
                  autoFocus
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
  <TextField
    select
    required
    fullWidth
    id="constituency"
    label="constituency"
    name="constituency"
    value={formData.constituency}
    onChange={handleInputChange}
  >
    <MenuItem value="Shangri-la-Town">Shangri-la Town</MenuItem>
    <MenuItem value="Northern-Kunlun-Mountain">Northern Kunlun Mountain</MenuItem>
    <MenuItem value="Western-Shangri-la">Western Shangri-la</MenuItem>
    <MenuItem value="Naboo-Vallery">Naboo Vallery</MenuItem>
    <MenuItem value="New-Felucia">New Felucia</MenuItem>
  </TextField>
</Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Voter ID (Email Address)"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="uvc"
                  label="UVC (8 Digit Code)"
                  name="uvc"
                  autoComplete="uvc"
                  value={formData.uvc}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleQrScan}
              style={{ width: '80%' }}  // Adjust the width as needed
            />
          </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
              
              </Grid>
            </Grid>
            {/* Grid container for buttons */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                
             
  <Button 
    type="submit"
    size='large'
    fullWidth
    variant="contained"
    sx={{ backgroundColor: '#911d42' }}
        >
            Sign Up
            </Button>
      

              
              </Grid>
              
              <Grid item xs={12}>
                {/* Link to the home page */}
                <Link to="/">
                  <Button
                    variant="contained"
                    //color="primary"
                    size="small"
                    sx={{ backgroundColor: '#00A9BC' }}
                    fullWidth
                  >
                    Back to Home
                  </Button>
                </Link>
              </Grid>
            </Grid>
            {}
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <LinkMui href="/signin" variant="body2">
                  Already have an account? Sign in
                </LinkMui>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
