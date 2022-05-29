import React, { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { Payment } from ".";
import styled from "styled-components";

const Wrapper = styled.div`
  /* width: 256px;
  height: 256px;
  margin: 20px 60px;
  border: 1px solid blue; */
  background: #ffffff;
  /* height: 300px; */
`;

export function Total({ total, itemState, setItemState }) {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <Payment {...{ open, setOpen, itemState, setItemState }} />
      <Box
        sx={{
          borderRadius: "0px",
          // position: "fixed",
          bottom: 0,
          width: "100%",
          align: "center",
        }}
      >
        <Box sx={{}}>
          <Typography
            sx={{
              weight: "400",
              fontSize: "36px",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <strong>Total:</strong>
            {` $${total.toFixed(2)}`}
          </Typography>
          <Grid
            container
            direction={"column"}
            spacing={2}
            justify="space-between"
            alignItems="center"
          >
            {/* <Grid item>
              <Grid container direction={"row"} spacing={2}>
                <Grid item sx={{ padding: "8px" }}>
                  <Button variant="contained" sx={{ width: "75px" }}>
                    Add Item
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" sx={{ width: "75px" }}>
                    Remove Item
                  </Button>
                </Grid>
              </Grid>
            </Grid> */}
            <Grid item sx={{ paddingBottom: "30px" }}>
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{ width: "200px", fontSize: "36px" }}
              >
                Pay
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Wrapper>
  );
}
