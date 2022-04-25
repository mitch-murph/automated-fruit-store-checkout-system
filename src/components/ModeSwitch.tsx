
import React from "react";
import { ToggleButtonGroup, ToggleButton } from '@mui/material'

export function ModeSwitch() {
  const [alignment, setAlignment] = React.useState('video');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="video">Video</ToggleButton>
      <ToggleButton value="camera">Camera</ToggleButton>
    </ToggleButtonGroup>
  );
}