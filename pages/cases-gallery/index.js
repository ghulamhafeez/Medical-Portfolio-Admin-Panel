import React, { useState, useEffect } from "react";
import { Grid, Button, Divider } from "@mui/material";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { supabase } from "../api/supabase";
import { FIRST_PATH } from "../../constants/Constant";

export default function CasesGallery() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [casesGallery, setCasesGallery] = useState();
  const [id, setId] = React.useState();
  const open = Boolean(anchorEl);
  const router = useRouter();
  useEffect(() => {
    getCasesGallery();
  }, []);

  const getCasesGallery = () => {
    supabase
      .from("cases_gallery")
      .select()
      .order("id", { ascending: false })
      .then((response) => {
        console.log("response123", response);
        setCasesGallery(response?.data);
      });
  };
  const handleClick = (event, x) => {
    setId(x?.id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    console.log("idd", id);
    router.push(`cases-gallery/edit-cases-gallery/${id}`);
  };
  const handleDelete = () => {
    console.log("idd", id);
    setAnchorEl(null);

    supabase
      .from("cases_gallery")
      .delete()
      .eq("id", id)
      .then(() => getCasesGallery());
  };

  return (
    <Grid>
      <Grid display={"flex"} direction={"column"} gap={1}>
        <Grid
          paddingTop={1}
          paddingRight={3}
          display={"flex"}
          justifyContent={"end"}
        >
          <Link href={"/cases-gallery/add-cases-gallery"}>
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
              startIcon={<AddIcon />}
            >
              Add Cases Gallery
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
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
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
        {casesGallery?.map((x) => {
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
                  title={x.title}
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
