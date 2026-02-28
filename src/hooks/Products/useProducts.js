import { useContext, useEffect, useState } from "react";
import { products } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { ReRender } from "../../context/ReRender";

function useProducts() {
  const { isRender } = useContext(ReRender);
  const [products2, serproducts2] = useState([]);
  function getdata() {
    Axios.get(`${products}`)
      .then((res) => {
        serproducts2(res.data.data);
      })
      .catch((err) => {
        //err
      });
  }
  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (isRender.includes("c")) {
      getdata();
    }
  }, [isRender]);

  return { products2 };
}

export default useProducts;
