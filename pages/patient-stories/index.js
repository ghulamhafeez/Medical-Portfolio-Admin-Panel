import React from "react";
import { useEffect } from "react";
import { Button, Grid } from "@mui/material";
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
export default function PatientStories() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [patientStories, setPatientStories] = React.useState([]);

  useEffect(() => {
    supabase
      .from("patient_stories")
      .select()
      .then((response) => {
        setPatientStories(response?.data);
        console.log({ response });
      });
    // console.log("CardData", data);
  }, []);

  console.log("CardData", CardData);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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
            <Button variant="contained" color="primary">
              + Add Patient Story
            </Button>
          </Link>
        </Grid>
        <Grid>
          <hr color="gray"></hr>
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
        <MenuItem onClick={handleClose}>Delete</MenuItem>
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
            <Card key={x} sx={{ width: "100%", boxShadow: 4 }}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon onClick={handleClick} />
                  </IconButton>
                }
                sx={{ color: "#666666" }}
                title={x.title}
              />

              {x.items.map((x) => {
                return (
                  <CardContent key={x}>
                    <Typography variant="body2" color="#666666">
                      {x?.value}
                    </Typography>
                    {/* <img src={x?.value} alt="Img" /> */}
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
