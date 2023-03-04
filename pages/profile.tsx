import { useContext, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { userContext } from "@/context/UserContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Profile() {
  const { user, setUser } = useContext(userContext); // menggunakan userContext

  const token = Cookies.get("token");

  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_BACKEND}/getMe`)
      .then((response) => {
        setUser(response.data.data); // menyimpan data user ke dalam userContext
      });
  };

  useEffect(() => {
    if (!token) {
      Router.push("/auth");
    } else {
        fetchData();
        
    }
  }, []);
  return (
    <div>
      <Navbar type={"type1"} />
      <h1>hai profile</h1>
      <Footer />
    </div>
  );
}

export default Profile;
