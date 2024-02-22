import React, { useEffect } from "react";
import { Divider, Grid, Typography } from "@mui/material";
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
import * as Yup from "yup";
import { useFormik } from "formik";

export default function PatientStoriesFields() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      supabase
        .from("patient_stories")
        .select()
        .eq("id", id)
        .single()
        .then((response) => {
          setFieldValue("items", response?.data?.items);
          setFieldValue("title", response?.data?.title);
        });
    }
  }, [id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleValue = (e, x) => {
    const newsetitems = values.items.map((item) =>
      item.id == x.id ? { ...item, value: e.target.value } : item
    );

    setFieldValue("items", newsetitems);
  };
  const handleDelete = ({ id, value }) => {
    supabase.storage.from("media").remove(value);

    const newitems = values.items.filter((item) => id !== item.id);
    setFieldValue("items", newitems);
  };

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    items: Yup.array().min(1, "These fields are required"),
  });
  const {
    handleBlur,
    handleChange,
    values,
    setFieldValue,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      title: "",

      items: [],
    },

    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: (values, { resetForm }) => {
      const data = {
        title: values.title,
        items: values.items,
      };
      supabase
        .from("patient_stories")
        .insert(data)
        .then((response) => {
          console.log("response", response);
        });
      resetForm({ title: "", items: [] });
    },
  });

  const handleUpdate = () => {
    supabase
      .from("patient_stories")
      .update({ title: values.title, items: values.items })
      .eq("id", id)
      .then((response) => {
        router.back();
      });
  };

  const handleFile = (e, x) => {
    const filedata = e?.target?.files[0];

    supabase.storage
      .from("media")
      .upload(filedata?.name + Date.now(), filedata, {
        cacheControl: "3600",
        upsert: false,
      })
      .then((res) => {
        const newsetitems = values.items.map((item) =>
          item.id == x.id ? { ...item, value: res.data.path } : item
        );

        setFieldValue("items", newsetitems);
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = (data) => {
    const type = {
      type: data,
      value: "",
      file: "",
      id: Math.random().toString(16).slice(-4),
    };

    setFieldValue("items", [...values.items, type]);
    setAnchorEl(null);
  };

  return (
    <Grid>
      <form onSubmit={handleSubmit}>
        <Grid display={"flex"} direction={"column"} gap={1}>
          <Grid>
            <Grid
              paddingTop={2}
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
                  type="submit"
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
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.title}
                  helperText={errors.title ?? ""}
                />
              </CardContent>
            </Card>
          </Grid>
          {values.items && errors.items ? (
            <Typography
              sx={{ mt: 2, textAlign: "center", color: "#D32F2F" }}
              variant="body2"
            >
              {errors.items}
            </Typography>
          ) : null}
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
            {values?.items?.map((x) => {
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
      </form>
    </Grid>
  );
}
