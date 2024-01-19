import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CandidateForm = ({ submitCandidate, setConstituency, parties }) => {
  const [candidateName, setCandidateName] = useState('');
  const [selectedParty, setSelectedParty] = useState('');
  const [constituency, setConstituencyLocal] = useState('');

  const handlePartyChange = (event) => {
    setSelectedParty(event.target.value);
  };

  const handleConstituencyChange = (event) => {
    setConstituencyLocal(event.target.value);
  };

  const getButtonColor = () => {
    // Add more conditions based on your parties and their corresponding colors
    switch (selectedParty) {
      case 'Red Party':
        return '#FF0000'; // Red
      case 'Blue Party':
        return '#0000FF'; // Blue
        case 'Yellow Party':
          return '	#EFB701'; 
          
      default:
        return '#3F51B5'; // Default color
    }
  };

  const handleSubmit = () => {
    if (candidateName.trim() === '' || selectedParty === '' || constituency.trim() === '') {
      toast.error('Please fill in all fields.');
      return;
    }

    submitCandidate(candidateName, selectedParty);
    toast.success('Candidate submitted successfully!');
    // Optionally, you can reset the form fields after submission
    setCandidateName('');
    setSelectedParty('');
    setConstituencyLocal('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Candidate Form
      </Typography>
      <TextField
        label="Candidate Name"
        fullWidth
        margin="normal"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="party-select-label">Select Party</InputLabel>
        <Select
          labelId="party-select-label"
          id="party-select"
          value={selectedParty}
          onChange={handlePartyChange}
        >
          {parties.map((party) => (
            <MenuItem key={party} value={party}>
              {party}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Select Constituency"
        fullWidth
        margin="normal"
        value={constituency}
        onChange={handleConstituencyChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ backgroundColor: getButtonColor() }}
      >
        Submit Candidate
      </Button>
    </div>
  );
};

export default CandidateForm;
