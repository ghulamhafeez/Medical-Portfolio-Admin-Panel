import React from "react";
import { Grid } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function About() {
  return (
    <Grid display={"flex"} direction={"row"} justifyContent={"center"} mt={10}>
      <Card sx={{ width: 350, height: 180, boxShadow: 4 }}>
        <CardContent>
          <Grid display={"flex"} direction={"column"} gap={3} mt={2}>
            <TextField id="outlined-basic" label="Title" variant="outlined" />
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
            <input
              type="file"
              name="fld_3288429"
              value=""
              data-field="fld_3288429"
              id="fld_3288429_1"
              data-controlid="trupl64bfeadbe0d10"
              aria-labelledby="fld_3288429Label"
              aria-describedby="fld_3288429Caption"
            />
          </Button>
          {/* <Fab
            sx={{
              backgroundColor: "#89C1CB",
              ":hover": {
                backgroundColor: "#89C1CB",
              },
            }}
            // onClick={handleClick}
          >
            <AddIcon sx={{ color: "white" }} />
          </Fab> */}
        </CardActions>
      </Card>
    </Grid>
  );
}
