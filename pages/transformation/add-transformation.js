import React from "react";
import { Grid, Typography } from "@mui/material";
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
  const [anchorElBefore, setAnchorElBefore] = React.useState(null);
  const [anchorElAfter, setAnchorElAfter] = React.useState(null);
  const [itemsBefore, setItemsBefore] = React.useState([]);
  const [itemsAfter, setItemsAfter] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [textBefore, setTextBefore] = React.useState("");

  const [fileBefore, setFileBefore] = React.useState("");
  const [textAfter, setTextAfter] = React.useState("");

  const [fileAfter, setFileAfter] = React.useState("");
  const openBefore = Boolean(anchorElBefore);
  const openAfter = Boolean(anchorElAfter);
  const router = useRouter();
  let Url = "https://www.youtube.com/embed/_g9sAB0hn-E";

  let Id = Url.split("embed");
  console.log("id", Id[1]);

  const handleClickAfter = (event) => {
    console.log("event", event);
    setAnchorElAfter(event.currentTarget);
  };
  const handleClickBefore = (event) => {
    console.log("event", event);
    setAnchorElBefore(event.currentTarget);
  };
  const handleCloseBefore = () => {
    setAnchorElBefore(null);
  };
  const handleCloseAfter = () => {
    setAnchorElAfter(null);
  };
  const handleSubmit = () => {
    console.log("Submit");
    const CardData = {
      title: title,
      Before: [{ textBefore: textBefore, fileBefore: fileBefore }],
      After: [{ textAfter: textAfter, fileAfter: fileAfter }],
    };
    console.log("CardData", CardData);
  };

  const handleAddBefore = (data) => {
    console.log("called", data);
    const type = { type: data };
    console.log("type", type);
    setItemsBefore([...itemsBefore, type]);
    // setItems([...items, type]);
    setAnchorElBefore(null);
  };
  const handleAddAfter = (data) => {
    console.log("called", data);
    const type = { type: data };
    console.log("type", type);
    setItemsAfter([...itemsAfter, type]);
    // setItems([...items, type]);
    setAnchorElAfter(null);
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
        anchorEl={anchorElBefore}
        open={openBefore}
        onClose={handleCloseBefore}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleAddBefore("text")}>
          <AbcIcon sx={{ mr: 1, fontSize: 30 }}></AbcIcon>
          {""} Text
        </MenuItem>
        <MenuItem onClick={() => handleAddBefore("file")}>
          <ImageIcon sx={{ mr: 2 }}></ImageIcon>Image
        </MenuItem>
      </Menu>

      <Menu
        id="basic-menu"
        anchorEl={anchorElAfter}
        open={openAfter}
        onClose={handleCloseAfter}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleAddAfter("text")}>
          <AbcIcon sx={{ mr: 1, fontSize: 30 }}></AbcIcon>
          {""} Text
        </MenuItem>
        <MenuItem onClick={() => handleAddAfter("file")}>
          <ImageIcon sx={{ mr: 2 }}></ImageIcon>Image
        </MenuItem>
      </Menu>

      <Grid mb={2}>
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
      <Grid display={"flex"} gap={2} mb={2}>
        <Grid sx={{ width: "100%" }}>
          <Card sx={{ width: "100%" }}>
            {" "}
            <Grid display={"flex"} direction={"column"} mt={2} ml={3}>
              <Typography variant="h6">Before</Typography>
              <Button
                id="demo-customized-button"
                aria-controls={openBefore ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openBefore ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClickBefore}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ width: 130, mb: 12, mt: 1 }}
              >
                Options
              </Button>
            </Grid>
            <Grid>
              {itemsBefore?.map((x) => {
                return (
                  <Grid
                    key={x}
                    sx={{ px: 2 }}
                    display={"flex"}
                    direction={"row"}
                  >
                    <Card key={x} sx={{ width: "100%", boxShadow: 4, mb: 2 }}>
                      <CardContent>
                        {x.type === "text" && (
                          <TextField
                            sx={{ width: "100%" }}
                            id="outlined-basic"
                            label="Text Before"
                            variant="outlined"
                            type={"text"}
                            onChange={(e) =>
                              setTextBefore(e.currentTarget.value)
                            }
                            value={textBefore}
                          />
                        )}
                        {x.type === "file" && (
                          <input
                            type="file"
                            value={fileBefore}
                            onChange={(e) =>
                              setFileBefore(e.currentTarget.value)
                            }
                          ></input>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Card>
        </Grid>
        <Grid sx={{ width: "100%" }}>
          <Card sx={{ width: "100%" }}>
            {" "}
            <Grid display={"flex"} direction={"column"} mt={2} ml={3}>
              <Typography variant="h6">After</Typography>
              <Button
                id="demo-customized-button"
                aria-controls={openAfter ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openAfter ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClickAfter}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ width: 130, mb: 12, mt: 1 }}
              >
                Options
              </Button>
            </Grid>
            <Grid>
              {itemsAfter?.map((x) => {
                return (
                  <Grid
                    key={x}
                    sx={{ px: 2 }}
                    display={"flex"}
                    direction={"row"}
                  >
                    <Card key={x} sx={{ width: "100%", boxShadow: 4, mb: 2 }}>
                      <CardContent>
                        {x.type === "text" && (
                          <TextField
                            sx={{ width: "100%" }}
                            id="outlined-basic"
                            label="Text After"
                            variant="outlined"
                            type={"text"}
                            onChange={(e) =>
                              setTextAfter(e.currentTarget.value)
                            }
                            value={textAfter}
                          />
                        )}
                        {x.type === "file" && (
                          <input
                            type="file"
                            value={fileAfter}
                            onChange={(e) =>
                              setFileAfter(e.currentTarget.value)
                            }
                          ></input>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Card>
        </Grid>
      </Grid>
      {/* <Grid>

      </Grid> */}
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
    </Grid>
  );
}
