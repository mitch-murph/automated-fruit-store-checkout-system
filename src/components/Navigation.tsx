import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button
} from '@mui/material'
import { Link } from "react-router-dom";

export function Navigation() {
  return <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar sx={{
        background: '#02033B',
        padding: '8px'
      }}>
        <Typography sx={{ weight: '700', fontSize: '24px', flexGrow: 1 }}>
          Automated Checkout Scanner
        </Typography>
        <Button component={Link} to={'/'} color="inherit" sx={{ textTransform: 'none', weight: '600', fontSize: '24px', paddingRight: '26px' }}>Scanner</Button>
        <Button component={Link} to={'/about'} color="inherit" sx={{ textTransform: 'none', weight: '600', fontSize: '24px' }}>About Us</Button>
      </Toolbar>
    </AppBar>
  </Box >
}