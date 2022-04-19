import React from "react";
import { Box, Stack, Paper, Typography } from "@mui/material";

const Item = ({ label, index }: { label: string, index: number }) => {
  return <Paper sx={{
    width: '600px',
    background: index % 2 ? '#DAF5FB' : '#C8F0F9',
    borderRadius: '0px'
  }}>
    <Typography sx={{
      weight: '400',
      fontSize: '36px',
      margin: '36px',
    }}>
      {label}
    </Typography>
  </Paper>
}

const items = ['Nutrigrain', 'Chocolate', 'Potato', 'Milk', 'Apple'];

export function ItemList() {
  return <Stack>
    {items.map((item, index) => {
      return <Item label={item} index={index} />
    })}
    <Paper sx={{
      width: '600px',
      background: '#FFFFFF',
      borderRadius: '0px'
    }}>

      <Typography sx={{
        weight: '400',
        fontSize: '36px',
        margin: '36px',
      }}>
        Total: $35.50
      </Typography>
    </Paper>
  </Stack>;
}