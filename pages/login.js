import React from "react";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

export default function Login() {
  return (
    <Grid mt={30} mb={2} display={"flex"} justifyContent={"center"}>
      <Card sx={{ width: 350, height: 250, boxShadow: 4 }}>
        <CardContent>
          <Grid display={"flex"} direction={"column"} gap={3} mt={2}>
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField id="outlined-basic" label="Passwod" variant="outlined" />
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            sx={{
              backgroundColor: "#89C1CB",
              ":hover": {
                backgroundColor: "#89C1CB",
              },
            }}
            variant="contained"
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
