import "../styles/Home.module.css";
import { Grid } from "@mui/material";
import SideBar from "./SideBar";

export default function MainLayout({ children }) {
  return (
    <Grid display={"flex"} direction={"row"}>
      <SideBar />

      {children}
    </Grid>
  );
}
