import React, { useEffect } from "react";
import { Button, Divider, Grid, InputLabel, Typography } from "@mui/material";
import { useRouter } from "next/router";
import CardContent from "@mui/material/CardContent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AbcIcon from "@mui/icons-material/Abc";
import ImageIcon from "@mui/icons-material/Image";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { AddField } from "./AddField";
import CancelIcon from "@mui/icons-material/Cancel";
import { supabase } from "../pages/api/supabase";
import { FIRST_PATH } from "../constants/Constant";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function TreatmentOptionFields() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { id } = router.query;

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    items: Yup.array().min(1, "These items are required"),
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
      headerFile: "",
    },

    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: (values, { resetForm }) => {
      const data = {
        title: values.title,
        headerFile: values.headerFile,
        items: values.items,
      };

      supabase
        .from("treatment_option")
        .insert(data)
        .then((response) => {
          console.log("response", response);
        });
      resetForm({ title: "", items: [], eaderFile: "" });
    },
  });

  useEffect(() => {
    if (id) {
      supabase
        .from("treatment_option")
        .select()
        .eq("id", id)
        .single()
        .then((response) => {
          console.log("res", response?.data);
          setFieldValue("items", response?.data?.items);
          setFieldValue("headerFile", response?.data?.headerFile);
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

  const handleDelete = ({ id, value }) => {
    supabase.storage.from("media").remove(value);

    const newitems = values.items.filter((item) => id !== item.id);

    setFieldValue("items", newitems);
  };

  const handleHeaderDelete = (headerFile) => {
    if (headerFile) {
      supabase.storage
        .from("media")
        .remove(headerFile)
        .then(() => setFieldValue("headerFile", ""));
    }
  };

  const handleUpdate = async () => {
    supabase
      .from("treatment_option")
      .update({
        title: values.title,
        items: values.items,
        headerFile: values.headerFile,
      })
      .eq("id", id)
      .then((response) => {
        console.log({ response });

        router.back();
      });
  };
  const handleValue = (e, x) => {
    console.log("ent", e.target.value);
    const newsetitems = values.items.map((item) =>
      item.id == x.id ? { ...item, value: e.target.value } : item
    );

    setFieldValue("items", newsetitems);
  };

  const handleheaderFile = (e) => {
    const filedata = e?.target?.files[0];

    supabase.storage
      .from("media")
      .upload(filedata?.name + Date.now(), filedata, {
        cacheControl: "3600",
        upsert: false,
      })
      .then((res) => {
        setFieldValue("headerFile", res?.data?.path);
      })
      .catch((err) => console.log(err));
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
                height: "100%",
                boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.7",
              }}
            >
              <CardContent>
                <TextField
                  sx={{ width: "100%", mb: 2 }}
                  id="outlined-basic"
                  label="Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.title}
                  helperText={errors.title ?? ""}
                  variant="outlined"
                />

                <InputLabel sx={{ pb: 2 }}>Header Image</InputLabel>
                {values?.headerFile ? (
                  <Grid>
                    <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <CancelIcon
                        sx={{
                          color: "grey",
                          mt: 1,
                          mr: 1,
                          cursor: "pointer",
                        }}
                        onClick={() => handleHeaderDelete(values.headerFile)}
                      />
                    </Grid>
                    <img
                      width={"100%"}
                      height={400}
                      alt={"Image"}
                      object-fit="cover"
                      src={`${FIRST_PATH}${values?.headerFile}`}
                    ></img>
                  </Grid>
                ) : (
                  <input
                    type="file"
                    onChange={(e) => handleheaderFile(e)}
                  ></input>
                )}
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
          <Grid display={"flex"} justifyContent={"center"} mt={4} mb={2}>
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
          <Grid direction="column" container mb={2} mt={2} spacing={2}>
            {values?.items?.map((x) => {
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
                        handleValue={(e) => handleValue(e, x)}
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
