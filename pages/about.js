import React, { useEffect, useState, useCallback } from "react";
import { Grid, InputLabel, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { FIRST_PATH } from "../constants/Constant";
import Textarea from "@mui/joy/Textarea";
import { supabase } from "../pages/api/supabase";
import Button from "@mui/material/Button";
import { AddField } from "../component/AddField";
import MenuItem from "@mui/material/MenuItem";
import CardHeader from "@mui/material/CardHeader";
import ImageIcon from "@mui/icons-material/Image";
import { useFormik } from "formik";
import Card from "@mui/material/Card";
import CancelIcon from "@mui/icons-material/Cancel";
import CardContent from "@mui/material/CardContent";
export default function About() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [email] = useState(localStorage.getItem("login") || "");

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
        setFieldValue("name", response?.data?.name);
        setFieldValue("specialty", response?.data?.specialty);
        setFieldValue("avatarImg", response?.data?.avatarImg);
        setFieldValue("items", response?.data?.items);
        // setFieldValue("newItems", response?.data?.newItems);
        setFieldValue("pAddress", response?.data?.pAddress);
        setFieldValue("pPhoneNo", response?.data?.pPhoneNo);
        setFieldValue("sAddress", response?.data?.sAddress);
        setFieldValue("sPhoneNo", response?.data?.sPhoneNo);
        // setFieldValue("headerFile", response?.data?.headerFile);
      });
  };

  const handleFile = (e, x, i) => {
    const filedata = e?.target?.files[0];
    supabase.storage
      .from("media")
      .upload("bio/" + filedata?.name + Date.now(), filedata, {
        cacheControl: "3600",
        upsert: false,
      })
      .then((res) => {
        const newsetitems = values?.items.map((item) =>
          item.id == x.id ? { ...item, value: res?.data?.path } : item
        );

        console.log("newsetitems", newsetitems);
        setFieldValue("items", newsetitems);
      })
      .catch((err) => console.log(err));
  };
  // const handleFiled = (e, x, i) => {
  //   const filedata = e?.target?.files[0];
  //   supabase.storage
  //     .from("media")
  //     .upload("bio/" + filedata?.name + Date.now(), filedata, {
  //       cacheControl: "3600",
  //       upsert: false,
  //     })
  //     .then((res) => {
  //       const newsetitems = values?.newItems.map((item) =>
  //         item.id == x.id ? { ...item, value: res?.data?.path } : item
  //       );

  //       console.log("newsetitems", newsetitems);
  //       setFieldValue("newitems", newsetitems);
  //     })
  //     .catch((err) => console.log(err));
  // };

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

    setFieldValue("items", newitems);
  };
  // const handleDeleted = ({ id, value }) => {
  //   supabase.storage.from("media").remove(value);

  //   const newitems = values.newItems.filter((item) => id !== item.id);

  //   setFieldValue("newItems", newitems);
  // };
  const { handleBlur, handleChange, values, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: {
        avatarImg: "",
        bio: "",
        name: "",
        specialty: "",
        items: [],
        // newItems: [],
        pPhoneNo: "",
        pAddress: "",
        sPhoneNo: "",
        sAddress: "",
        // title: "",
        // headerFile: "",
      },

      validateOnBlur: false,
      validateOnChange: false,

      onSubmit: (values) => {
        const data = {
          avatarImg: values.avatarImg,
          bio: values.bio,
          name: values.name,
          specialty: values.specialty,
          items: values.items,
          // newItems: values.newItems,
          pPhoneNo: values.pPhoneNo,
          pAddress: values.pAddress,
          sPhoneNo: values.sPhoneNo,
          sAddress: values.sAddress,
          // title: values.title,
          // headerFile: values.headerFile,
        };

        supabase
          .from("authentication")
          .update(data)
          .eq("email", "drharis@test.com")
          .then(getAboutData());
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
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name" // Add the name attribute
            value={values.name}
            sx={{ width: "100%" }}
            onChange={handleChange} // Pass handleChange
            onBlur={handleBlur} // Pass handleBlur
          />

          <TextField
            id="outlined-basic"
            label="Specialty"
            variant="outlined"
            name="specialty" // Add the name attribute
            value={values.specialty}
            sx={{ mb: 1, width: "100%" }}
            onChange={handleChange} // Pass handleChange
            onBlur={handleBlur} // Pass handleBlur
          />

          <Grid item xs={6} mb={2}>
            <Card sx={{ width: "100%", boxShadow: 4 }}>
              <CardHeader
                sx={{ color: "#666666" }}
                title={"Primary Contact Info"}
              />

              <TextField
                sx={{ width: { lg: "95%", xs: "90%" }, mb: 2, mt: 2, mx: 2 }}
                id="outlined-basic"
                label="Phone"
                name="pPhoneNo"
                value={values.pPhoneNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                sx={{ width: { lg: "95%", xs: "90%" }, mb: 2, mt: 2, mx: 2 }}
                id="outlined-basic"
                label="Address"
                name="pAddress"
                value={values.pAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Card>
          </Grid>
          <Grid item xs={6} mb={2}>
            <Card sx={{ width: "100%", boxShadow: 4 }}>
              <CardHeader
                sx={{ color: "#666666" }}
                title={"Secondary Contact Info"}
              />

              <TextField
                sx={{ width: { lg: "95%", xs: "90%" }, mb: 2, mt: 2, mx: 2 }}
                id="outlined-basic"
                label="Phone"
                name="sPhoneNo"
                value={values.sPhoneNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                sx={{ width: { lg: "95%", xs: "90%" }, mb: 2, mt: 2, mx: 2 }}
                id="outlined-basic"
                label="Address"
                name="sAddress"
                value={values.sAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Card>
          </Grid>

          {/* <Grid item xs={6} mb={2}>
            <Card sx={{ width: "100%", boxShadow: 4 }}>
              <CardHeader
                sx={{ color: "#666666" }}
                title={"Add Home Images With Text"}
              />

              <MenuItem onClick={() => handleAdded()}>
                <ImageIcon sx={{ mr: 2 }}></ImageIcon>Image
              </MenuItem>
            </Card>
          </Grid>
          <Grid direction="column" container mb={2} mt={2} spacing={2}>
            {values?.newItems?.map((x, index) => {
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
                        onClick={() => handleDeleted(x)}
                      />
                    </Grid>

                    <Grid sx={{ padding: "0 16px 16px" }}>
                      <AddField
                        key={x.id}
                        field={x}
                        handleFile={(e) => handleFiled(e, x)}
                      />
                      <TextField
                        sx={{ width: "100%", mb: 2, mt: 2 }}
                        id="outlined-basic"
                        label="Title"
                        name={`newItems[${index}].title`} // Use a unique name for each input
                        value={x?.title} // Access the value using the unique name
                        onChange={handleChange} // Pass the unique name to handleChange
                        onBlur={handleBlur}
                      />
                    </Grid>
                  </Card>
                </Grid>
              );
            })}
          </Grid> */}
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
