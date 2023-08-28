import React, { useEffect } from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { FIRST_PATH } from "../constants/Constant";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { supabase } from "../pages/api/supabase";
import CancelIcon from "@mui/icons-material/Cancel";

export default function CasesGalleryFields() {
  const [beforeFile, setBeforeFile] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [afterFile, setAfterFile] = React.useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      supabase
        .from("cases_gallery")
        .select()
        .eq("id", id)
        .single()
        .then((response) => {
          setTitle(response?.data?.title);
          setBeforeFile(response?.data?.beforeFile),
            setAfterFile(response?.data?.afterFile);
        });
    }
  }, [id]);

  const handleDeleteBefore = (x) => {
    supabase.storage.from("media").remove(x);
    const newitems = beforeFile.filter((item) => x !== item);

    setBeforeFile(newitems);
  };
  const handleDeleteAfter = (x) => {
    supabase.storage.from("media").remove(x);
    const newitems = afterFile.filter((item) => x !== item);

    setAfterFile(newitems);
  };
  const handleSubmit = () => {
    supabase
      .from("cases_gallery")
      .insert({
        beforeFile: beforeFile,

        title: title,
        afterFile: afterFile,
      })
      .then((response) => {
        console.log({ response });
        setBeforeFile([]), setTitle(""), setAfterFile([]), router.back();
      });
  };
  const handleUpdate = () => {
    supabase
      .from("cases_gallery")
      .update({
        beforeFile: beforeFile,

        title: title,
        afterFile: afterFile,
      })
      .eq("id", id)
      .then((response) => {
        console.log("response", response);
        setBeforeFile([]), setTitle(""), setAfterFile([]), router.back();
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
    setAfterFile(files);
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

    setBeforeFile(files);
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
        mt={10}
        direction={"column"}
        px={{ xl: 30, lg: 20, md: 15, sm: 13 }}
      >
        <Grid container xs={12} spacing={2}>
          <TextField
            sx={{ width: "100%", mb: 2, ml: 2 }}
            id="outlined-basic"
            label="Title"
            value={title}
            variant="outlined"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <Grid item xs={6} mb={2}>
            <Card sx={{ width: "100%", boxShadow: 4 }}>
              <CardHeader sx={{ color: "#666666" }} title={"Before"} />
              <CardContent>
                <Grid container>
                  {beforeFile?.map((x) => {
                    return (
                      <Grid
                        key={x}
                        // container
                        display={"flex"}
                        direction={"column"}
                      >
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
                  //   value={beforeFile}
                  multiple
                ></input>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} mb={2}>
            <Card sx={{ width: "100%", boxShadow: 4 }}>
              <CardHeader sx={{ color: "#666666" }} title={"After"} />
              <CardContent>
                <Grid container>
                  {afterFile?.map((x) => {
                    return (
                      <Grid
                        key={x}
                        // container
                        display={"flex"}
                        direction={"column"}
                      >
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
