import React from "react";
import { Box, Stack, Typography, Grid, Button } from "@mui/material";
import { Counter, Total } from ".";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { updateItems } from "../state/actions";

const textStyles = {
  weight: "400",
  fontSize: "20px",
  margin: "36px",
  marginRight: "0px",
  color: "#000000",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
};

const Item = ({ onChange, label, index, price, units }) => {
  return (
    <Box
      component={"span"}
      sx={{
        background: index % 2 ? "#DAF5FB" : "#C8F0F9",
        borderRadius: "0px",
      }}
    >
      <Typography sx={textStyles}>
        <Grid container>
          <Grid item xs={6}>
            {label}
          </Grid>
          <Grid item xs={4}>
            <Counter
              count={units}
              setCount={(value) => {
                onChange(value, index);
              }}
            />
          </Grid>
          <Grid item xs={2}>
            {`$${price.toFixed(2)}`}
          </Grid>
        </Grid>
      </Typography>
    </Box>
  );
};

export function ItemList({ itemState, setItemState }) {
  const { height } = useWindowDimensions();

  console.log(itemState)

  const listHeight = (height ?? 0) - 300;
  return (
    <>
      <Stack
        sx={{
          overflowY: "scroll",
          height: listHeight,
        }}
      >
        {itemState.items.map((item, index) => {
          return (
            <Item
              key={index}
              label={item.name}
              index={index}
              price={item.price * item.units}
              units={item.units}
              onChange={(value, index) => {
                itemState.items[index].units = value;

                itemState.total = itemState.items.reduce(
                  (prev, item) => item.price * item.units + prev,
                  0
                );

                setItemState({ ...itemState });
              }}
            />
          );
        })}
      </Stack>
      <Total total={itemState.total} {...{ itemState, setItemState }} />
    </>
  );
}
