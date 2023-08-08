import React from "react";
import { Grid } from "@mui/material";
import Fab from "@mui/material/Fab";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import AbcIcon from "@mui/icons-material/Abc";
import ImageIcon from "@mui/icons-material/Image";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Box from "@mui/material/Box";
// import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import Modal from "@mui/material/Modal";

import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
export default function AddBlog() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [text, setText] = React.useState("");
  const [title, setTitles] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [file, setFile] = React.useState("");

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    console.log("event", event);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAdd = (data) => {
    console.log("called", data);
    const type = { type: data };
    console.log("type", type);
    setItems([...items, type]);

    // const newItems = items.slice();
    // newItems.push(type);
    // setItems(newItems);
  };

  return (
    <Grid
      display={"flex"}
      // justifyContent={"center"}
      // alignItems={"center"}
      mt={10}
      direction={"column"}
      px={{ xl: 30, lg: 20, md: 15, sm: 13 }}
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
        <MenuItem onClick={() => handleAdd("text")}>
          <AbcIcon sx={{ mr: 1, fontSize: 30 }}></AbcIcon>
          {""} Text
        </MenuItem>
        <MenuItem onClick={() => handleAdd("file")}>
          <ImageIcon sx={{ mr: 2 }}></ImageIcon>Image
        </MenuItem>
        <MenuItem onClick={() => handleAdd("youtube")}>
          <YouTubeIcon sx={{ mr: 2 }}></YouTubeIcon>Youtube
        </MenuItem>
      </Menu>

      <Grid>
        <Card sx={{ width: "100%", height: 100, boxShadow: 4 }}>
          <CardContent>
            {/* <Grid display={"flex"} mt={2}> */}
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Title"
              value={title}
              variant="outlined"
            />
            {/* </Grid> */}
          </CardContent>
        </Card>
      </Grid>

      <Grid display={"flex"} justifyContent={"start"} mt={4}>
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ width: 130, mb: 12 }}
        >
          Options
        </Button>
      </Grid>
      <Grid>
        {items?.map((x) => {
          return (
            <Card key={x} sx={{ width: "100%", boxShadow: 4, mb: 2 }}>
              <CardContent>
                {x.type === "text" && (
                  <TextField
                    sx={{ width: "100%" }}
                    id="outlined-basic"
                    label="Text"
                    variant="outlined"
                    type={"text"}
                    value={text}
                  />
                )}
                {x.type === "file" && <input type="file" value={file}></input>}
                {x.type === "youtube" && (
                  <TextField
                    sx={{ width: "100%" }}
                    id="outlined-basic"
                    label="url"
                    variant="outlined"
                    type={"text"}
                    value={url}
                  />
                )}

                {/* {x.type} */}
              </CardContent>
            </Card>
          );
        })}
      </Grid>
    </Grid>
  );
}
