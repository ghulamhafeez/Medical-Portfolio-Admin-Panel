import React from "react";

export const Field = (props) => {
  switch (props?.type) {
    case "text":
      return <p>{props?.value}</p>;

    case "file":
      return <img src={props?.value}></img>;

    case "youtube":
      return (
        <iframe
          width="560"
          height="315"
          src={props?.value}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      );
    default:
      <p></p>;
  }
};
