import React from "react";
import { Youtube } from "../component/Youtube";
export const Field = (props) => {
  switch (props?.type) {
    case "text":
      return <p>{props?.value}</p>;

    case "file":
      return <img src={props?.value}></img>;

    case "youtube":
      return <Youtube data={props?.value} />;
    default:
      <p></p>;
  }
};
