import React, { useContext, useState } from "react";
import { Companies } from "../../Api/Api";
import { ReRender } from "../../context/ReRender";
import { Axios } from "../../Api/Axios";

function useCreateCompany({ setShowModal }) {
  const time = "b" + Date.now();

  const [load, setload] = useState(false);
  const { setisRender } = useContext(ReRender);

  function handleCreatecompany(formValues) {
    setload(true);
    Axios.post(`${Companies}`, formValues)
      .then((res) => {
        setShowModal(false);
        setload(false);
        setisRender(time);
      })
      .catch(() => {
        setload(false);
      });
  }

  return { load, handleCreatecompany };
}

export default useCreateCompany;
