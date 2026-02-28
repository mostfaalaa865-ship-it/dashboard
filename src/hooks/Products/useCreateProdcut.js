import React, { useContext, useState } from "react";
import { products } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { ReRender } from "../../context/ReRender";

function useCreateProdcut({ setShowModal }) {
  const time = "c" + Date.now();

  const [load, setload] = useState(false);
  const { setisRender } = useContext(ReRender);

  function handleCreateClient(formValues) {
    setload(true);
    Axios.post(`${products}`, formValues)

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

  return { load, handleCreateClient };
}

export default useCreateProdcut;
