import { Grid } from "@mui/material";
import React from "react";
import Webcam from 'react-webcam'
import { ItemList } from "../components";

export function Scanner() {
  return <Grid container>
    <Grid item sx={{ margin: '36px', paddingRight: '36px' }} >
      <Webcam width='1024px' videoConstraints={{ width: 1920, height: 1080 }} />
    </Grid>
    <Grid item >
      <ItemList />
    </Grid>
  </Grid >;
}
