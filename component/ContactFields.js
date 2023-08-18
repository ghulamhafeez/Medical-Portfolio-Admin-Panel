import React, { useEffect } from "react";
import { Divider, Grid } from "@mui/material";
import { useRouter } from "next/router";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AddField } from "./AddField";
import AbcIcon from "@mui/icons-material/Abc";
import ImageIcon from "@mui/icons-material/Image";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { supabase } from "../pages/api/supabase";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ContactFields() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [title, setTitle] = React.useState("");

  const open = Boolean(anchorEl);

  const router = useRouter();

  const { id } = router.query;

  //   useEffect(() => {
  //     if (id) {
  //       supabase
  //         .from("cases_gallery")
  //         .select()
  //         .eq("id", id)
  //         .single()
  //         .then((response) => {
  //           console.log("res", response?.data);
  //           setItems(response?.data?.items);

  //           setTitle(response?.data?.title);
  //           //   setBlogs(response?.data);
  //         });
  //     }
  //   }, []);

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
  const handleDelete = ({ id, value }) => {
    supabase.storage.from("media").remove(value);

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
      .then((response) => {
        setItems([]);
        setTitle("");
      });

    setItems([]);
  };
  //   const handleUpdate = () => {
  //     supabase
  //       .from("patient_stories")
  //       .update({ title: title, items: items })
  //       .eq("id", id)
  //       .then((response) => {
  //         setItems([]);
  //         setTitle("");
  //         setItems([]);
  //         router.back();
  //       });
  //   };

  const handleFile = (e, x) => {
    console.log("e", e?.target?.files[0]);
    const filedata = e?.target?.files[0];

    supabase.storage
      .from("media")
      .upload(filedata?.name + Date.now(), filedata, {
        cacheControl: "3600",
        upsert: false,
      })
      .then((res) => {
        console.log("res?.key", res);
        const newsetitems = items.map((item) =>
          item.id == x.id ? { ...item, value: res.data.path } : item
        );
        console.log("newsetitems", newsetitems);
        setItems(newsetitems);
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = (data) => {
    console.log("called", data);
    const type = {
      type: data,
      value: "",
      file: "",
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
            {id ? (
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
                onClickCapture={() => handleUpdate()}
              >
                Update
              </Button>
            ) : (
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
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid>
          <Divider />
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
          <Card
            sx={{
              width: "100%",
              height: 100,
              boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.7",
            }}
          >
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

        <Grid display={"flex"} justifyContent={"center"} mt={4}>
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
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
          {items?.map((x) => {
            return (
              <Card key={x} sx={{ width: "100%", boxShadow: 4, mb: 2 }}>
                <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <CancelIcon
                    sx={{
                      color: "grey",
                      mt: 1,
                      mr: 1,
                    }}
                    onClick={() => handleDelete(x)}
                  />
                </Grid>
                <Grid sx={{ padding: "0 16px 16px" }}>
                  <AddField
                    key={x.id}
                    field={x}
                    handleFile={(e) => handleFile(e, x)}
                    handleValue={(e) => handleValue(e, x)}
                  />
                </Grid>
              </Card>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
