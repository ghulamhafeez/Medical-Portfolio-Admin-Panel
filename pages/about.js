import React from "react";
import { Grid } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";

export default function About() {
  return (
    <Grid
      display={"flex"}
      direction={"column"}
      // justifyContent={"center"}
      ml={20}
      mt={10}
      // textAlign={"center"}
      gap={3}
    >
      <Avatar
        alt="Travis Howard"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 140, height: 140 }}
      />
      <TextField
        id="outlined-basic"
        label="First Name"
        variant="outlined"
        sx={{ width: "500px" }}
      />
      <TextField
        id="outlined-basic"
        label="Last Name"
        variant="outlined"
        sx={{ width: "500px" }}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        sx={{ width: "500px" }}
      />
    </Grid>
  );
}
