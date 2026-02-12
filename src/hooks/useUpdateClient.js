import React, { useState } from "react";
import { Clients } from "../Api/Api";
import { Axios } from "../Api/Axios";

function useUpdateClient({ setShowModal }) {
  const [load, setload] = useState(false);

  function handleUpdateClient(id, formValues) {
    setload(true);
    Axios.put(`${Clients}/${id}`, formValues)

      .then((res) => {
        console.log(res);
        setShowModal(false);
        setload(false);
      })
      .catch((err) => {
        console.log(err);
        setload(false);
      });
  }

  return { load, handleUpdateClient };
}

export default useUpdateClient;
