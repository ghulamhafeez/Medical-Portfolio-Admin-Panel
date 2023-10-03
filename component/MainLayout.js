import "../styles/Home.module.css";
import { Grid } from "@mui/material";
import SideBar from "./SideBar";
import { useRouter } from "next/router";

export default function MainLayout({ children }) {
  const router = useRouter();

  return (
    <Grid container display={"flex"} direction={"row"}>
      {router.pathname !== "/login" && (
        <Grid item sm={4} md={3} lg={2}>
          <SideBar />
        </Grid>
      )}
      <Grid item sm={8} md={9} lg={router.pathname === "/login" ? 12 : 10}>
        {" "}
        {children}
      </Grid>
    </Grid>
  );
}
