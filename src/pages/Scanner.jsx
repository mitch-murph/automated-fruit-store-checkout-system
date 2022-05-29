import React, { useState } from "react";
import { Grid } from "@mui/material";
import { ItemList, ModeSwitch, Camera } from "../components";
import defaultState from "../state/defaultState";

export function Scanner() {
  const [itemState, setItemState] = useState(defaultState);

  return (
    <Grid container>
      <Grid item xs={8} sx={{ padding: "36px" }}>
        {/* <ModeSwitch /> */}
        <Camera {...{ itemState, setItemState }} />
      </Grid>
      <Grid item xs={4}>
        <ItemList {...{ itemState, setItemState }} />
      </Grid>
    </Grid>
  );
}
