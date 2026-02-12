import Cookies from "universal-cookie";
import React, { useState } from "react";
import { RegisterURL } from "../Api/Api";

import { Axios } from "../Api/Axios";
function useRegister() {
  const [error, seterror] = useState("");
  const [load, setload] = useState(false);
  const cookies = new Cookies();

  function handleRegister(data) {
    setload(true);

    Axios.post(`${RegisterURL}`, data)
      .then((res) => {
        console.log(res);
        cookies.set("token", res.data.token);

        setload(false);

        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.log(err);
        seterror(err.response.data.message);
        setload(false);

        setTimeout(() => {
          seterror("");
        }, 5000);
      });
  }

  return { handleRegister, load, error };
}

export default useRegister;
