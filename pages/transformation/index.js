import React from "react";
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
import { TransfoemationCardData } from "../../constants/Constant";
export default function Transformation() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>

      <Grid
        display={"flex"}
        px={{ xl: 30, lg: 20, md: 15, sm: 6 }}
        direction={"column"}
        alignItems={"center"}
        gap={4}
      >
        {TransfoemationCardData?.map((x) => {
          return (
            <Grid key={x} display={"flex"} direction={"column"}>
              <Typography variant="h6">{x.title}</Typography>
              <Grid key={x} display={"flex"} direction={"row"} gap={8}>
                <Grid key={x} display={"flex"} direction={"row"}>
                  {x.Before.map((x) => {
                    return (
                      <Card key={x} sx={{ Width: "100%", boxShadow: 4 }}>
                        <CardHeader
                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon onClick={handleClick} />
                            </IconButton>
                          }
                          sx={{ color: "#666666" }}
                          title={x.title}
                        />
                        <CardMedia
                          component="img"
                          width={"100%"}
                          image={x.fileBefore}
                          alt="Paella dish"
                        />
                        <CardContent>
                          <Typography variant="body1" color="#666666">
                            {x.textBefore}
                          </Typography>
                        </CardContent>
                      </Card>
                    );
                  })}
                </Grid>
                <Grid key={x} display={"flex"} direction={"row"}>
                  {x.After.map((x) => {
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
                        <CardMedia
                          component="img"
                          width={"100%"}
                          image={x.fileAfter}
                          alt="Paella dish"
                        />
                        <CardContent>
                          <Typography variant="body1" color="#666666">
                            {x.textAfter}
                          </Typography>
                        </CardContent>
                      </Card>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
