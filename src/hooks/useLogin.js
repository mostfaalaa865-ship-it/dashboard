import Cookies from "universal-cookie";
import React, { useState } from "react";
import { LoginURL } from "../Api/Api";
import { Axios } from "../Api/Axios";

function useLogin(email, password) {
  const cookies = new Cookies();
  const [error, seterror] = useState("");
  const [load, setload] = useState(false);
  function handleLogin(e) {
    e.preventDefault();
    setload(true);

    Axios.post(`${LoginURL}`, {
      email,
      password,
    })
      .then((res) => {
        console.log(res.data.token);
        cookies.set("token", res.data.token);
        window.location.href = "/dashboard";
        setload(false);
      })
      .catch((err) => {
        console.log(err);
        setload(false);

        seterror(err.response.data.message);

        setTimeout(() => {
          seterror("");
        }, 5000);
      });
  }

  return { handleLogin, load, error };
}

export default useLogin;
