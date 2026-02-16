import React, { useContext, useState } from "react";
import { Companies } from "../Api/Api";
import { Axios } from "../Api/Axios";
import { ReRender } from "../context/ReRender";

function useCreateCompany({ setShowModal }) {
  const time = "b" + Date.now();

  const [load, setload] = useState(false);
  const { setisRender } = useContext(ReRender);

  function handleCreatecompany(formValues) {
    setload(true);
    Axios.post(`${Companies}`, formValues)

      .then((res) => {
        console.log(res);
        setShowModal(false);
        setload(false);
        setisRender(time);
      })
      .catch((err) => {
        console.log(err);
        setload(false);
      });
  }

  return { load, handleCreatecompany };
}

export default useCreateCompany;
