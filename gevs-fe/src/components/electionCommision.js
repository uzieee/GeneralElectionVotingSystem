import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const ElectionCommissionerComponent = ({ startElection, endElection, submitCandidate }) => {
  const [candidateName, setCandidateName] = useState('');
  const [party, setParty] = useState('');
  const [constituency, setConstituency] = useState('');

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Election Commissioner Dashboard
        </Typography>

        <Button variant="contained" color="primary" onClick={startElection}>
          Start Election
        </Button>

        <Button variant="contained" color="secondary" onClick={endElection} style={{ marginLeft: '10px' }}>
          End Election
        </Button>

        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Candidate Information
          </Typography>
          <TextField
            label="Candidate Name"
            variant="outlined"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            sx={{ mt: 1, width: '80%' }}
          />
          <TextField
            label="Party"
            variant="outlined"
            value={party}
            onChange={(e) => setParty(e.target.value)}
            sx={{ mt: 1, width: '80%' }}
          />
          <TextField
            label="Constituency"
            variant="outlined"
            value={constituency}
            onChange={(e) => setConstituency(e.target.value)}
            sx={{ mt: 1, width: '80%' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => submitCandidate(candidateName, party, constituency)}
            sx={{ mt: 2 }}
          >
            Submit Candidate
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ElectionCommissionerComponent;
