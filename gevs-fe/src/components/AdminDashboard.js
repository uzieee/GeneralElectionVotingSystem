import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import ImageZoom from 'react-image-zoom';
import Toolbar from '@mui/material/Toolbar';
import { toast, ToastContainer } from 'react-toastify';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import ElectionResultsModal from './ElectionResultsModal';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItemsAdmin';
import Deposits from './Deposits';
import ElectionComponent from './ElectionComponent'; // New component for election actions
import CandidateForm from './CandidateForm'; // New component for candidate form
import ElectionTracker from './ElectionTracker'; // New component for election tracking
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ZoomPan } from 'react-zoom-pan-pinch';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const anotherImage = './hm_data.png';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://google.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AdminDashboard() {
  const [gevsElectionStatus, setGevsElectionStatus] = React.useState('pending');
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [winner, setWinner] = useState('');
  const [gevsElectionResults, setGevsElectionResults] = React.useState(null);
  const [gevsConstituency, setGevsConstituency] = React.useState(''); // State for selected constituency
  const [gevsParties, setGevsParties] = React.useState(['Blue Party', 'Red Party', 'Yellow Party' , 'Independant']);
  const [gevsShowElectionActions, setGevsShowElectionActions] = React.useState(true);
  const [gevsShowCandidateForm1, setGevsShowCandidateForm1] = React.useState(false);
  const [gevsShowCandidateForm2, setGevsShowCandidateForm2] = React.useState(false);
  const [electionStatus, setElectionStatus] = React.useState('pending');
  const [electionResults, setElectionResults] = React.useState(null);
  const [constituency, setConstituency] = React.useState(''); // State for selected constituency
  const [parties, setParties] = React.useState(['Blue Party', 'Red Party', 'Yellow Party' , 'Independant']);
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  
  const updateElectionState = async () => {
    try {
      // Make an API call to get the election results
      const response = await axios.get('http://localhost:5001/api/election/results');
  
      // Handle the response data, which may include information about election results
      const results = response.data.results;
      console.log('Election results:', results);
  
      // Update the local state or perform any necessary actions based on the results
    } catch (error) {
      console.error('Error updating election state:', error);
      // Handle error if needed
    }
  };
  const [gevsLastTwoCandidates, setGevsLastTwoCandidates] = useState([]);

  const startElection = async () => {
    try {
      setGevsElectionStatus('ongoing');
      setGevsShowElectionActions(false);
      setGevsShowCandidateForm1(true);
      // Make an API call to start the election using fetch
      const response = await fetch('http://localhost:5001/api/election/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        toast.success('Election Started successfully');
       
        // Update the election status in the frontend
        setElectionStatus('ongoing');
        

      } else {
        // Handle the case where the server returns an error status
        console.error('Error starting election:', response.status);
        toast.error('Error starting election:', response.status);
        
        const errorData = await response.json();
        console.error('Response data:', errorData);
        // Handle error if needed
      }
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error('Error starting election:', error.message);
      // Handle error if needed
    }
  };
  const [candidates, setCandidates] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5001/api/candidates/lastTwo')
      .then((response) => response.json())
      .then((data) => {
        setCandidates(data);
      })
      .catch((error) => {
        console.error('Error fetching last two candidates:', error);
      });
  }, []);

  const calculateWinner = async () => {
    try {
      // Make an API call to get the last two candidates' votes
      const response = await axios.get('http://localhost:5001/api/candidates/lastTwo');
      const lastTwoCandidates = response.data;
  
      // Extract votes for each candidate
      const votesCandidate1 = lastTwoCandidates[0].votes;
      const votesCandidate2 = lastTwoCandidates[1].votes;
  
      // Compare votes and determine the winner
      if (votesCandidate1 > votesCandidate2) {
        return lastTwoCandidates[0].name;
      } else if (votesCandidate2 > votesCandidate1) {
        return lastTwoCandidates[1].name;
      } else {
        return 'It\'s a tie!';
      }
    } catch (error) {
      console.error('Error calculating winner:', error);
      // Handle error if needed
    }
  };

  const endElection = async () => {
    try {
      // Make an API call to end the election
      await axios.post('http://localhost:5001/api/election/end');
  
      // Update the local state
      setElectionStatus('ended');
      console.log('Election ended successfully');
      toast.success('Election ended successfully');
  
      // Calculate the winner and await the result
      const winnerName = await calculateWinner();
      setWinner(winnerName);
      console.log('winner is' , winnerName);
  
      // Show the results modal
      setShowResultsModal(true);
      console.log('showResultsModal:', showResultsModal);
  
      // Trigger a function to update the election state after ending the election
      updateElectionState();
    } catch (error) {
      console.error('Error ending election:', error);
  
      toast.error('Error ending election. Please try again.');
      // Handle error if needed
    }
  };
  

  
