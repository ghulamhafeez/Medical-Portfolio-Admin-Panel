import React from "react";
import styles from "../styles/Home.module.css";
import { Grid } from "@mui/material";
import Link from "next/link";
import { TabsData } from "../constants/Constant";
import Typography from "@mui/material/Typography";

export default function About() {
  return (
    <Grid
      pt={4}
      mb={2}
      boxShadow={5}
      //   sx={{ display: { sm: "none", xs: "none", md: "block", lg: "block" } }}
      //   px={{ sm: 2, md: 5, lg: 22, xl: 26 }}
      //   className={styles.tabs}
      bgcolor={"white"}
      width={260}
      height={"100vh"}
    >
      {TabsData?.map((x) => {
        return (
          <Link href={x.path} key={x}>
            <Typography
              variant="h6"
              gutterBottom
              ml={3}
              //   fontSize={{ sm: "15px", md: "17px", lg: "20px" }}
            >
              {x.name}
            </Typography>{" "}
            {/* <br></br> */}
          </Link>
        );
      })}
    </Grid>
  );
}
