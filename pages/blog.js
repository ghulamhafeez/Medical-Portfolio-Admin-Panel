import React from "react";
import { Grid } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
export default function Blog() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid display={"flex"} justifyContent={"center"} mt={10}>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Text</MenuItem>
        <MenuItem onClick={handleClose}>Image</MenuItem>
        <MenuItem onClick={handleClose}>Video</MenuItem>
      </Menu>
      <Grid display={"flex"} direction={"row"} gap={2}>
        {/* <TextField
          sx={{ width: 300 }}
          id="outlined-basic"
          label="Blog"
          variant="outlined"
        /> */}
        <Fab
          sx={{
            backgroundColor: "#89C1CB",
            ":hover": {
              backgroundColor: "#89C1CB",
            },
          }}
          onClick={handleClick}
        >
          <AddIcon sx={{ color: "white" }} />
        </Fab>
      </Grid>
    </Grid>
  );
}
