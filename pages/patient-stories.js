import React from "react";
import { Grid } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
export default function PatientStories() {
  return (
    <Grid display={"flex"} justifyContent={"center"} mt={10}>
      <Grid display={"flex"} direction={"row"} gap={2}>
        <TextField
          sx={{ width: 300 }}
          id="outlined-basic"
          label="Patient Story"
          variant="outlined"
        />
        {/* <Fab
          sx={{
            backgroundColor: "#89C1CB",
            ":hover": {
              backgroundColor: "#89C1CB",
            },
          }}
          //   onClick={handleClick}
        >
          <AddIcon sx={{ color: "white" }} />
        </Fab> */}
      </Grid>
    </Grid>
  );
}
