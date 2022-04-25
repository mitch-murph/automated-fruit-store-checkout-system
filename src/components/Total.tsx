import React, { useState } from 'react'
import { Box, Typography, Grid, Button } from "@mui/material";
import { Payment } from './'

export function Total() {
  const [open, setOpen] = useState<boolean>(false);


  return <>
    <Payment {...{ open, setOpen }} />
    <Box sx={{
      background: '#FFFFFF',
      borderRadius: '0px',
      position: "fixed",
      bottom: 0,
      width: '100%',
      align: 'center'
    }}>
      <Box sx={{ position: 'relative' }}>
        <Typography sx={{
          weight: '400',
          fontSize: '36px',
          margin: '36px',
        }}>
          Total: $35.50
        </Typography>
        <Grid container direction={'column'} spacing={2}>
          <Grid item>
            <Grid container direction={'row'} spacing={2}>
              <Grid item>
                <Button variant="contained">Add Item</Button>
              </Grid>
              <Grid item>
                <Button variant="contained">Remove Item</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => setOpen(true)}>Pay</Button>
          </Grid>
        </Grid>
      </Box>
    </Box >
  </>
}