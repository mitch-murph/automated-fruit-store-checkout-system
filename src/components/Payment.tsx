import React, { useState } from 'react'
import { Modal, Button, IconButton, Box, Grid } from '@mui/material';
import { ArrowBack, CreditCard } from '@mui/icons-material';

function PaymentOption() {
  return <Grid container justifyContent={'space-evenly'}>
    <Button variant={'contained'} sx={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <CreditCard />
      <p>Cash</p>
    </Button>
    <Button variant={'contained'} sx={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <CreditCard />
      <p>Card</p>
    </Button>
  </Grid>
}

function ScanCard() {
  
}

export function Payment({ open, setOpen }: {
  open: boolean,
  setOpen: (state: boolean) => void
}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const closeDialog = () => {

  }

  return (<Modal open={open} onClose={handleClose}>
    <Box sx={{
      background: 'rgba(255, 255, 255, 0.9)',
      top: '50%',
      left: '50%',
      position: 'absolute',
      width: '450px',
      height: '300px',
      transform: 'translate(-50%, -50%)',
      padding: '18px'
    }}>
      <IconButton onClick={closeDialog}>
        <ArrowBack /> Back
      </IconButton>
      <Box sx={{ padding: '18px' }}>
        <PaymentOption />
      </Box>
    </Box >
  </Modal>)
}