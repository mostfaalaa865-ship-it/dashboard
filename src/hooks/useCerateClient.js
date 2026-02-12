import React, { useState } from "react";
import { Clients } from "../Api/Api";
import { Axios } from "../Api/Axios";

function useCerateClient({ setShowModal }) {
  const [load, setload] = useState(false);

  function handleCreateClient(formValues) {
    setload(true);
    Axios.post(`${Clients}`, formValues)

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

  return { load, handleCreateClient };
}

export default useCerateClient;
