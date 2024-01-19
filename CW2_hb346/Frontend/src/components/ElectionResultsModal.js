import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ElectionResultsModal = ({ open, onClose, winner }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h5" gutterBottom style={{ color: '#2196F3', marginBottom: '20px' }}>
          🏆 Election Results 🏆
        </Typography>
        <img src='./winner.jfif' alt='winner ' width={'400px'} height={'200px'} />
        <Typography variant="body1" gutterBottom style={{ fontSize: '18px', marginBottom: '20px' }}>
          And the winner is...
        </Typography>
        <Typography variant="h4" gutterBottom style={{ color: '#4CAF50', fontWeight: 'bold', marginBottom: '20px' }}>
          {winner}
        </Typography>
        <Button variant="contained" color="primary" onClick={onClose}>
          Close Modal
        </Button>
      </div>
    </Modal>
  );
};

export default ElectionResultsModal;
