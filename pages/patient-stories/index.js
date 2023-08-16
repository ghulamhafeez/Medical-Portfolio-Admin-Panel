import React from "react";
import { useEffect } from "react";
import { Button, Divider, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import { Field } from "../../component/Field";
import Link from "next/link";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardData } from "../../constants/Constant";
import { supabase } from "../api/supabase";
import { Add } from "@mui/icons-material";

export default function PatientStories() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [patientStories, setPatientStories] = React.useState([]);
  const [id, setId] = React.useState();

  useEffect(() => {
    getPatientStories();
    // console.log("CardData", data);
  }, []);

  const getPatientStories = () => {
    supabase
      .from("patient_stories")
      .select()
      .then((response) => {
        setPatientStories(response?.data);
        console.log({ response });
      });
  };

  console.log("CardData", CardData);
  const open = Boolean(anchorEl);
  const handleClick = (event, x) => {
    setId(x?.id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log("idd", id);

    supabase
      .from("patient_stories")
      .delete()
      .eq("id", id)
      .then(() => getPatientStories());
    setAnchorEl(null);
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
          <Link href={"/patient-stories/add-patient-stories"}>
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
              Add Patient Story
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
        px={{ xl: 30, lg: 20, md: 16, sm: 10 }}
        direction={"column"}
        alignItems={"center"}
        gap={4}
      >
        {patientStories?.map((x) => {
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
                sx={{ color: "#666666" }}
                title={x.title}
              />

              {x.items.map((x) => {
                return (
                  <CardContent key={x}>
                    <Field type={x?.type} value={x?.value} />
                  </CardContent>
                );
              })}
            </Card>
          );
        })}
      </Grid>
    </Grid>
  );
}
