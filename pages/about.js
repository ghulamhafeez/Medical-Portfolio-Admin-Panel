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

  const handleFile = (e, x, i) => {
    console.log("asd", x, i);
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

        // const newsetitems = values?.items.map((item, i) =>
        //   i === index ? { ...item, value: res?.data?.path } : item
        // );
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
  const handleAdd = () => {
    const type = {
      type: "file",
      value: "",
      url: "",
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
  // const schema = Yup.object().shape({
  //   url: Yup.string().required("Url is required"),
  // });
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
      phoneNo: "",
      address: "",
    },

    validateOnBlur: false,
    validateOnChange: false,
    // validationSchema: schema,

    onSubmit: (values, { resetForm }) => {
      console.log("called", values);
      const data = {
        avatarImg: values.avatarImg,
        bio: values.bio,
        items: values.items,
        phoneNo: values.phoneNo,
        address: values.address,
      };

      supabase
        .from("authentication")
        .update(data)
        .eq("email", "drharis@test.com")
        .then((res) => console.log("res", res));
      resetForm({ url: "" });
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
              sx={{ width: 140, height: 140, mb: 2 }}
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
                title={"Add Home Slider Image"}
              />
              <Typography sx={{ ml: "18px", color: "grey" }}>
                Image ratio 1200 x 600
              </Typography>
              <MenuItem onClick={() => handleAdd()}>
                <ImageIcon sx={{ mr: 2 }}></ImageIcon>Image
              </MenuItem>
            </Card>
          </Grid>

          <Grid item xs={6} mb={2}>
            <Card sx={{ width: "100%", boxShadow: 4 }}>
              <CardHeader sx={{ color: "#666666" }} title={"Contact Info"} />

              <TextField
                sx={{ width: { lg: "95%", xs: "90%" }, mb: 2, mt: 2, mx: 2 }}
                id="outlined-basic"
                label="Phone"
                name="phoneNo"
                value={values.phoneNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                sx={{ width: { lg: "95%", xs: "90%" }, mb: 2, mt: 2, mx: 2 }}
                id="outlined-basic"
                label="Address"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Card>
          </Grid>

          <Grid direction="column" container mb={2} mt={2} spacing={2}>
            {values?.items?.map((x, index) => {
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
                      <TextField
                        sx={{ width: "100%", mb: 2, mt: 2 }}
                        id="outlined-basic"
                        label="Url"
                        name={`items[${index}].url`} // Use a unique name for each input
                        value={x.url} // Access the value using the unique name
                        onChange={handleChange} // Pass the unique name to handleChange
                        onBlur={handleBlur}
                        // error={errors[x.url]} // Handle errors similarly
                        // helperText={errors[x.url] ?? ""}
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
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
