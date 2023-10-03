import "../styles/globals.css";
import MainLayout from "../component/MainLayout";
import Login from "./login";
import { useEffect, useState } from "react";
import { supabase } from "./api/supabase";
import { RouteGuard } from "../component/RouterGuard";

function MyApp({ Component, pageProps }) {
  const [checkLogin, setCheckLogin] = useState();

  useEffect(() => {
    supabase
      .from("authentication")
      .select("email")
      .eq("email", "ghulam222@gmail.com")
      .then((res) => {
        console.log("res", res);

        setCheckLogin(localStorage.getItem("login"));
      });
  });

  return (
    <RouteGuard>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </RouteGuard>
  );
}

export default MyApp;
