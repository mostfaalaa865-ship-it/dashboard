import React, { useContext, useState } from "react";
import { Clients } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { ReRender } from "../../context/ReRender";

function useCerateClient({ setShowModal }) {
  const time = "a" + Date.now();

  const [load, setload] = useState(false);
  const { setisRender } = useContext(ReRender);

  function handleCreateClient(formValues) {
    setload(true);
    Axios.post(`${Clients}`, formValues)

      .then((res) => {
        setShowModal(false);
        setload(false);
        setisRender(time);
      })
      .catch(() => {
        setload(false);
      });
  }

  return { load, handleCreateClient };
}

export default useCerateClient;
