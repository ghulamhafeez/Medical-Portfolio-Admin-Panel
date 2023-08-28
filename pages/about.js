import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { FIRST_PATH } from "../constants/Constant";
import Textarea from "@mui/joy/Textarea";
import { supabase } from "../pages/api/supabase";
import Button from "@mui/material/Button";

export default function About() {
  const [email] = useState(localStorage.getItem("login") || "");
  const [bio, setBio] = useState("");
  const [avatarImg, setAvatarImg] = useState("");

  useEffect(() => {
    getAboutData();
  }, []);
  const handleFile = (e) => {
    const filedata = e?.target?.files[0];
    supabase.storage
      .from("media")
      .upload("bio/" + filedata?.name + Date.now(), filedata, {
        cacheControl: "3600",
        upsert: false,
      })
      .then((res) => {
        setAvatarImg(res?.data?.path);
      })
      .catch((err) => console.log(err));
  };
  const getAboutData = () => {
    supabase
      .from("authentication")
      .select()
      .eq("email", "drharis@test.com")
      .single()
      .then((response) => {
        console.log("response", response?.data);
        setBio(response?.data?.bio);
        setAvatarImg(response?.data?.avatarImg);
      });
  };

  const handleSubmit = () => {
    supabase
      .from("authentication")
      .update({ bio: bio, avatarImg: avatarImg })
      .eq("email", "drharis@test.com")
      .then((res) => console.log("res", res));
  };

  return (
    <Grid
      display={"flex"}
      direction={"column"}
      justifyContent={"center"}
      // alignItems={"center"}
      // ml={20}
      mt={10}
      // textAlign={"center"}
      px={{ xl: 45, lg: 40, md: 20, sm: 10, xs: 2 }}
      gap={3}
    >
      <Grid>
        <label for="file">
          <Avatar
            alt="Travis Howard"
            src={`${FIRST_PATH}${avatarImg}`}
            sx={{ width: 140, height: 140 }}
            value={avatarImg}
          />
        </label>
        <input id="file" type="file" onChange={(e) => handleFile(e)} hidden />
      </Grid>

      <Grid display={"flex"} direction={"column"} gap={2}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          sx={{ width: "100%" }}
          disabled
        />
        {/* <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          sx={{ width: "100%" }}
          value={password}
          type="password"
        /> */}

        <Textarea
          placeholder="Type in here…"
          required
          minRows={10}
          value={bio}
          sx={{ mb: 1, width: "100%" }}
          onChange={(e) => setBio(e.target.value)}
        />
        <Button
          sx={{
            color: "#fff",
            background: "#212b36",
            textTransform: "capitalize",
            "&:hover": {
              background: "#212b36",
            },
          }}
          onClickCapture={() => handleSubmit()}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
