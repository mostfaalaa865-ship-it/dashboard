import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { Axios } from "./Api/Axios";
import { USER, baseURL } from "./Api/Api";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Loading/Loading";

function RequireAuth() {
  const [user, setuser] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    Axios.get(`${baseURL}${USER}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setuser(res.data.user.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return token ? (
    user === "" ? (
      <Loading />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" replace />
  );
}

export default RequireAuth;
