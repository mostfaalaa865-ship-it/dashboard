import React, { useContext } from "react";
import { Axios } from "../../Api/Axios";
import { products } from "../../Api/Api";
import { ReRender } from "../../context/ReRender";

function useDeleteProduct() {
  const time = "c" + Date.now();

  const { setisRender } = useContext(ReRender);
  function handleDelete(id) {
    Axios.delete(`${products}/${id}`)
      .then((res) => {
        console.log(res);
        setisRender(time);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  return { handleDelete };
}

export default useDeleteProduct;
