import { Axios } from "../../Api/Axios";
import { useContext, useEffect, useState } from "react";
import { ReRender } from "../../context/ReRender";
import { Companies } from "../../Api/Api";
import { FilterContext } from "../../context/FilterProvider";

function useClients() {
  const [page, setpage] = useState(1);
  const [searchValue, setsearchValue] = useState("");
  const [debouncehValue, setDebounceValue] = useState("");

  const render = useContext(ReRender);

  const [companies, setcompanies] = useState([]);
  const { FilterValue, filterType, applyFilter } = useContext(FilterContext);

  function getCompanies() {
    Axios.get(
      `${Companies}?page=${page}&name=${debouncehValue}&per_page=5&search=&${filterType}=${FilterValue}`,
    )
      .then((res) => {
        setcompanies(res.data);
      })
      .catch((err) => {
        //err
      });
  }
  useEffect(() => {
    getCompanies();
  }, [debouncehValue, page, applyFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(searchValue);
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  useEffect(() => {
    if (render.isRender.includes("b")) {
      getCompanies();
    }
  }, [render.isRender, page]);
  return { companies, page, setpage, searchValue, setsearchValue };
}

export default useClients;
