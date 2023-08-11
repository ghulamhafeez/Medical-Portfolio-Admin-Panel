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
      boxShadow={5}
      //   sx={{ display: { sm: "none", xs: "none", md: "block", lg: "block" } }}
      //   px={{ sm: 2, md: 5, lg: 22, xl: 26 }}
      //   className={styles.tabs}
      bgcolor={"white"}
      width={260}
      height={"100vh"}
      position={"sticky"}
      top={0}
    >
      {TabsData?.map((x) => {
        return (
          <Link href={x.path} key={x}>
            <Typography
              gutterBottom
              ml={3}
              color={"#666666"}
              fontSize={"15px"}
              mb={3}
            >
              <b>{x.name}</b>
            </Typography>
          </Link>
        );
      })}
    </Grid>
  );
}
