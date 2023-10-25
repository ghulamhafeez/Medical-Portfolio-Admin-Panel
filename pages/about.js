import React, { useEffect, useState, useCallback } from "react";
import { Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { FIRST_PATH } from "../constants/Constant";
import Textarea from "@mui/joy/Textarea";
import { supabase } from "../pages/api/supabase";
import Button from "@mui/material/Button";
// import Cropper from "react-easy-crop";
import { AddField } from "../component/AddField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import AbcIcon from "@mui/icons-material/Abc";
import ImageIcon from "@mui/icons-material/Image";
import * as Yup from "yup";
import { useFormik } from "formik";
import Card from "@mui/material/Card";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function About() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [email] = useState(localStorage.getItem("login") || "");
  // const [crop, setCrop] = useState({ x: 0, y: 0 });
  // const [zoom, setZoom] = useState(1);
  // const [open, setOpen] = React.useState(false);
  // const [img, setImg] = useState();

  // const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
  //   console.log("croppedArea", croppedArea, croppedAreaPixels);
  // }, []);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  useEffect(() => {
    getAboutData();
  }, []);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const getAboutData = () => {
    supabase
      .from("authentication")
      .select()
      .eq("email", "drharis@test.com")
      .single()
      .then((response) => {
        console.log("Fretresponse", response?.data);

        setFieldValue("bio", response?.data?.bio);
        setFieldValue("avatarImg", response?.data?.avatarImg);
        setFieldValue("items", response?.data?.items);
      });
  };

  const handleFile = (e, x) => {
    const filedata = e?.target?.files[0];
    supabase.storage
      .from("media")
      .upload("bio/" + filedata?.name + Date.now(), filedata, {
        cacheControl: "3600",
        upsert: false,
      })
      .then((res) => {
        // setOpen(true);
        // setImg(res?.data?.path);
        const newsetitems = values?.items.map((item) =>
          item.id == x.id ? { ...item, value: res?.data?.path } : item
        );
        console.log("newsetitems", newsetitems);
        setFieldValue("items", newsetitems);
      })
      .catch((err) => console.log(err));
  };

  const handAvatarFile = (e) => {
    const filedata = e?.target?.files[0];

    supabase.storage
      .from("media")
      .upload("bio/" + filedata?.name + Date.now(), filedata, {
        cacheControl: "3600",
        upsert: false,
      })
      .then((res) => {
        setFieldValue("avatarImg", res?.data?.path);
      })
      .catch((err) => console.log(err));
  };
  const handleAdd = (data) => {
    const type = {
      type: data,
      value: "",
      id: Math.random().toString(16).slice(-4),
    };

    setFieldValue("items", [...values?.items, type]);
    setAnchorEl(null);
  };

  const handleDelete = ({ id, value }) => {
    supabase.storage.from("media").remove(value);

    const newitems = values.items.filter((item) => id !== item.id);

    console.log("newitems", newitems);
    setFieldValue("items", newitems);
  };
  const {
    handleBlur,
    handleChange,
    values,
    setFieldValue,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      avatarImg: "",
      bio: "",
      items: [],
    },

    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: (values, { resetForm }) => {
      const data = {
        avatarImg: values.avatarImg,
        bio: values.bio,
        items: values.items,
      };

      supabase
        .from("authentication")
        .update(data)
        .eq("email", "drharis@test.com")
        .then((res) => console.log("res", res));
      // resetForm({ title: "", headerFile: "", items: [] });
    },
  });

  return (
    <Grid
      display={"flex"}
      direction={"column"}
      justifyContent={"center"}
      mt={10}
      px={{ xl: 45, lg: 40, md: 20, sm: 10, xs: 2 }}
      gap={3}
    >
      <form onSubmit={handleSubmit}>
        <Grid>
          <label for="file">
            <Avatar
              alt="Travis Howard"
              src={`${FIRST_PATH}${values?.avatarImg}`}
              sx={{ width: 140, height: 140 }}
              value={values?.avatarImg}
            />
          </label>
          <input
            id="file"
            type="file"
            onChange={(e) => handAvatarFile(e)}
            hidden
          />
        </Grid>

        <Grid display={"flex"} direction={"column"} gap={2}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            sx={{ width: "100%" }}
            disabled
          />

          <Textarea
            placeholder="Type in here…"
            required
            minRows={10}
            sx={{ mb: 1, width: "100%" }}
            value={values?.bio}
            onChange={handleChange}
          />

          <Grid item xs={6} mb={2}>
            <Card sx={{ width: "100%", boxShadow: 4 }}>
              <CardHeader
                sx={{ color: "#666666" }}
                title={"Home Slider Images"}
              />
              <MenuItem onClick={() => handleAdd("file")}>
                <ImageIcon sx={{ mr: 2 }}></ImageIcon>Image
              </MenuItem>
            </Card>
          </Grid>
          {/* <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Cropper</DialogTitle>
            <Box sx={{ width: 600, height: 500 }}>
              <Cropper
                // image="https://i.brecorder.com/primary/2021/06/60d48302d4a99.jpg"

                image={`${FIRST_PATH}${img}`}
                crop={crop}
                zoom={zoom}
                aspect={1200 / 600}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </Box>
            <Button onClick={() => handleSave()}>Save</Button>
          </Dialog> */}

          <Grid direction="column" container mb={2} mt={2} spacing={2}>
            {values?.items?.map((x) => {
              console.log("x", x);
              return (
                <Grid item key={x}>
                  <Card
                    sx={{
                      width: "100%",
                      boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.7",
                      mb: 2,
                    }}
                  >
                    <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <CancelIcon
                        sx={{
                          color: "grey",
                          mt: 1,
                          mr: 1,
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(x)}
                      />
                    </Grid>

                    <Grid sx={{ padding: "0 16px 16px" }}>
                      <AddField
                        key={x.id}
                        field={x}
                        handleFile={(e) => handleFile(e, x)}
                      />
                    </Grid>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Button
            sx={{
              mb: 6,
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
        </Grid>
      </form>
    </Grid>
  );
}
