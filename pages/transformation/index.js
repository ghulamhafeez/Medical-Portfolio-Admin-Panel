import React from "react";
import { useEffect } from "react";
import { Divider, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { FIRST_PATH } from "../../constants/Constant";
import { TransfoemationCardData } from "../../constants/Constant";
import { supabase } from "../api/supabase";
import { Add } from "@mui/icons-material";
export default function Transformation() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [transformation, setTransformation] = React.useState();
  const [id, setId] = React.useState();
  const open = Boolean(anchorEl);

  useEffect(() => {
    getTransformation();
  }, []);

  const getTransformation = () => {
    supabase
      .from("transformation")
      .select()
      .then((response) => {
        setTransformation(response?.data);
      });
  };

  const handleClick = (event, x) => {
    setId(x?.id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    console.log("idd", id);
    setAnchorEl(null);

    supabase
      .from("transformation")
      .delete()
      .eq("id", id)
      .then(() => getTransformation());
  };
  // const handleDeleteBefore = ({ id }) => {
  //   const newitems = itemsBefore.filter((item) => id !== item.id);

  //   console.log("newsetitems", newitems);
  //   setItemsBefore(newitems);
  // };
  // const handleDeleteAfter = ({ id }) => {
  //   console.log("id", id);
  //   const newitems = itemsAfter.filter((item) => id !== item.id);

  //   console.log("newsetitems", newitems);
  //   setItemsAfter(newitems);
  // };
  console.log("TransfoemationCardData", TransfoemationCardData);
  return (
    <Grid display={"flex"} direction={"column"} gap={2} mb={2}>
      <Grid display={"flex"} direction={"column"} gap={1}>
        <Grid
          paddingTop={1}
          paddingRight={3}
          display={"flex"}
          justifyContent={"end"}
        >
          <Link href={"/transformation/add-transformation"}>
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
              startIcon={<Add />}
            >
              Add Transformation
            </Button>
          </Link>
        </Grid>
        <Grid>
          <Divider />
        </Grid>
      </Grid>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Grid
        display={"flex"}
        px={{ xl: 30, lg: 20, md: 15, sm: 6 }}
        direction={"column"}
        alignItems={"center"}
        gap={4}
        mb={4}
      >
        {transformation?.map((x) => {
          console.log("x", x);
          return (
            <Grid key={x} display={"flex"} direction={"column"}>
              <Card sx={{ bgcolor: "#f8f9fb" }}>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon
                        onClick={(event) => handleClick(event, x)}
                      />
                    </IconButton>
                  }
                  sx={{ color: "#666666" }}
                  title={x.beforeTitle}
                  // <Typography variant="h6">{x.title}</Typography>
                />
                <Grid container spacing={4} padding={2}>
                  <Grid item xs={6} display={"flex"} direction={"column"}>
                    <Typography variant="body1" ml={2}>
                      Before
                    </Typography>
                    <Card
                      key={x}
                      sx={{
                        width: "100%",
                        boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.7",
                      }}
                    >
                      <Grid p={2}>
                        {x.beforeFile.map((x) => {
                          return (
                            <Grid key={x}>
                              {/* <Field type={x?.type} value={x?.value} /> */}
                              <img
                                width={"100%"}
                                height={200}
                                object-fit="cover"
                                src={`${FIRST_PATH}${x}`}
                                multiple
                              ></img>
                            </Grid>
                          );
                        })}
                      </Grid>
                      <Grid ml={2}>
                        <Typography variant="body1">{x.beforeText}</Typography>
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid item xs={6} display={"flex"} direction={"column"}>
                    <Typography variant="body1" ml={2}>
                      After
                    </Typography>
                    <Card
                      key={x}
                      sx={{
                        width: "100%",
                        boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.7",
                      }}
                    >
                      <Grid p={2}>
                        {x.afterFile.map((x) => {
                          return (
                            <Grid key={x}>
                              {/* <Field type={x?.type} value={x?.value} /> */}
                              <img
                                width={"100%"}
                                height={200}
                                object-fit="cover"
                                src={`${FIRST_PATH}${x}`}
                                multiple
                              ></img>
                            </Grid>
                          );
                        })}
                      </Grid>
                      <Grid>
                        <Typography ml={2} variant="body1">
                          {x.afterText}
                        </Typography>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
