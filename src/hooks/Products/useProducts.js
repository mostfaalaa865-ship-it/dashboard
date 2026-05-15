import { useContext, useEffect, useState } from "react";
import { products } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { ReRender } from "../../context/ReRender";

function useProducts() {
  const [page, setpage] = useState(1);
  const [searchValue, setsearchValue] = useState("");
  const [debouncehValue, setDebounceValue] = useState("");
  const { isRender } = useContext(ReRender);
  const [products2, serproducts2] = useState([]);
  function getdata() {
    Axios.get(`${products}?page=${page}&per_page=5&title=${debouncehValue}`)
      .then((res) => {
        serproducts2(res.data);
      })
      .catch((err) => {
        //err
      });
  }
  useEffect(() => {
    getdata();
  }, [debouncehValue]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(searchValue);
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  useEffect(() => {
    if (isRender.includes("c")) {
      getdata();
    }
  }, [isRender]);

  return { products2, page, setpage, searchValue, setsearchValue };
}

export default useProducts;
