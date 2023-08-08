import React from "react";
import { Button, Grid } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Link from "next/link";
import Modal from "@mui/material/Modal";
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
  // const [openModal, setOpenModal] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleOpenModal = () => setOpenModal(true);
  // const handleCloseModal = () => setOpenModal(false);
  return (
    <Grid display={"flex"} direction={"column"} gap={2} mb={2}>
      <Grid display={"flex"} direction={"column"} gap={1}>
        <Grid
          paddingTop={1}
          paddingRight={3}
          display={"flex"}
          justifyContent={"end"}
        >
          <Link href={"/blog/add-blog"}>
            <Button
              variant="contained"
              color="primary"
              // onClick={() => handleOpenModal()}
            >
              + Add Blog
            </Button>
          </Link>
        </Grid>
        <Grid>
          <hr color="gray"></hr>
        </Grid>
      </Grid>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Save</MenuItem>
      </Menu>

      <Grid display={"flex"} direction={"column"} alignItems={"center"} gap={4}>
        <Card sx={{ maxWidth: 1050, boxShadow: 4 }}>
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon onClick={handleClick} />
              </IconButton>
            }
            sx={{ color: "#666666" }}
            title="Reasons you don’t need permanent tooth extractions"
          />

          <CardMedia
            component="img"
            width={"100%"}
            height={200}
            image="https://img.freepik.com/free-photo/doctors-day-cute-young-handsome-man-lab-coat-glasses-smiling-holding-book_140725-162884.jpg"
            alt="Paella dish"
            // color="red"
          />
          <CardContent>
            <Typography variant="body2" color="#666666">
              Do you remember those rings around your teeth with the braces?
              These are called bands. Until the late 70’s, that was the only way
              to connect braces to the teeth. Then a process called bonding came
              along. Bonding allowed orthodontists to use a thin layer of
              adhesive to connect a brace to the front surface of a tooth. Bands
              were no longer needed. Placing bands around each tooth in the
              mouth added about 5mm of material between the teeth. Because of
              this, even in mildly crowded cases, there just was not enough room
              to fit all the teeth in the mouth.
            </Typography>
            <br></br>
            <Typography variant="body2" color="#666666">
              Materials that have been tested by NASA in space are now
              incorporated into the wires used in orthodontics. These wires
              delivered a force on the teeth much lower and gentler than
              traditional braces with stainless steel wires did. Due to this
              gentler force, teeth were allowed to move in a way that allowed
              the bone to adapt and change, allowing the orthodontist to treat
              more cases without extractions.
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
        <Card sx={{ maxWidth: 1050, boxShadow: 4 }}>
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon onClick={handleClick} />
              </IconButton>
            }
            sx={{ color: "#666666" }}
            title="Reasons you don’t need permanent tooth extractions"
          />

          <CardMedia
            component="img"
            width={"100%"}
            height={200}
            image="https://img.freepik.com/free-photo/doctors-day-cute-young-handsome-man-lab-coat-glasses-smiling-holding-book_140725-162884.jpg"
            alt="Paella dish"
            // color="red"
          />
          <CardContent>
            <Typography variant="body2" color="#666666">
              Do you remember those rings around your teeth with the braces?
              These are called bands. Until the late 70’s, that was the only way
              to connect braces to the teeth. Then a process called bonding came
              along. Bonding allowed orthodontists to use a thin layer of
              adhesive to connect a brace to the front surface of a tooth. Bands
              were no longer needed. Placing bands around each tooth in the
              mouth added about 5mm of material between the teeth. Because of
              this, even in mildly crowded cases, there just was not enough room
              to fit all the teeth in the mouth.
            </Typography>
            <br></br>
            <Typography variant="body2" color="#666666">
              Materials that have been tested by NASA in space are now
              incorporated into the wires used in orthodontics. These wires
              delivered a force on the teeth much lower and gentler than
              traditional braces with stainless steel wires did. Due to this
              gentler force, teeth were allowed to move in a way that allowed
              the bone to adapt and change, allowing the orthodontist to treat
              more cases without extractions.
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
