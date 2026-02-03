import React, { useState } from "react";
import VectorIcon from "./Vector.svg";
import VectorIcon2 from "./Vector2.svg";
import Logout from "../../Auth/Logout";
import Cookies from "universal-cookie";

import { useEffect } from "react";
import { Axios } from "../../Api/Axios";
import { USER, baseURL } from "../../Api/Api";

function TopBar() {
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

  return (
    <div
      className="
        fixed top-0 right-0
        h-14
        bg-white
        flex items-center justify-between
        px-4
        z-40

        w-full
        lg:left-[210px]
        lg:w-[calc(100%-210px)]
      "
    >
      <div className="flex items-center gap-3">
        <h1 className="text-[16px] font-medium">Clients</h1>
        <img className="w-[13px] h-[6px]" src={VectorIcon} alt="" />
      </div>

      <div className="flex gap-3 text-[13px]">
        <button
          className="h-7 px-3 rounded-sm border border-[#E2E4E9]
          cursor-pointer transition hover:bg-[#F3F4F6]
          flex items-center gap-2
        "
        >
          Import / Export
          <img src={VectorIcon2} alt="" className="w-[9px] h-[6px]" />
        </button>

        <button
          className="
            h-7
            px-4
            cursor-pointer
            text-white
            rounded-sm
            bg-[#6696F5]
            hover:bg-[#6287E6]
            transition
            whitespace-nowrap
          "
        >
          Create Client
        </button>
      </div>
      <div className="flex gap-4 ">
        <Logout />

        <div className=" border-3 border-amber-300 px-2 py-1 font-semibold rounded-3xl text-white bg-black/80">
          {user}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
