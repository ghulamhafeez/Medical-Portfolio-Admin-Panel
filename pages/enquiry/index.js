import { Grid, Button, Divider } from "@mui/material";

import { supabase } from "../api/supabase";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

export default function Enquiry() {
  const [enquiry, setEnquiry] = useState();

  useEffect(() => {
    getEnquiry();
  }, []);

  const getEnquiry = () => {
    supabase
      .from("contact")
      .select()
      .then((response) => {
        console.log("response123", response.data);
        setEnquiry(response?.data);
      });
  };

  return (
    <Grid px={{ xl: 30, lg: 20, md: 12, sm: 10 }}>
      {enquiry?.map((x) => {
        return (
          <Card
            key={x}
            sx={{
              mt: 5,
              width: "100%",
              boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.7",
              padding: 2,
            }}
          >
            <Grid m={2}>
              <Typography variant="body1" color={"#333333"}>
                {`Name: ${x.name}`}
              </Typography>
              <Typography variant="body1" color={"#333333"}>
                {`Email: ${x.email}`}
              </Typography>
              <Typography variant="body1" color={"#333333"}>
                {`Phone: ${x.phone}`}
              </Typography>
              <Typography variant="body1" color={"#333333"}>
                {`Enquiry: ${x.enquiry}`}
              </Typography>
            </Grid>
          </Card>
        );
      })}
    </Grid>
  );
}
