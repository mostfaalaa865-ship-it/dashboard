import React, { useContext, useState } from "react";
import { Companies } from "../../Api/Api";
import { ReRender } from "../../context/ReRender";
import { Axios } from "../../Api/Axios";

function useCreateCompany({ setShowModal }) {
  // const time = "b" + Date.now();

  const [load, setload] = useState(false);
  const { setRefresh } = useContext(ReRender);

  function handleCreatecompany(formValues) {
    setload(true);
    Axios.post(`${Companies}`, formValues)
      .then((res) => {
        setShowModal(false);
        setload(false);
        setRefresh((prev) => ({
          ...prev,
          company: prev.company + 1,
        }));
      })
      .catch(() => {
        setload(false);
      });
  }

  return { load, handleCreatecompany };
}

export default useCreateCompany;
