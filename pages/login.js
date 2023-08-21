import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { supabase } from "./api/supabase";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = () => {
    supabase
      .from("authentication")
      .insert({ email: email, password: password })
      .then((res) => {
        console.log("res", res);

        localStorage.setItem("login", true);

        router.push(`/about`);
      });
  };

  return (
    <Grid mt={30} mb={2} display={"flex"} justifyContent={"center"}>
      <Card sx={{ width: 350, height: 250, boxShadow: 4 }}>
        <CardContent>
          <Grid display={"flex"} direction={"column"} gap={3} mt={2}>
            <TextField
              id="outlined-basic"
              label="Email"
              value={email}
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Passwod"
              value={password}
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            sx={{
              width: 100,
              ml: 1,
              color: "#fff",
              background: "#212b36",
              textTransform: "capitalize",
              "&:hover": {
                background: "#212b36",
              },
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
