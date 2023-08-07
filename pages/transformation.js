import React from "react";
import { Grid } from "@mui/material";
import Fab from "@mui/material/Fab";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
export default function Transformation() {
  return (
    <Grid display={"flex"} justifyContent={"center"}>
      <Card sx={{ width: 350, height: 180, boxShadow: 4 }}>
        <CardContent>
          <Grid display={"flex"} direction={"column"} gap={3} mt={2}>
            <TextField id="outlined-basic" label="Title" variant="outlined" />
          </Grid>
        </CardContent>
        <CardActions sx={{ ml: 2 }}>
          <input type="file" onChange={(e) => handleChange(e)} />
        </CardActions>
      </Card>
    </Grid>
  );
}
