import React, { useEffect, useState, useCallback } from "react";
import { Grid, Divider, InputLabel, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { FIRST_PATH } from "../constants/Constant";
import { useRouter } from "next/router";
import { supabase } from "../pages/api/supabase";
import Button from "@mui/material/Button";
import { AddField } from "../component/AddField";
import MenuItem from "@mui/material/MenuItem";
import CardHeader from "@mui/material/CardHeader";
import ImageIcon from "@mui/icons-material/Image";
import { useFormik } from "formik";
import Card from "@mui/material/Card";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Home() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getAboutData();
  }, []);

  const getAboutData = () => {
    supabase
      .from("home")
      .select()
      .order("id", { ascending: false })
      .then((response) => {
        console.log("response123", response);
        setFieldValue("items", response?.data?.[0].items);
        setFieldValue("revolvingItems", response?.data?.[0].revolvingItems);
      });
  };

  const handleRevolvingFile = (e, x, i) => {
    const filedata = e?.target?.files[0];
    console.log("filedata", filedata);
    supabase.storage
      .from("media")
      .upload("bio/" + filedata?.name + Date.now(), filedata, {
        cacheControl: "3600",
        upsert: false,
      })
      .then((res) => {
        const newsetitems = values?.revolvingItems.map((item) =>
          item.id == x.id ? { ...item, value: res?.data?.path } : item
        );

        console.log("newsetitems", newsetitems);

        setFieldValue("revolvingItems", newsetitems);
      })
      .catch((err) => console.log(err));
  };

  const handleFile = (e, x, i) => {
    const filedata = e?.target?.files[0];
    console.log("filedata", filedata);
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

  const handleAddRevolving = () => {
    const type = {
      type: "file",
      value: "",

      id: Math.random().toString(16).slice(-4),
    };
    console.log("values", values);
    setFieldValue("revolvingItems", [...(values?.revolvingItems || []), type]);

    setAnchorEl(null);
  };

  const handleDelete = ({ id, value }) => {
    supabase.storage.from("media").remove(value);

    const newitems = values.items.filter((item) => id !== item.id);

    setFieldValue("items", newitems);
  };

  const handleDeleteRevolving = ({ id, value }) => {
    supabase.storage.from("media").remove(value);

    const newitems = values.revolvingItems.filter((item) => id !== item.id);

    setFieldValue("revolvingItems", newitems);
  };

  const { handleBlur, handleChange, values, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: {
        items: [],
        revolvingItems: [],
      },

      validateOnBlur: false,
      validateOnChange: false,

      onSubmit: (values) => {
        const data = {
          items: values.items,
          revolvingItems: values.revolvingItems,
        };

        supabase
          .from("home")
          .update(data)
          .eq("id", "0")
          .then((response) => {
            console.log("response", response);
          });
      },
    });

  return (
    <Grid display={"flex"} container direction={"column"} gap={2} mb={2}>
      <form onSubmit={handleSubmit}>
        <Grid display={"flex"} direction={"column"} gap={1}>
          <Grid
            paddingTop={2}
            paddingRight={3}
            display={"flex"}
            justifyContent={"end"}
          >
            <Button
              sx={{
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

          <Grid>
            <Divider />
          </Grid>
        </Grid>

        <Grid
          display={"flex"}
          direction={"column"}
          gap={2}
          mt={2}
          px={{ xl: 45, lg: 40, md: 20, sm: 10, xs: 2 }}
        >
          <Grid item xs={6} mb={2}>
            <Card sx={{ width: "100%", boxShadow: 4 }}>
              <CardHeader
                sx={{ color: "#666666" }}
                title={"Add revolving image"}
              />
              {/* <Typography sx={{ ml: "18px", color: "grey" }}>
                  Add revolving image
                </Typography> */}
              <MenuItem onClick={() => handleAddRevolving()}>
                <ImageIcon sx={{ mr: 2 }}></ImageIcon>Image
              </MenuItem>
            </Card>
          </Grid>
          <Grid direction="column" container mb={2} mt={2} spacing={2}>
            {values?.revolvingItems
              ?.slice()
              .reverse()
              .map((x, index) => {
                return (
                  <Grid item key={x}>
                    <Card
                      sx={{
                        width: "100%",
                        boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.7",
                        mb: 2,
                      }}
                    >
                      <Grid
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <CancelIcon
                          sx={{
                            color: "grey",
                            mt: 1,
                            mr: 1,
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeleteRevolving(x)}
                        />
                      </Grid>

                      <Grid sx={{ padding: "0 16px 16px" }}>
                        <AddField
                          key={x.id}
                          field={x}
                          handleFile={(e) => handleRevolvingFile(e, x)}
                        />
                      </Grid>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
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

          <Grid direction="column" container mb={2} mt={2} spacing={2}>
            {values?.items
              ?.slice()
              .reverse()
              .map((x, index) => {
                console.log("xt", x);
                return (
                  <Grid item key={x}>
                    <Card
                      sx={{
                        width: "100%",
                        boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.7",
                        mb: 2,
                      }}
                    >
                      <Grid
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
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
                        />
                      </Grid>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
