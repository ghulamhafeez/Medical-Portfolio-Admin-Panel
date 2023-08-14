import React from "react";
import { useEffect } from "react";
import { Grid } from "@mui/material";
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
import { Field } from "../../component/Field";
import { TransfoemationCardData } from "../../constants/Constant";
import { supabase } from "../api/supabase";
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

    supabase.from("blog").delete().eq("id", id);
  };

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
            <Button variant="contained" color="primary">
              + Add Transformation
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
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Grid
        display={"flex"}
        px={{ xl: 30, lg: 20, md: 15, sm: 6 }}
        direction={"column"}
        alignItems={"center"}
        gap={4}
      >
        {transformation?.map((x) => {
          return (
            <Grid key={x} display={"flex"} direction={"column"}>
              <Typography variant="h6">{x.title}</Typography>
              <Grid key={x} display={"flex"} direction={"row"} gap={8}>
                <Grid key={x} display={"flex"} direction={"row"}>
                  <Card key={x} sx={{ width: "100%", boxShadow: 4 }}>
                    <CardHeader
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon
                            onClick={(event) => handleClick(event, x)}
                          />
                        </IconButton>
                      }
                      sx={{ color: "#666666" }}
                    />
                    {x.before_items.map((x) => {
                      return (
                        <Grid key={x}>
                          {" "}
                          {/* <Typography variant="body1" color="#666666">
                            {x.value}
                          </Typography> */}
                          <Field type={x?.type} value={x?.value} />
                        </Grid>
                      );
                    })}
                  </Card>
                </Grid>
                <Grid key={x} display={"flex"} direction={"row"}>
                  <Card key={x} sx={{ width: "100%", boxShadow: 4 }}>
                    <CardHeader
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon onClick={handleClick} />
                        </IconButton>
                      }
                      sx={{ color: "#666666" }}
                    />
                    {x.after_items.map((x) => {
                      return (
                        <Grid key={x}>
                          {" "}
                          {/* <Typography variant="body1" color="#666666">
                            {x.value}
                          </Typography> */}
                          <Field type={x?.type} value={x?.value} />
                        </Grid>
                      );
                    })}
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
