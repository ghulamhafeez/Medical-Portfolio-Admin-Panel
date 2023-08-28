import "../styles/globals.css";
import MainLayout from "../component/MainLayout";
import Login from "./login";
import { useEffect, useState } from "react";
import { supabase } from "./api/supabase";

function MyApp({ Component, pageProps }) {
  const [checkLogin, setCheckLogin] = useState();
  // localStorage.getItem("login");
  useEffect(() => {
    supabase
      .from("authentication")
      .select("email")
      .eq("email", "ghulam222@gmail.com")
      .then((res) => {
        console.log("res", res);

        setCheckLogin(localStorage.getItem("login"));
      });

    // console.log(asd, "asd");
  });

  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
