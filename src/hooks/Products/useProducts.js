import { useContext, useEffect, useState } from "react";
import { products } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { ReRender } from "../../context/ReRender";
import { FilterContext } from "../../context/FilterProvider";

function useProducts() {
  const [page, setpage] = useState(1);
  const [searchValue, setsearchValue] = useState("");
  const [debouncehValue, setDebounceValue] = useState("");
  const { refresh } = useContext(ReRender);
  const [products2, serproducts2] = useState([]);
  const { FilterValue, applyFilter } = useContext(FilterContext);

  function getdata() {
    Axios.get(`${products}`, {
      params: {
        page,
        per_page: 4,
        title: debouncehValue,
        search: searchValue,
        ...FilterValue,
      },
    })
      .then((res) => {
        serproducts2(res.data);
      })
      .catch((err) => {
        //err
      });
  }
  useEffect(() => {
    getdata();
  }, [debouncehValue, applyFilter, refresh.products]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(searchValue);
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  // useEffect(() => {
  //   if (isRender.includes("c")) {
  //     getdata();
  //   }
  // }, [isRender]);

  return { products2, page, setpage, searchValue, setsearchValue };
}

export default useProducts;
