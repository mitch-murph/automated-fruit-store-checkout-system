import React from "react";
import { Box, Stack, Typography, Grid } from "@mui/material";
import { Counter } from '../components'
import { useWindowDimensions } from '../hooks/useWindowDimensions'

const textStyles = {
  weight: '400',
  fontSize: '36px',
  margin: '36px',
  color: '#000000',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
}

const Item = ({ label, index }: { label: string, index: number }) => {
  return <Box component={'span'} sx={{
    background: index % 2 ? '#DAF5FB' : '#C8F0F9',
    borderRadius: '0px'
  }}>
    <Typography sx={textStyles}>
      <Grid container>
        <Grid item xs={6}>
          {label}
        </Grid>
        <Grid item xs={6}>
          <Counter />
        </Grid>
      </Grid>
    </Typography>
  </Box >
}

const items = ['Nutrigrain', 'Chocolate', 'Potato', 'Milk', 'Apple', 'Nutrigrain', 'Chocolate', 'Potato', 'Milk', 'Apple'];

export function ItemList() {
  const { height } = useWindowDimensions();

  const listHeight = height - 200

  return <>
    <Stack sx={{
      overflowY: 'scroll',
      height: listHeight
    }}>
      {items.map((item, index) => {
        return <Item label={item} index={index} />
      })}
    </Stack>
    <Box sx={{
      background: '#FFFFFF',
      borderRadius: '0px',
      position: "fixed",
      bottom: 2
    }}>

      <Typography sx={{
        weight: '400',
        fontSize: '36px',
        margin: '36px',
      }}>
        Total: $35.50
      </Typography>
    </Box>
  </>;
}