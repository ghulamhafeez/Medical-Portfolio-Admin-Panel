import React from "react";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import AbcIcon from "@mui/icons-material/Abc";
import ImageIcon from "@mui/icons-material/Image";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { supabase } from "../api/supabase";
import CancelIcon from "@mui/icons-material/Cancel";
export default function AddPatientStories() {
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

  const handleValue = (e, x) => {
    console.log("e", e.target.value);

    const newsetitems = items.map((item) =>
      item.id == x.id ? { ...item, value: e.target.value } : item
    );
    console.log("newsetitems", newsetitems);
    setItems(newsetitems);
  };
  const handleDelete = ({ id }) => {
    const newitems = items.filter((item) => id !== item.id);

    console.log("newsetitems", newitems);
    setItems(newitems);
  };
  const handleSubmit = () => {
    console.log("Submit");
    // const CardData = {
    //   title: title,
    //   text: text,
    //   file: file,
    // };
    supabase
      .from("patient_stories")
      .insert({ title: title, items: items })
      .then((response) => {});

    setItems([]);
  };

  const handleAdd = (data) => {
    console.log("called", data);
    const type = {
      type: data,
      value: "",
      id: Math.random().toString(16).slice(-4),
    };
    setItems([...items, type]);
    setAnchorEl(null);
    // const newItems = items.slice();
    // newItems.push(type);
    // setItems(newItems);
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
                      onChange={(e) => handleValue(e, x)}
                    ></input>
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
      </Grid>
    </Grid>
  );
}
