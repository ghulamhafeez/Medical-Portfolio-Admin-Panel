import "../styles/Home.module.css";
import { Grid } from "@mui/material";
import SideBar from "./SideBar";

export default function MainLayout({ children }) {
  return (
    <Grid container display={"flex"} direction={"row"}>
      <Grid lg={2}>
        <SideBar />
      </Grid>
      <Grid lg={10}> {children}</Grid>
    </Grid>
  );
}
