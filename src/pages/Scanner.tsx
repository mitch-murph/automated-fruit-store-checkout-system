import { Grid } from "@mui/material";
import React from "react";
import Webcam from 'react-webcam'
import { ItemList } from "../components";

export function Scanner() {
  return <Grid container>
    <Grid item xs={8} sx={{ padding: '36px' }}>
      <Webcam width='100%' videoConstraints={{ width: 1920, height: 1080 }} />
    </Grid>
    <Grid item xs={4} sx={{ paddingLeft: '36px' }}>
      <ItemList />
    </Grid>
  </Grid >;
}
