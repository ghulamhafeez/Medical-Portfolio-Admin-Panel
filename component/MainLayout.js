import "../styles/Home.module.css";
import { Grid } from "@mui/material";
import SideBar from "./SideBar";

export default function MainLayout({ children }) {
  return (
    <Grid container display={"flex"} direction={"row"}>
      <Grid item sm={4} md={3} lg={2}>
        <SideBar />
      </Grid>
      <Grid item sm={8} md={9} lg={10}>
        {" "}
        {children}
      </Grid>
    </Grid>
  );
}
