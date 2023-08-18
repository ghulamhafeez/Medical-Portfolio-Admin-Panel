import React from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { FIRST_PATH } from "../../constants/Constant";
import { AddField } from "../../component/AddField";

import AbcIcon from "@mui/icons-material/Abc";
import ImageIcon from "@mui/icons-material/Image";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { supabase } from "../api/supabase";
import CancelIcon from "@mui/icons-material/Cancel";

export default function TransformationFields() {
  const [anchorElBefore, setAnchorElBefore] = React.useState(null);
  const [anchorElAfter, setAnchorElAfter] = React.useState(null);
  const [itemsBefore, setItemsBefore] = React.useState([]);
  const [itemsAfter, setItemsAfter] = React.useState([]);

  const [beforeFile, setBeforeFile] = React.useState();
  const [beforeText, setBeforeText] = React.useState();
  const [beforeTitle, setBeforeTitle] = React.useState();

  const [afterFile, setAfterFile] = React.useState();
  const [afterText, setAfterText] = React.useState();
  const [afterTitle, setAfterTitle] = React.useState();

  const openBefore = Boolean(anchorElBefore);
  const openAfter = Boolean(anchorElAfter);
  const router = useRouter();

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

    setBeforeFile(newitems);
  };
  const handleDeleteAfter = (x) => {
    supabase.storage.from("media").remove(x);
    const newitems = afterFile.filter((item) => x !== item);

    setAfterFile(newitems);
  };
  const handleSubmit = () => {
    supabase
      .from("transformation")
      .insert({
        beforeFile: beforeFile,
        beforeText: beforeText,
        beforeTitle: beforeTitle,
        afterFile: afterFile,
        afterText: afterText,
        afterTitle: afterTitle,
      })
      .then((response) => {
        console.log({ response });
        setBeforeFile(""),
          setBeforeText(""),
          setBeforeTitle(""),
          setAfterFile(""),
          setAfterText(""),
          setAfterTitle("");
      });
  };

  const handleAddBefore = (data) => {
    console.log("data1", data);
    const type = {
      type: data,
      value: "",
      id: Math.random().toString(16).slice(-4),
    };
    setItemsBefore([...itemsBefore, type]);
    setAnchorElBefore(null);
  };
  const handleAddAfter = (data) => {
    const type = {
      type: data,
      value: "",
      id: Math.random().toString(16).slice(-4),
    };

    setItemsAfter([...itemsAfter, type]);
    setAnchorElAfter(null);
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
              submit
            </Button>
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
          anchorEl={anchorElBefore}
          open={openBefore}
          onClose={handleCloseBefore}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => handleAddBefore("text")}>
            <AbcIcon sx={{ mr: 1, fontSize: 30 }}></AbcIcon>
            Text
          </MenuItem>
          <MenuItem onClick={() => handleAddBefore("file")}>
            <ImageIcon sx={{ mr: 2 }}></ImageIcon>Image
          </MenuItem>
        </Menu>

        <Menu
          id="basic-menu"
          anchorEl={anchorElAfter}
          open={openAfter}
          onClose={handleCloseAfter}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => handleAddAfter("text")}>
            <AbcIcon sx={{ mr: 1, fontSize: 30 }}></AbcIcon>
            Text
          </MenuItem>
          <MenuItem onClick={() => handleAddAfter("file")}>
            <ImageIcon sx={{ mr: 2 }}></ImageIcon>Image
          </MenuItem>
        </Menu>

        <Grid container xs={12} spacing={2}>
          <Grid item xs={6} mb={2}>
            <Card sx={{ width: "100%", boxShadow: 4 }}>
              <CardHeader sx={{ color: "#666666" }} title={"Before"} />
              <CardContent>
                <TextField
                  sx={{ width: "100%", mb: 2 }}
                  id="outlined-basic"
                  label="Title"
                  value={beforeTitle}
                  variant="outlined"
                  onChange={(e) => setBeforeTitle(e.currentTarget.value)}
                />

                {beforeFile ? (
                  <Grid container>
                    {beforeFile.map((x) => {
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
                ) : (
                  <input
                    type="file"
                    onChange={(e) => handleBeforeFile(e)}
                    multiple
                  ></input>
                )}
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
                <TextField
                  sx={{ width: "100%", mb: 2 }}
                  id="outlined-basic"
                  label="Title"
                  value={afterTitle}
                  variant="outlined"
                  onChange={(e) => setAfterTitle(e.currentTarget.value)}
                />

                {afterFile ? (
                  <Grid container>
                    {afterFile.map((x) => {
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
                ) : (
                  <input
                    type="file"
                    onChange={(e) => handleAfterFile(e)}
                    multiple
                  ></input>
                )}

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
        {/* <Grid container spacing={2}>
          <Grid item xs={6} sx={{ width: "100%" }}>
            <Card>
              <Grid container direction={"column"} spacing={4}>
                <Grid item display={"flex"} direction={"column"} mt={2} ml={3}>
                  <Typography variant="h6">Before</Typography>
                </Grid>
                <Grid item>
                  {itemsBefore?.map((x) => {
                    return (
                      <Grid
                        key={x}
                        sx={{ px: 2 }}
                        display={"flex"}
                        direction={"row"}
                      >
                        <Card
                          key={x}
                          sx={{ width: "100%", boxShadow: 4, mb: 2 }}
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
                              onClick={() => handleDeleteBefore(x)}
                            />
                          </Grid>
                          <Grid sx={{ padding: "0 16px 16px" }}>
                            <AddField
                              key={x.id}
                              field={x}
                              handleFile={(e) => handleBeforeFile(e, x)}
                              handleValue={(e) => handleBeforeValue(e, x)}
                            />
                          </Grid>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid item container justifyContent={"center"}>
                  <Button
                    id="demo-customized-button"
                    aria-controls={
                      openBefore ? "demo-customized-menu" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={openBefore ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClickBefore}
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
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={6} sx={{ width: "100%" }}>
            <Card>
              <Grid container direction={"column"} spacing={4}>
                <Grid item display={"flex"} direction={"column"} mt={2} ml={3}>
                  <Typography variant="h6">After</Typography>
                </Grid>
                <Grid item>
                  {itemsAfter?.map((x) => {
                    return (
                      <Grid
                        key={x}
                        sx={{ px: 2 }}
                        display={"flex"}
                        direction={"row"}
                      >
                        <Card
                          key={x}
                          sx={{ width: "100%", boxShadow: 4, mb: 2 }}
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
                              onClick={() => handleDeleteAfter(x)}
                            />
                          </Grid>

                          <Grid sx={{ padding: "0 16px 16px" }}>
                            <AddField
                              key={x.id}
                              field={x}
                              handleFile={(e) => handleAfterFile(e, x)}
                              handleValue={(e) => handleAfterValue(e, x)}
                            />
                          </Grid>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid item container justifyContent={"center"}>
                  <Button
                    id="demo-customized-button"
                    aria-controls={
                      openAfter ? "demo-customized-menu" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={openAfter ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClickAfter}
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
              </Grid>
            </Card>
          </Grid>
        </Grid> */}
      </Grid>
    </Grid>
  );
}
