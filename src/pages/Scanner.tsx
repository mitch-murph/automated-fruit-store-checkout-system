import React from "react";
import { Grid } from "@mui/material";
import { ItemList, ModeSwitch, Camera } from "../components";

export function Scanner() {
  return <Grid container>
    <Grid item xs={8} sx={{ padding: '36px' }}>
      {/* <ModeSwitch /> */}
      <Camera/>
    </Grid>
    <Grid item xs={4} sx={{ paddingLeft: '36px' }}>
      <ItemList />
    </Grid>
  </Grid >;
}
