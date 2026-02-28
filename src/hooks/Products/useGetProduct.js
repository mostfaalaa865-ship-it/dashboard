import React, { useState, useEffect } from "react";
import { Axios } from "../../Api/Axios";
import { products } from "../../Api/Api";

function useGetProduct(id) {
  const [prodcut, setprodcut] = useState("");
  useEffect(() => {
    if (!id) return;

    Axios.get(`${products}/${id}`)
      .then((res) => {
        setprodcut(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [id]);
  return prodcut;
}

export default useGetProduct;
