import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
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
      pt={4}
      // boxShadow="0px 0px 24px rgba(0, 0, 0, 0.7"
      //   sx={{ display: { sm: "none", xs: "none", md: "block", lg: "block" } }}
      //   px={{ sm: 2, md: 5, lg: 22, xl: 26 }}
      //   className={styles.tabs}
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
              <Typography
                gutterBottom
                ml={3}
                color={"#666666"}
                fontSize={"15px"}
                // mb={3}
                py={1}
              >
                <b>{x.name}</b>
              </Typography>
            </Link>
            <Divider />
          </>
        );
      })}
      <LogoutModal open={open} handleClose={() => handleClose()} />
      <Button
        onClick={() => setOpen(true)}
        sx={{
          ml: 1,
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
  );
}
