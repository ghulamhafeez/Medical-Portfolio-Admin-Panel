import React from "react";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import AbcIcon from "@mui/icons-material/Abc";
import ImageIcon from "@mui/icons-material/Image";
import YouTubeIcon from "@mui/icons-material/YouTube";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

export default function AddBlog() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [file, setFile] = React.useState("");

  const open = Boolean(anchorEl);

  const router = useRouter();
  let Url = "https://www.youtube.com/embed/_g9sAB0hn-E";

  let Id = Url.split("embed");
  console.log("id", Id[1]);

  const handleClick = (event) => {
    console.log("event", event);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = () => {
    console.log("Submit");
    const CardData = {
      title: title,
      text: text,
      file: file,
      url: url,
    };
    console.log("CardData", CardData);
  };

  const handleAdd = (data) => {
    console.log("called", data);
    const type = { type: data };
    console.log("type", type);
    setItems([...items, type]);
    setAnchorEl(null);
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
              onChange={(e) => setTitle(e.currentTarget.value)}
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
                    onChange={(e) => setText(e.currentTarget.value)}
                    value={text}
                  />
                )}
                {x.type === "file" && (
                  <input
                    type="file"
                    value={file}
                    onChange={(e) => setFile(e.currentTarget.value)}
                  ></input>
                )}
                {x.type === "youtube" && (
                  <TextField
                    sx={{ width: "100%" }}
                    id="outlined-basic"
                    label="url"
                    variant="outlined"
                    type={"url"}
                    onChange={(e) => setUrl(e.currentTarget.value)}
                    value={url}
                  />
                )}

                {/* {x.type} */}
              </CardContent>
            </Card>
          );
        })}
      </Grid>
      <Button
        sx={{ mb: 2, width: 130 }}
        variant="contained"
        onClickCapture={() => handleSubmit()}
      >
        {" "}
        submit
      </Button>
      <Button
        sx={{ mb: 2, width: 130 }}
        variant="contained"
        onClick={() => router.back()}
      >
        {" "}
        Cancel
      </Button>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/_g9sAB0hn-E"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </Grid>
  );
}
