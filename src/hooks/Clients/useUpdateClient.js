import React, { useContext, useState } from "react";
import { Clients } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { ReRender } from "../../context/ReRender";

function useUpdateClient({ setShowModal }) {
  const time = "a" + Date.now();

  const { setisRender } = useContext(ReRender);

  const [load, setload] = useState(false);

  function handleUpdateClient(id, formValues) {
    setload(true);
    Axios.put(`${Clients}/${id}`, formValues)

      .then((res) => {
        setShowModal(false);
        setload(false);
        setisRender(time);
      })
      .catch(() => {
        // log
        setload(false);
      });
  }

  return { load, handleUpdateClient };
}

export default useUpdateClient;
