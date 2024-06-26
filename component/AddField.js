import React from "react";
import TextField from "@mui/material/TextField";
import { FIRST_PATH } from "../constants/Constant";

export const AddField = ({ field, handleFile, handleValue }) => {
  switch (field?.type) {
    case "text":
      return (
        <TextField
          sx={{ width: "100%" }}
          id="outlined-basic"
          label="Text"
          variant="outlined"
          type={"text"}
          onChange={(e) => handleValue(e)}
          value={field.value}
        />
      );

    case "file":
      if (field.value) {
        return (
          <img
            width={"100%"}
            height={400}
            alt={"Image"}
            object-fit="cover"
            src={`${FIRST_PATH}${field?.value}`}
          ></img>
        );
      }
      return <input type="file" onChange={(e) => handleFile(e)}></input>;

    case "url":
      return (
        <TextField
          sx={{ width: "100%" }}
          id="outlined-basic"
          label="url"
          variant="outlined"
          type={"url"}
          onChange={(e) => handleValue(e)}
          value={field.value}
        />
      );

    default:
      return null;
  }
};
