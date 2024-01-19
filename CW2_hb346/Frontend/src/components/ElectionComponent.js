import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ElectionComponent = ({ startElection, endElection }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Election Actions
      </Typography>
      <Button variant="contained" color="primary" onClick={startElection}>
        Start Election
      </Button>
      <Button variant="contained" color="secondary" onClick={endElection} style={{ marginLeft: '10px' }}>
        End Election
      </Button>
    </div>
  );
};

export default ElectionComponent;
