import React, { useEffect, useState } from "react";
import { Axios } from "../Api/Axios";
import { baseURL, USER } from "../Api/Api";
import Cookies from "universal-cookie";

function useUser() {
  const [user, setUser] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    async function user2() {
      const userresult = await Axios.get(`${baseURL}${USER}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(userresult.data.user);
    }
    user2();
  }, []);
  return { user };
}

export default useUser;
