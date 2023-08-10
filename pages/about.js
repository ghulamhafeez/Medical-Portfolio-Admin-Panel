import React, { useState } from "react";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Textarea from "@mui/joy/Textarea";
export default function About() {
  const [email] = useState("drharis22@gmail.com");
  const [password] = useState("haris123@gmail.com");
  const [mySefl] = useState(
    "Dr Grammatopoulos attended secondary school in Athens and completed his ultimate two years at Dulwich College under the Ishigaki Scholarship. He gained his Dental Degree from the University of Newcastle in 2004. Following further training in Restorative Dentistry, Paediatric Dentistry and Oral and Maxillofacial Surgery, he qualified as a Specialist Orthodontist in 2010 and Consultant Orthodontist in 2012. He was appointed Consultant in Orthodontics at Guy’s and St Thomas’ Hospitals and Honorary Senior Specialist Clinical Teacher at King’s College London in 2012, remaining in the post until 2020. For over a decade he has trained Dentists, Specialists in Orthodontics and Consultants in Orthodontics."
  );
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
        {" "}
        <Avatar
          alt="Travis Howard"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 140, height: 140 }}
        />
      </Grid>

      <Grid display={"flex"} direction={"column"} gap={2}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          sx={{ width: "100%" }}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          sx={{ width: "100%" }}
          value={password}
          type="password"
        />
        {/* <TextareaAutosize ></TextareaAutosize> */}
        <Textarea
          placeholder="Type in here…"
          required
          minRows={10}
          value={mySefl}
          sx={{ mb: 1, width: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
