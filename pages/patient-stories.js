import React from "react";
import { Grid } from "@mui/material";
import Fab from "@mui/material/Fab";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
export default function PatientStories() {
  const [file, setFile] = React.useState([]);

  function handleChange(e) {
    console.log("event", e);
    setFile(e.target.files[0]);
  }

  return (
    <Grid display={"flex"} justifyContent={"center"} mt={10}>
      <Card sx={{ width: 350, height: 180, boxShadow: 4 }}>
        <CardContent>
          <Grid display={"flex"} direction={"column"} gap={3} mt={2}>
            <TextField id="outlined-basic" label="Title" variant="outlined" />
          </Grid>
        </CardContent>
        <CardActions sx={{ ml: 2 }}>
          {/* <Button
            sx={{
              backgroundColor: "#89C1CB",
              ":hover": {
                backgroundColor: "#89C1CB",
              },
            }}
            variant="contained"
          ></Button> */}
          <input
            type="file"
            // name="fld_3288429"
            // value=""
            // data-field="fld_3288429"
            // id="fld_3288429_1"
            // data-controlid="trupl64bfeadbe0d10"
            // aria-labelledby="fld_3288429Label"
            // aria-describedby="fld_3288429Caption"
            onChange={(e) => handleChange(e)}
          />
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
      {/* {file?.map((x) => {
        return (
          <img
            key={x}
            src={x}
            alt="Girl in a jacket"
            width="500"
            height="600"
          />
        );
      })} */}
    </Grid>
  );
}
