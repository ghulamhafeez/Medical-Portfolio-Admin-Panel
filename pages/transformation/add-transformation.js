import React from "react";

import { Button, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import CardContent from "@mui/material/CardContent";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AbcIcon from "@mui/icons-material/Abc";
import ImageIcon from "@mui/icons-material/Image";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { supabase } from "../api/supabase";
import CancelIcon from "@mui/icons-material/Cancel";

export default function AddBlog() {
  const [anchorElBefore, setAnchorElBefore] = React.useState(null);
  const [anchorElAfter, setAnchorElAfter] = React.useState(null);
  const [itemsBefore, setItemsBefore] = React.useState([]);
  const [itemsAfter, setItemsAfter] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const openBefore = Boolean(anchorElBefore);
  const openAfter = Boolean(anchorElAfter);
  const router = useRouter();

  const handleClickAfter = (event) => {
    setAnchorElAfter(event.currentTarget);
  };
  const handleClickBefore = (event) => {
    setAnchorElBefore(event.currentTarget);
  };
  const handleCloseBefore = () => {
    setAnchorElBefore(null);
  };
  const handleCloseAfter = () => {
    setAnchorElAfter(null);
  };
  const handleDeleteBefore = ({ id }) => {
    const newitems = itemsBefore.filter((item) => id !== item.id);

    console.log("newsetitems", newitems);
    setItemsBefore(newitems);
  };
  const handleDeleteAfter = ({ id }) => {
    const newitems = itemsAfter.filter((item) => id !== item.id);

    console.log("newsetitems", newitems);
    setItemsAfter(newitems);
  };
  const handleSubmit = () => {
    console.log("itemsAfter", itemsAfter);

    supabase
      .from("transformation")
      .insert({
        title: title,
        before_items: itemsBefore,
        after_items: itemsAfter,
      })
      .then((response) => {
        console.log({ response });
        setItemsAfter([]);
        setItemsBefore([]);
        setTitle("");
      });
    // console.log("CardData", CardData);
    setItems([]);
  };

  const handleAfterValue = (e, x) => {
    console.log("e", e.target.value);

    const newItems = itemsAfter.map((item) =>
      item.id == x.id ? { ...item, value: e.target.value } : item
    );
    console.log("newItems", itemsAfter);
    setItemsAfter(newItems);
  };

  const handleBeforeValue = (e, x) => {
    console.log("e", e.target.value);

    const newItems = itemsBefore.map((item) =>
      item.id == x.id ? { ...item, value: e.target.value } : item
    );
    console.log("newItems", itemsBefore);
    setItemsBefore(newItems);
  };
  const handleAddBefore = (data) => {
    console.log("data1", data);
    const type = {
      type: data,
      value: "",
      id: Math.random().toString(16).slice(-4),
    };
    setItemsBefore([...itemsBefore, type]);
    setAnchorElBefore(null);
  };
  const handleAddAfter = (data) => {
    const type = {
      type: data,
      value: "",
      id: Math.random().toString(16).slice(-4),
    };

    setItemsAfter([...itemsAfter, type]);
    setAnchorElAfter(null);
  };

  return (
    <Grid>
      <Grid display={"flex"} direction={"column"} gap={1}>
        <Grid>
          <Grid
            paddingTop={1}
            paddingRight={3}
            paddingLeft={6}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Grid>
              <Button
                color="primary"
                sx={{
                  color: "#fff",
                  background: "#212b36",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: "#212b36",
                  },
                }}
                onClick={() => router.back()}
              >
                Back
              </Button>
            </Grid>
            <Button
              sx={{
                width: 130,
                color: "#fff",
                background: "#212b36",
                textTransform: "capitalize",
                "&:hover": {
                  background: "#212b36",
                },
              }}
              onClickCapture={() => handleSubmit()}
            >
              submit
            </Button>
          </Grid>
        </Grid>
        <Grid>
          <Divider />
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
          anchorEl={anchorElBefore}
          open={openBefore}
          onClose={handleCloseBefore}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => handleAddBefore("text")}>
            <AbcIcon sx={{ mr: 1, fontSize: 30 }}></AbcIcon>
            Text
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
            Text
          </MenuItem>
          <MenuItem onClick={() => handleAddAfter("file")}>
            <ImageIcon sx={{ mr: 2 }}></ImageIcon>Image
          </MenuItem>
        </Menu>

        <Grid mb={2}>
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
        <Grid display={"flex"} gap={2} mb={2}>
          <Grid sx={{ width: "100%" }}>
            <Card sx={{ width: "100%" }}>
              {" "}
              <Grid display={"flex"} direction={"column"} mt={2} ml={3}>
                <Typography variant="h6">Before</Typography>
                <Button
                  id="demo-customized-button"
                  aria-controls={
                    openBefore ? "demo-customized-menu" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={openBefore ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClickBefore}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    width: 130,
                    mb: 2,
                    background: "#212b36",
                    textTransform: "capitalize",
                    "&:hover": {
                      background: "#212b36",
                    },
                  }}
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
                        <CancelIcon
                          sx={{ color: "grey", mt: 1, ml: 1 }}
                          onClick={() => handleDeleteBefore(x)}
                        />

                        <CardContent>
                          {x.type === "text" && (
                            <TextField
                              sx={{ width: "100%" }}
                              id="outlined-basic"
                              label="Text Before"
                              variant="outlined"
                              type={"text"}
                              onChange={(e) => handleBeforeValue(e, x)}
                              value={x.value}
                            />
                          )}
                          {x.type === "file" && (
                            <input
                              type="file"
                              onChange={(e) => handleBeforeValue(e, x)}
                              value={x.value}
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
                  sx={{
                    width: 130,
                    mb: 2,
                    background: "#212b36",
                    textTransform: "capitalize",
                    "&:hover": {
                      background: "#212b36",
                    },
                  }}
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
                        <CancelIcon
                          sx={{ color: "grey", mt: 1, ml: 1 }}
                          onClick={() => handleDeleteAfter(x)}
                        />
                        <CardContent>
                          {x.type === "text" && (
                            <TextField
                              sx={{ width: "100%" }}
                              id="outlined-basic"
                              label="Text After"
                              variant="outlined"
                              type={"text"}
                              onChange={(e) => handleAfterValue(e, x)}
                              value={x.value}
                            />
                          )}
                          {x.type === "file" && (
                            <input
                              type="file"
                              onChange={(e) => handleAfterValue(e, x)}
                              value={x.value}
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
      </Grid>
    </Grid>
  );
}
