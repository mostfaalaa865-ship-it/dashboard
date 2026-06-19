import { Axios } from "../../Api/Axios";
import { useContext, useEffect, useState } from "react";
import { ReRender } from "../../context/ReRender";
import { Companies } from "../../Api/Api";
import { FilterContext } from "../../context/FilterProvider";

function useClients() {
  const [page, setpage] = useState(1);
  const [searchValue, setsearchValue] = useState("");
  const [debouncehValue, setDebounceValue] = useState("");

  const { refresh } = useContext(ReRender);

  const [companies, setcompanies] = useState([]);
  const { FilterValue, filterType, applyFilter } = useContext(FilterContext);
  console.log(filterType);
  console.log(FilterValue);

  function getCompanies() {
    Axios.get(`${Companies}`, {
      params: {
        page,
        per_page: 4,
        name: debouncehValue,
        search: searchValue,
        ...FilterValue,
      },
    })
      .then((res) => {
        setcompanies(res.data);
      })
      .catch((err) => {
        //err
      });
  }
  useEffect(() => {
    getCompanies();
  }, [debouncehValue, page, applyFilter, refresh]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(searchValue);
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  // useEffect(() => {
  //   if (render.isRender.includes("b")) {
  //     getCompanies();
  //   }
  // }, [render.isRender, page]);
  return { companies, page, setpage, searchValue, setsearchValue };
}

export default useClients;
