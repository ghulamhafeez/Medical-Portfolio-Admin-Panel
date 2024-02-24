import React, { useEffect, useState } from "react";
import { Divider, Grid } from "@mui/material";
import Link from "next/link";
import { TabsData } from "../constants/Constant";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/joy";
import LogoutModal from "../component/LogoutModal";

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      pt={2}
      bgcolor={"#f8f9fb"}
      width={260}
      height={"100vh"}
      position={"sticky"}
      top={0}
    >
      {TabsData?.map((x) => {
        return (
          <>
            <Link href={x.path} key={x}>
              <Grid display={"flex"}>
                <Grid ml={2} mt={1}>
                  <img
                    width={22}
                    height={22}
                    alt={"Image"}
                    object-fit="cover"
                    src={x.src}
                  ></img>
                </Grid>
                <Typography
                  gutterBottom
                  ml={2}
                  color={"#666666"}
                  fontSize={"15px"}
                  py={1}
                >
                  <b>{x.name}</b>
                </Typography>
              </Grid>
            </Link>
            <Divider />
          </>
        );
      })}

      <LogoutModal open={open} handleClose={() => handleClose()} />
      <Grid display={"flex"}>
        <Grid ml={2} mt={1}>
          <img
            width={22}
            height={22}
            alt={"Image"}
            object-fit="cover"
            src={"/assets/icons/logout.svg"}
          ></img>
        </Grid>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            color: "#666666",
            background: "none",
            "&:hover": {
              background: "none",
            },
            fontSize: "15px",
          }}
        >
          <b>Log Out</b>
        </Button>
      </Grid>
    </Grid>
  );
}
