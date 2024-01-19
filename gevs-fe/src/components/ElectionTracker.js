// ElectionTracker.js

import React from 'react';
import Typography from '@mui/material/Typography';
import { Container, Paper, Grid, Card, CardContent, CardMedia } from '@mui/material';

// Party logo URLs
const partyLogos = {
  'Red Party': './red-party.png',
  'Blue Party': './blue-party.png',
  'Yellow Party': './yellow-party.png',
  'Independant': './independant'
  // Add more parties as needed
};

const ElectionTracker = ({ electionStatus, constituency, candidates }) => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Election Tracker
        </Typography>
        <Typography variant="body1" gutterBottom align="center">
          Election Status: {electionStatus}
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          {candidates.map((candidate, index) => (
            <Grid item xs={12} md={6} key={candidate._id}>
              <Card elevation={1} sx={{ textAlign: 'center', height: '100%' }}>
                
                <CardContent>
                  <img src={partyLogos[candidate.party]} alt='{`${candidate.party} Logo`}' height={'100px'} width={'100px'} style={{ borderRadius: '50%' }} />
                  <Typography variant="h6" gutterBottom>
                    Candidate {index + 1}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Name: {candidate.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Party: {candidate.party}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Votes: {candidate.votes}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Additional tracking details can be added here based on your requirements */}
      </Paper>
    </Container>
  );
};

export default ElectionTracker;
