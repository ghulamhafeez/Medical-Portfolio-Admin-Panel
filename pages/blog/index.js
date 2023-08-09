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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardData } from "../../constants/Constant";
export default function Blog() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [openModal, setOpenModal] = React.useState(false);
  console.log("CardData", CardData);
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
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>

      <Grid
        display={"flex"}
        px={{ xl: 30, lg: 20, md: 15, sm: 13 }}
        direction={"column"}
        alignItems={"center"}
        gap={4}
      >
        {CardData?.map((x) => {
          return (
            <Card key={x} sx={{ maxWidth: "100%", boxShadow: 4 }}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon onClick={handleClick} />
                  </IconButton>
                }
                sx={{ color: "#666666" }}
                title={x.title}
              />

              <CardMedia
                component="img"
                width={"100%"}
                // height={200}
                image={x.file}
                alt="Paella dish"
                // color="red"
              />
              <CardContent>
                <Typography variant="body2" color="#666666">
                  {x.text}
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
          );
        })}
      </Grid>
    </Grid>
  );
}
