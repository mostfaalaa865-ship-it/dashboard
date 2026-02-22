import React, { useContext, useState } from "react";
import { products } from "../Api/Api";
import { Axios } from "../Api/Axios";
import { ReRender } from "../context/ReRender";

function useUpdateProduct({ setShowModal }) {
  const time = "c" + Date.now();
  const { setisRender } = useContext(ReRender);

  const [load, setload] = useState(false);

  function handleUpdateproducts(id, formValues) {
    setload(true);
    Axios.put(`${products}/${id}`, formValues)

      .then((res) => {
        console.log(res);
        setisRender(time);

        setShowModal(false);
        setload(false);
      })
      .catch((err) => {
        console.log(err);
        setload(false);
      });
  }

  return { load, handleUpdateproducts };
}

export default useUpdateProduct;
