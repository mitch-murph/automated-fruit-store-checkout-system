import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  IconButton,
  Box,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import styled from "styled-components";
import defaultState from "../state/defaultState";
import { cloneDeep } from "lodash";

const Image = styled.img`
  width: 100px;
  padding: 32px;
`;

function PaymentOption({ setStep }) {
  return (
    <Grid container justifyContent={"space-evenly"}>
      <Button
        variant={"contained"}
        sx={{
          display: "flex",
          flexDirection: "column",
          fontSize: "24px",
        }}
        onClick={() => {
          setStep("cash");
        }}
      >
        <Image src="./cash.png" />
        <p>Cash</p>
      </Button>
      <Button
        variant={"contained"}
        sx={{
          display: "flex",
          flexDirection: "column",
          fontSize: "24px",
        }}
        onClick={() => {
          setStep("scan");
        }}
      >
        <Image src="./card.png" />
        <p>Card</p>
      </Button>
    </Grid>
  );
}

function ScanCard({ setStep }) {
  return (
    <Button
      variant={"contained"}
      size={"large"}
      sx={{ fontSize: "48px" }}
      onClick={() => {
        setStep("transfer");
      }}
    >
      Scan Card at EftPos Machine
    </Button>
  );
}

function Transferring({ setStep }) {
  return (
    <Button
      variant={"contained"}
      size={"large"}
      sx={{
        display: "flex",
        flexDirection: "column",
        fontSize: "48px",
        width: "100%",
      }}
      onClick={() => {
        setStep("approved");
      }}
    >
      <Image src="./transaction.png" />
      Transferring
    </Button>
  );
}

function CardApproved({ setStep, total, handleComplete }) {
  return (
    <>
      <Button
        variant={"contained"}
        size={"large"}
        sx={{
          display: "flex",
          flexDirection: "column",
          fontSize: "48px",
          width: "100%",
        }}
        onClick={() => {
          // setStep("card-success");
        }}
      >
        <Image src="./approved.png" />
        {`Paid $${total.toFixed(2)}`}
      </Button>
      <Grid container justifyContent={"space-evenly"}>
        <Button
          variant={"contained"}
          sx={{ margin: "16px", fontSize: "24px" }}
          onClick={() => {
            handleComplete();
          }}
        >
          New Sale
        </Button>
      </Grid>
    </>
  );
}

function CashPaid({ setStep, total, enter, handleComplete }) {
  console.log();
  return (
    <>
      <Button
        variant={"contained"}
        size={"large"}
        sx={{
          display: "flex",
          flexDirection: "column",
          fontSize: "48px",
          width: "100%",
        }}
        onClick={() => {
          // setStep("card-success");
        }}
      >
        <Image src="./approved.png" />
        {`Paid $${enter.toFixed(2)}`}
        <br />
        {`Change $${(enter - total).toFixed(2)}`}
      </Button>
      <Grid container justifyContent={"space-evenly"}>
        <Button
          variant={"contained"}
          sx={{ margin: "16px", fontSize: "24px" }}
          onClick={() => {
            handleComplete();
          }}
        >
          New Sale
        </Button>
      </Grid>
    </>
  );
}

function Cash({ setStep, total, enter, setEnter }) {
  const onChange = (value) => {
    if (isNaN(value)) return;

    if (value < 0) value = 0;
    setEnter(value);
  };

  return (
    <>
      <Grid container justifyContent={"space-evenly"} direction={"column"}>
        <Typography
          sx={{
            weight: "400",
            fontSize: "36px",
            padding: "8px",
            textAlign: "center",
          }}
        >
          Enter Payment Amount
        </Typography>
        <TextField
          sx={{ paddingRight: "64px", paddingLeft: "64px" }}
          defaultValue={enter}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <Button
          variant={"contained"}
          sx={{
            margin: "16px",
            fontSize: "24px",
            marginRight: "100px",
            marginLeft: "100px",
          }}
          onClick={() => {
            setStep("paid");
          }}
        >
          {`Pay $${enter.toFixed(2)}`}
        </Button>
      </Grid>
    </>
  );
}

function Step(props) {
  switch (props.step) {
    case "type":
      return <PaymentOption {...props} />;
    case "scan":
      return <ScanCard {...props} />;
    case "cash":
      return <Cash {...props} />;
    case "transfer":
      return <Transferring {...props} />;
    case "approved":
      return <CardApproved {...props} />;
    case "paid":
      return <CashPaid {...props} />;
  }

  return <PaymentOption {...props} />;
}

export function Payment({ open, setOpen, itemState, setItemState }) {
  const [step, setStep] = useState("type");
  const [enter, setEnter] = useState(itemState.total);

  useEffect(() => {
    setStep("type");
    setEnter(itemState.total);
  }, [open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleComplete = () => {
    setItemState(cloneDeep({ ...defaultState }));
    handleClose();
  };
  const closeDialog = () => {
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.9)",
          top: "50%",
          left: "50%",
          position: "absolute",
          width: "600px",
          height: "480px",
          transform: "translate(-50%, -50%)",
          padding: "18px",
        }}
      >
        <Grid container justifyContent={"space-between"}>
          <IconButton onClick={closeDialog}>
            <Close /> Close
          </IconButton>
          <IconButton>Total: ${itemState.total.toFixed(2)}</IconButton>
        </Grid>
        <Box sx={{ padding: "18px" }} justify="center">
          <Step
            {...{ step, setStep, enter, setEnter, handleComplete }}
            total={itemState.total}
          />
        </Box>
      </Box>
    </Modal>
  );
}
