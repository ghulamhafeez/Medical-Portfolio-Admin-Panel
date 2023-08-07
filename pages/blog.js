import React from "react";
import { Grid } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";

import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
    <Grid
      display={"flex"}
      direction={"column"}
      justifyContent={"center"}
      mt={10}
      ml={30}
      gap={2}
    >
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

      <Grid>
        <Card sx={{ width: 300, height: 75, boxShadow: 4 }}>
          <Grid display={"flex"} direction={"row"} gap={4}>
            {/* <TextField
          sx={{ width: 300 }}
          id="outlined-basic"
          label="Blog"
          variant="outlined"
        /> */}
            <Typography variant="h6" gutterBottom ml={3} mt={3}>
              Add Blog
            </Typography>
            <Fab
              sx={{
                backgroundColor: "#89C1CB",
                ":hover": {
                  backgroundColor: "#89C1CB",
                },
                mt: 1,
              }}
              onClick={handleClick}
            >
              <AddIcon sx={{ color: "white" }} />
            </Fab>
          </Grid>
        </Card>
      </Grid>
      <Grid>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon onClick={handleClick} />
              </IconButton>
            }
            title="Blog 1"
            // subheader="September 14, 2016"
          />
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Paella dish"
            // color="red"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
          {/* <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions> */}
        </Card>
      </Grid>
    </Grid>
  );
}
