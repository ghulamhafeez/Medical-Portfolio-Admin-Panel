import { Grid } from "@mui/material";
import React from "react";

export const Youtube = ({ data }) => {
  console.log("datarr", data);

  let Id = data?.split("watch");
  console.log("id", Id[1]);

  return (
    <Grid>
      <iframe
        width="560"
        height="315"
        src={data}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </Grid>
  );
};
