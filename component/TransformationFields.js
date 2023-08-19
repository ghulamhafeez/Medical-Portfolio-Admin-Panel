import React, { useEffect } from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { FIRST_PATH } from "../constants/Constant";
import { AddField } from "../component/AddField";

import AbcIcon from "@mui/icons-material/Abc";
import ImageIcon from "@mui/icons-material/Image";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { supabase } from "../pages/api/supabase";
import CancelIcon from "@mui/icons-material/Cancel";

export default function TransformationFields() {
  const [anchorElBefore, setAnchorElBefore] = React.useState(null);
  const [anchorElAfter, setAnchorElAfter] = React.useState(null);
  const [itemsBefore, setItemsBefore] = React.useState([]);
  const [itemsAfter, setItemsAfter] = React.useState([]);

  const [beforeFile, setBeforeFile] = React.useState([]);
  const [beforeText, setBeforeText] = React.useState();
  const [title, setTitle] = React.useState();

  const [afterFile, setAfterFile] = React.useState([]);
  const [afterText, setAfterText] = React.useState();

  const openBefore = Boolean(anchorElBefore);
  const openAfter = Boolean(anchorElAfter);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      supabase
        .from("transformation")
        .select()
        .eq("id", id)
        .single()
        .then((response) => {
          console.log("res", response?.data);

          setTitle(response?.data?.title);
          setBeforeFile(response?.data?.beforeFile),
            setBeforeText(response?.data?.beforeText),
            setAfterFile(response?.data?.afterFile),
            setAfterText(response?.data?.afterText);
        });
    }
  }, []);

  const handleCloseBefore = () => {
    setAnchorElBefore(null);
  };
  const handleCloseAfter = () => {
    setAnchorElAfter(null);
  };
  const handleDeleteBefore = (x) => {
    console.log("beforeFile", x);
    supabase.storage.from("media").remove(x);
    const newitems = beforeFile.filter((item) => x !== item);
    console.log("newitems", newitems);
    setBeforeFile(newitems);
  };
  const handleDeleteAfter = (x) => {
    supabase.storage.from("media").remove(x);
    const newitems = afterFile.filter((item) => x !== item);
    console.log("newitems", newitems);
    setAfterFile(newitems);
  };
  const handleSubmit = () => {
    supabase
      .from("transformation")
      .insert({
        beforeFile: beforeFile,
        beforeText: beforeText,
        title: title,
        afterFile: afterFile,
        afterText: afterText,
      })
      .then((response) => {
        console.log({ response });
        setBeforeFile([]),
          setBeforeText(""),
          setTitle(""),
          setAfterFile([]),
          setAfterText("");
        router.back();
      });
  };
  const handleUpdate = () => {
    supabase
      .from("transformation")
      .update({
        beforeFile: beforeFile,
        beforeText: beforeText,
        title: title,
        afterFile: afterFile,
        afterText: afterText,
      })
      .eq("id", id)
      .then((response) => {
        console.log("response", response);
        setBeforeFile([]),
          setBeforeText(""),
          setTitle(""),
          setAfterFile([]),
          setAfterText("");
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
    setAfterFile(files);
  };

  const handleBeforeFile = async (e) => {
    // console.log("e", e?.target?.files[0]);
    const filedata = e?.target?.files;

    console.log("filedata", filedata);

    const files = [];
    for (const file of filedata) {
      const metadata = await supabase.storage
        .from("media")
        .upload(file?.name + Date.now(), file, {
          cacheControl: "3600",
          upsert: false,
        });

      console.log("metadata", metadata);
      files.push(metadata.data.path);
    }
    console.log({ files });
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

                <TextField
                  sx={{ width: "100%", mt: 2 }}
                  id="outlined-basic"
                  label="Text"
                  variant="outlined"
                  type={"text"}
                  onChange={(e) => setBeforeText(e.currentTarget.value)}
                  value={beforeText}
                />
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

                <TextField
                  sx={{ width: "100%", mt: 2 }}
                  id="outlined-basic"
                  label="Text"
                  variant="outlined"
                  type={"text"}
                  onChange={(e) => setAfterText(e.currentTarget.value)}
                  value={afterText}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
