// VoteComponent.js
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { toast, ToastContainer } from 'react-toastify';

const VoteComponent = ({ electionStatus, constituency, candidates }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isVotingDisabled, setIsVotingDisabled] = useState(false);

  const handleVote = (candidateId) => {
    // Update the selected candidate
    setSelectedCandidate(candidateId);
  };

  const submitVote = () => {
    // Check if voting is disabled
    if (isVotingDisabled) {
      toast.error('You cannot vote again.');
      return;
    }

    // Disable voting temporarily
    setIsVotingDisabled(true);

    // Make an API call to submit the vote
    fetch('http://localhost:5001/api/votes/cast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include authentication token if needed
      },
      body: JSON.stringify({ candidateId: selectedCandidate }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response as needed
        console.log('Vote submitted successfully:', data);
        toast.success('Vote registered successfully!');
        // Optionally, you can reset the selectedCandidate state after a successful vote
        setSelectedCandidate(null);

        // Enable voting after a cooldown period (e.g., 30 seconds)
        setTimeout(() => {
          setIsVotingDisabled(false);
        }, 30000); // 30 seconds in milliseconds
      })
      .catch((error) => {
        // Handle errors
        console.error('Error submitting vote:', error);
        // Enable voting on error
        setIsVotingDisabled(false);
      });
  };

  if (electionStatus === 'pending') {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            No Election Going On
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <ToastContainer />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Vote
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select your preferred Candidate:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {candidates.map((candidate) => (
            <Button
              key={candidate._id}
              variant="contained"
              onClick={() => handleVote(candidate._id)}
              sx={{
                mt: 2,
                width: '200px',
                backgroundColor: selectedCandidate === candidate._id ? '#4caf50' : '#2196f3',
                '&:hover': {
                  backgroundColor: selectedCandidate === candidate._id ? '#45a049' : '#1976d2',
                },
              }}
            >
              <img
                src={
                  candidate.party === 'Blue Party'
                    ? '/blue-party.png'
                    : candidate.party === 'Red Party'
                    ? '/red-party.png'
                    : candidate.party === 'Yellow Party'
                    ? '/yellow-party.png'
                    : '/independant.png'
                }
                alt={candidate.name}
                style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '50%' }}
              />
              {candidate.name}
            </Button>
          ))}
        </Box>
        {selectedCandidate && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Selected Candidate: {candidates.find((candidate) => candidate._id === selectedCandidate)?.name}
            </Typography>
            <Button variant="contained" color="primary" onClick={submitVote} sx={{ mt: 1 }}>
              Vote
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default VoteComponent;
