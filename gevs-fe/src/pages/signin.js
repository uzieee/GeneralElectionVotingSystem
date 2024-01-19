import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext'; // Import the useAuth hook


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://netflix.com/">
        GEVS WebApp
       </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const { login } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const [errorMessage, setErrorMessage] = React.useState(''); // Initialize error message state
 
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const data = new FormData(event.currentTarget);
      const email = data.get('email');
      const password = data.get('password');
      if (email === 'election@shangrila.gov.sr') {
        // Redirect to the admin dashboard
        navigate('/adminDashboard');
        return;
      }
  
      // Send a POST request to the signin endpoint on your backend
      const response = await fetch('http://localhost:5001/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const { token , user } = await response.json();
        toast.success('User signed up successfully');
        toast.success('Proceed to Signin');
        login(token);
        
        navigate("/");
   
        // Successful sign-in
        console.log('User signed in successfully');
  
        // Optionally, you can redirect or perform other actions
        // For example, if you have a 'dashboard' route:
        // history.push('/dashboard');
      } else {
        // Unsuccessful sign-in
        const errorData = await response.json(); // Parse the error response
        console.error('Signin failed:', errorData.error);
        toast.error('Signin Failed');
     
        // Optionally, you can display an error message to the user
        // setErrorMessage(errorData.error);
      }
    } catch (error) {
      console.error('Error during signin:', error);
      toast.error('Signin Failed');
     
  
      // Optionally, you can display a generic error message to the user
      // setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer/>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(./images/cover1.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div className="icon-container">
              <img src="./images/logo2.png" alt="Lock Icon"  />
            </div>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {errorMessage && ( // Render error message conditionally
                <div className='errormessage'>
                  <h1>{errorMessage}</h1>
                </div>
              )}
              <Button
                type="submit"
                fullWidth
                backgroundColor="#E50914"
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#962046' }}
              >
                Sign In
              </Button>
              <Grid container>
                
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
