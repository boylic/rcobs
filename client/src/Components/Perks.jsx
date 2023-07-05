import React from "react";
import { Grid, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

function Perks({ selected, onChange }) {
  function handleCbClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }

  return (
    <Grid item xs={12}>
      Perks(select all perks of your place)
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="WI-FI"
          name="wi-fi"
          onChange={handleCbClick}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Free Parking"
          name="free_parking"
          onChange={handleCbClick}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="TV"
          name="TV"
          onChange={handleCbClick}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="AC"
          name="AC"
          onChange={handleCbClick}
        />
        
      </FormGroup>
    </Grid>
  );
}

export default Perks;
