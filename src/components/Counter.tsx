import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const buttonStyles = {
  weight: '400',
  fontSize: '36px',
  color: '#000000',
  padding: '0px',
  margin: '0px',
  alignItems: 'center',
}

const fieldStyles = {
  width: '75px',
  background: 'white',
  weight: '400',
  fontSize: '36px',
  fontFamily: 'Inter',
}

export function Counter() {
  const [count, setCount] = useState<number>(0);

  const onChange = (value: number) => {
    if (isNaN(value))
      return;

    if (value < 0) value = 0;
    setCount(value);
  }


  return <>
    <Button sx={buttonStyles} onClick={() => { onChange(count - 1) }}>-</Button>
    <TextField sx={fieldStyles} value={count} onChange={(e) => onChange(Number(e.target.value))} />
    <Button sx={buttonStyles} onClick={() => { onChange(count + 1) }}>+</Button>
  </>
}