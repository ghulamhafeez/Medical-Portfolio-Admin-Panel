import React from "react";
import { Button, Divider, Grid } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Link from "next/link";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { supabase } from "../api/supabase";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardData } from "../../constants/Constant";
import { Field } from "../../component/Field";
import { useEffect } from "react";
export default function Blog() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [bolgs, setBlogs] = React.useState();
  const [id, setId] = React.useState();
  const [editValue, setEditValue] = React.useState();
  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = () => {
    supabase
      .from("blog")
      .select()
      .then((response) => {
        setBlogs(response?.data);
      });
  };

  const open = Boolean(anchorEl);
  const handleClick = (event, x) => {
    setEditValue(x);
    setId(x?.id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    console.log("idd", id);

    supabase
      .from("blog")
      .delete()
      .eq("id", id)
      .then(() => getBlog());
    setAnchorEl(null);
  };
  const handleEdit = () => {
    console.log("idd", id);
  };
  return (
    <Grid display={"flex"} container direction={"column"} gap={2} mb={2}>
      <Grid display={"flex"} direction={"column"} gap={1}>
        <Grid
          paddingTop={1}
          paddingRight={3}
          display={"flex"}
          justifyContent={"end"}
        >
          <Link href={"/blog/add-blog"}>
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
              Add Blog
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
        px={{ xl: 30, lg: 20, md: 12, sm: 10 }}
        direction={"column"}
        alignItems={"center"}
        gap={4}
      >
        {bolgs?.map((x) => {
          return (
            <Card
              key={x}
              sx={{
                width: "100%",
                boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.7",
              }}
            >
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon onClick={(event) => handleClick(event, x)} />
                  </IconButton>
                }
                sx={{
                  color: "#666666",
                  "& .MuiTypography-root": {
                    fontWeight: 600,
                  },
                }}
                title={x?.title}
              />

              {/* <CardMedia
                component="img"
                width={"100%"}
                height={"100%"}
                image={x.file}
                alt="Paella dish"
              /> */}
              <Grid sx={{ padding: "0 16px 16px" }}>
                {x.items.map((x) => {
                  return <Field key={x} type={x?.type} value={x?.value} />;
                })}
              </Grid>
            </Card>
          );
        })}
      </Grid>
    </Grid>
  );
}
