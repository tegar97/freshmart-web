import { useContext, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { userContext } from "@/context/UserContext";

function Dashboard() {
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
      Router.push("/login");
    }
    fetchData();
  }, []);

  const LogoutHandler = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_BACKEND}/logout`)
      .then(() => {
        Cookies.remove("token");
        Router.push("/login");
      });
  };

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              {user ? ( // menggunakan ternary operator untuk mengecek apakah user sudah ada atau belum
                <>
                  SELAMAT DATANG{" "}
                  <strong className="text-uppercase">{user.name}</strong>
                  <hr />
                  <button
                    onClick={LogoutHandler}
                    className="btn btn-md btn-danger"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <p>Loading...</p> // menampilkan pesan "Loading..." jika userContext masih kosong
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
