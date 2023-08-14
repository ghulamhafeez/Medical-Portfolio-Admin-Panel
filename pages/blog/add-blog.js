import React from "react";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AbcIcon from "@mui/icons-material/Abc";
import ImageIcon from "@mui/icons-material/Image";
import Link from "next/link";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

import CancelIcon from "@mui/icons-material/Cancel";
import { supabase } from "../api/supabase";
export default function AddBlog() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [title, setTitle] = React.useState("");

  const open = Boolean(anchorEl);

  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = ({ id }) => {
    console.log("delId", id);

    const newitems = items.filter((item) => id !== item.id);

    console.log("newsetitems", newitems);
    setItems(newitems);
  };

  const handleSubmit = async () => {
    // const CardData = {
    //   title: title,
    //   text: text,
    //   file: file,
    //   url: url,
    // };
    console.log("CardData", items);

    supabase
      .from("blog")
      .insert({ title: title, items: items })
      .then((response) => {
        console.log({ response });
      });

    setItems([]);
  };

  const handleValue = (e, x) => {
    console.log("e", e?.target?.files[0]);
    console.log("et", e, x);

    const file = e?.target?.files[0];

    supabase.storage
      .from("media")
      .upload(file?.name, e?.target?.files[0], {
        cacheControl: "3600",
        upsert: false,
      })
      .then((res) => console.log("res", res))
      .catch((err) => console.log(err));

    const newsetitems = items.map((item) =>
      item.id == x.id ? { ...item, value: e.target.value } : item
    );
    console.log("newsetitems", newsetitems);
    setItems(newsetitems);
  };

  const handleAdd = (data) => {
    console.log("called", data);
    const type = {
      type: data,
      value: "",
      id: Math.random().toString(16).slice(-4),
    };
    console.log("type", type);
    setItems([...items, type]);
    setAnchorEl(null);
  };

  return (
    <Grid>
      <Grid display={"flex"} direction={"column"} gap={1}>
        <Grid
          paddingTop={1}
          paddingRight={3}
          display={"flex"}
          justifyContent={"end"}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </Grid>
        <Grid>
          <hr color="gray"></hr>
        </Grid>
      </Grid>

      <Grid
        display={"flex"}
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
              <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Title"
                value={title}
                variant="outlined"
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
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
              <Card
                key={x}
                sx={{
                  width: "100%",
                  boxShadow: 4,
                  mb: 2,
                }}
              >
                <CancelIcon
                  sx={{ color: "grey", mt: 1, ml: 1 }}
                  onClick={() => handleDelete(x)}
                />
                <CardContent>
                  {x.type === "text" && (
                    <TextField
                      sx={{ width: "100%" }}
                      id="outlined-basic"
                      label="Text"
                      variant="outlined"
                      type={"text"}
                      onChange={(e) => handleValue(e, x)}
                      value={x.value}
                    />
                  )}
                  {x.type === "file" && (
                    <input
                      type="file"
                      value={x.value}
                      accept=""
                      onChange={(e) => handleValue(e, x)}
                    ></input>
                  )}
                  {x.type === "youtube" && (
                    <TextField
                      sx={{ width: "100%" }}
                      id="outlined-basic"
                      label="url"
                      variant="outlined"
                      type={"url"}
                      onChange={(e) => handleValue(e, x)}
                      value={x.value}
                    />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Grid>
        <Grid display={"flex"} justifyContent={"space-between"}>
          <Button
            sx={{ mb: 2, width: 130 }}
            variant="contained"
            onClickCapture={() => handleSubmit()}
          >
            submit
          </Button>
          <Button
            sx={{ mb: 2, width: 130 }}
            variant="contained"
            // onClick={() => router.back()}
            onClick={() => setItems([])}
          >
            Cancel
          </Button>
        </Grid>
        {/* <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/_g9sAB0hn-E"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe> */}
      </Grid>
    </Grid>
  );
}
