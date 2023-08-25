import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

import { useRouter } from "next/router";

import Typography from "@mui/material/Typography";

export default function LogoutModal({ open, handleClose }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.setItem("login", false);
    const event = new Event("userLoggedIn");
    window.dispatchEvent(event);
    router.push("/login");
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle> Are you sure you want to Logout? </DialogTitle>
      <Grid display={"flex"} justifyContent={"space-between"} mt={3} mb={3}>
        <Grid>
          <Button
            sx={{
              width: 100,
              ml: 3,
              color: "#fff",
              background: "#212b36",
              textTransform: "capitalize",
              "&:hover": {
                background: "#212b36",
              },
            }}
            onClick={handleClose}
          >
            No
          </Button>
        </Grid>

        <Grid>
          <Button
            sx={{
              width: 100,
              mr: 3,
              color: "#fff",
              background: "#212b36",
              textTransform: "capitalize",
              "&:hover": {
                background: "#212b36",
              },
            }}
            onClick={handleLogout}
          >
            Yes
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
