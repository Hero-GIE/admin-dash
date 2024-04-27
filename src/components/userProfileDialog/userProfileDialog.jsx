import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { userInputs } from '../../formSource';

const UserProfileDialog = ({ open, onClose, user }) => {
  if (!user) return null; // Return null if user data is not available

  // Split userInputs into two arrays: leftInputs and rightInputs
  const leftInputs = userInputs.slice(0, 3);
  const rightInputs = userInputs.slice(3);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{marginLeft:'190px'}}>User Profile</DialogTitle>
      <DialogContent sx={{ width: '500px', display: 'flex', justifyContent: 'space-between'}}>
        <div >
          {user.img && (
            <div>
              <img src={user.img} alt="User Profile" style={{ borderRadius: '50%', width: '110px', height: '110px',marginLeft:'55px' }} />
            </div>
          )}
          {/* Render leftInputs */}
          {leftInputs.map((input) => (
            <div key={input.id} style={{ marginBottom: '20px' }}>
              <TextField
                label={input.label}
                value={user[input.id] || ''}
                inputProps={{readOnly:'true'}}
                fullWidth

              />
            </div>
          ))}
        </div>
        <div style={{ width: '45%' }}>
          {/* Render rightInputs */}
          {rightInputs.map((input) => (
            <div key={input.id} style={{ marginTop: '25px' }}>
              <TextField
                label={input.label}
                value={user[input.id] || ''}
                inputProps={{readOnly:'true'}}
                fullWidth
              />
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfileDialog;
