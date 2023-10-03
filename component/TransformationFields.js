import React, { useEffect } from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { FIRST_PATH } from "../constants/Constant";
import * as Yup from "yup";
import { useFormik } from "formik";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { supabase } from "../pages/api/supabase";
import CancelIcon from "@mui/icons-material/Cancel";

export default function TransformationFields() {
  const router = useRouter();
  const { id } = router.query;
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    afterFile: Yup.array().min(1, "After items are required"),
    beforeFile: Yup.array().min(1, "Before items are required"),
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
      beforeFile: [],
      beforeText: "",
      title: "",
      afterFile: [],
      afterText: "",
    },

    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: (values, { resetForm }) => {
      const data = {
        beforeFile: values.beforeFile,
        beforeText: values.beforeText,
        title: values.title,
        afterFile: values.afterFile,
        afterText: values.afterText,
      };

      supabase
        .from("transformation")
        .insert(data)
        .then((response) => {
          console.log("response", response);
        });
      resetForm({
        title: "",
        beforeText: "",
        beforeFile: [],
        afterText: "",
        afterFile: [],
      });
    },
  });

  useEffect(() => {
    if (id) {
      supabase
        .from("transformation")
        .select()
        .eq("id", id)
        .single()
        .then((response) => {
          setFieldValue("beforeFile", response?.data?.beforeFile);
          setFieldValue("beforeText", response?.data?.beforeText);
          setFieldValue("afterFile", response?.data?.afterFile);
          setFieldValue("afterText", response?.data?.afterText);
          setFieldValue("title", response?.data?.title);
        });
    }
  }, [id]);

  const handleDeleteBefore = (x) => {
    supabase.storage.from("media").remove(x);
    const newitems = values.beforeFile.filter((item) => x !== item);

    setFieldValue("beforeFile", newitems);
  };
  const handleDeleteAfter = (x) => {
    supabase.storage.from("media").remove(x);
    const newitems = values.afterFile.filter((item) => x !== item);
    setFieldValue("afterFile", newitems);
  };

  const handleUpdate = () => {
    supabase
      .from("transformation")
      .update({
        beforeFile: values.beforeFile,
        beforeText: values.beforeText,
        title: values.title,
        afterFile: values.afterFile,
        afterText: values.afterText,
      })
      .eq("id", id)
      .then((response) => {
        console.log("response", response);

        router.back();
      })
      .catch((err) => console.log("err", err));
  };

  const handleAfterFile = async (e) => {
    const filedata = e?.target?.files;
    const files = [];
    for (const file of filedata) {
      const metadata = await supabase.storage
        .from("media")
        .upload(file?.name + Date.now(), file, {
          cacheControl: "3600",
          upsert: false,
        });
      files.push(metadata.data.path);
    }

    setFieldValue("afterFile", files);
  };

  const handleBeforeFile = async (e) => {
    const filedata = e?.target?.files;

    const files = [];
    for (const file of filedata) {
      const metadata = await supabase.storage
        .from("media")
        .upload(file?.name + Date.now(), file, {
          cacheControl: "3600",
          upsert: false,
        });

      files.push(metadata.data.path);
    }
    setFieldValue("beforeFile", files);
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
          <Grid container xs={12} spacing={2}>
            <TextField
              sx={{ width: "100%", mb: 2, ml: 2 }}
              id="outlined-basic"
              label="Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.title}
              helperText={errors.title ?? ""}
            />

            <Grid item xs={6} mb={2}>
              <Card sx={{ width: "100%", boxShadow: 4 }}>
                <CardHeader sx={{ color: "#666666" }} title={"Before"} />

                <CardContent>
                  <Grid container>
                    {values?.beforeFile?.map((x) => {
                      return (
                        <Grid key={x} display={"flex"} direction={"column"}>
                          <Grid
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <CancelIcon
                              sx={{
                                color: "grey",
                                mt: 1,
                                mr: 1,
                                cursor: "pointer",
                              }}
                              onClick={() => handleDeleteBefore(x)}
                            />
                          </Grid>
                          <Grid>
                            <img
                              width={50}
                              height={40}
                              alt={"Image"}
                              object-fit="cover"
                              src={`${FIRST_PATH}${x}`}
                            ></img>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>

                  <input
                    type="file"
                    onChange={(e) => handleBeforeFile(e)}
                    multiple
                  ></input>

                  <TextField
                    sx={{ width: "100%", mt: 2 }}
                    id="outlined-basic"
                    label="Text"
                    type={"text"}
                    name="beforeText"
                    value={values.beforeText}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                  />
                </CardContent>
              </Card>
              {values.beforeFile && errors.beforeFile ? (
                <Typography
                  sx={{ mt: 1, textAlign: "center", color: "#D32F2F" }}
                  variant="body2"
                >
                  {errors.beforeFile}
                </Typography>
              ) : null}
            </Grid>

            <Grid item xs={6} mb={2}>
              <Card sx={{ width: "100%", boxShadow: 4 }}>
                <CardHeader sx={{ color: "#666666" }} title={"After"} />

                <CardContent>
                  <Grid container>
                    {values?.afterFile?.map((x) => {
                      return (
                        <Grid key={x} display={"flex"} direction={"column"}>
                          <Grid
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <CancelIcon
                              sx={{
                                color: "grey",
                                mt: 1,
                                mr: 1,
                                cursor: "pointer",
                              }}
                              onClick={() => handleDeleteAfter(x)}
                            />
                          </Grid>
                          <Grid>
                            <img
                              width={50}
                              height={40}
                              alt={"Image"}
                              object-fit="cover"
                              src={`${FIRST_PATH}${x}`}
                            ></img>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>

                  <input
                    type="file"
                    onChange={(e) => handleAfterFile(e)}
                    //   value={afterFile}
                    multiple
                  ></input>

                  <TextField
                    sx={{ width: "100%", mt: 2 }}
                    id="outlined-basic"
                    label="Text"
                    type={"text"}
                    name="afterText"
                    value={values.afterText}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // error={errors.title}
                    // helperText={errors.title ?? ""}
                    variant="outlined"
                  />
                </CardContent>
              </Card>
              {values.afterFile && errors.afterFile ? (
                <Typography
                  sx={{ mt: 1, textAlign: "center", color: "#D32F2F" }}
                  variant="body2"
                >
                  {errors.afterFile}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