const submitCandidate1 = async (candidateName, party) => {
  try {
    // Make an API call to submit candidate information
    await axios.post('http://localhost:5001/api/candidates/submit', {
      candidateName,
      party,
      constituency,
    });

    console.log(`Candidate 1 submitted: ${candidateName}, ${party}, ${constituency}`);
    // Add logic if needed

    // Trigger the function to update the election state after submitting a candidate
    updateElectionState();
    setGevsShowCandidateForm1(false);
    setGevsShowCandidateForm2(true);
  } catch (error) {
    console.error('Error submitting candidate 1:', error);
    // Handle error if needed
  }
};

const submitCandidate2 = async (candidateName, party) => {
  try {

    const updatedConstituency = "Shangrila";
    // Make an API call to submit candidate information
    await axios.post('http://localhost:5001/api/candidates/submit', {
      candidateName,
      party,
      constituency: updatedConstituency,
    });
    await axios.post('http://localhost:5001/api/elections', {
      status: 'pending',
      constituency: updatedConstituency,
      parties: ['Blue Party', 'Red Party'],
    });

    console.log(`Candidate 2 submitted: ${candidateName}, ${party}, ${constituency}`);
    // Add logic if needed

    // Trigger the function to update the election state after submitting a candidate
    updateElectionState();
     setGevsShowCandidateForm2(false);
  } catch (error) {
    console.error('Error submitting candidate 2:', error);
    // Handle error if needed
  }
};

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer/>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box component="main" sx={{ backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]), flexGrow: 1, height: '100vh', overflow: 'auto' }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              
              <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {/* Candidate Form 1 */}
                <CandidateForm submitCandidate={submitCandidate1} setConstituency={setConstituency} parties={parties} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {/* Candidate Form 2 */}
                <CandidateForm submitCandidate={submitCandidate2} setConstituency={setConstituency} parties={parties} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {/* Election Actions */}
                  <ElectionComponent startElection={startElection} endElection={endElection} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {/* Election Tracker */}
                  <ElectionTracker
  electionStatus={electionStatus}
  constituency={constituency}
  parties={parties}
  candidates={candidates}
/>

</Paper>


              </Grid>
              <Grid item xs={12}>
  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {/* Election Tracker */}
    <img src="./distribution.png" alt="Sample Image" style={{ width: '400px', height: '250px' }} />
    <h5 style={{ marginTop: '10px', marginBottom: '0', textAlign: 'center' }}>Election distribution</h5>
  </Paper>
</Grid>

 <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Zoomable image */}
          <TransformWrapper>
            <TransformComponent>
              <img src={anotherImage} alt="Another Image" style={{ maxWidth: '100%', height: 'auto' }} />
            </TransformComponent>
          </TransformWrapper>
        </Paper>
      </Grid>
              
            </Grid>
            {showResultsModal && (
  <ElectionResultsModal open={showResultsModal} winner={winner} onClose={() => setShowResultsModal(false)} />
)}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
