import React, { useContext } from "react";
import { Axios } from "../../Api/Axios";
import { products } from "../../Api/Api";
import { ReRender } from "../../context/ReRender";

function useDeleteProduct() {
  // const time = "c" + Date.now();

  const { setRefresh } = useContext(ReRender);
  function handleDelete(id) {
    Axios.delete(`${products}/${id}`)
      .then((res) => {
        console.log(res);
        setRefresh((prev) => ({
          ...prev,
          products: prev.products + 1,
        }));
      })
      .catch((res) => {
        console.log(res);
      });
  }

  return { handleDelete };
}

export default useDeleteProduct;
