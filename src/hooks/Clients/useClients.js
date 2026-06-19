import { useContext, useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { baseURL, Clients } from "../../Api/Api";
import { ReRender } from "../../context/ReRender";
import { FilterContext } from "../../context/FilterProvider";

function useClients() {
  const [searchValue, setsearchValue] = useState("");
  const [debounceValue, setDebounceValue] = useState("");

  const { FilterValue, applyFilter } = useContext(FilterContext);

  const [page, setpage] = useState(1);
  const { refresh } = useContext(ReRender);
  const [clients, setClients] = useState([]);

  function getData() {
    Axios.get(
      `${baseURL}${Clients}?page=${page}&per_page=4&full_name=${debounceValue}&${Object?.entries(
        FilterValue,
      )
        ?.flatMap(([key, value]) => [key + "=" + value])
        .join("&")}`,
    )
      .then((res) => {
        setClients(res.data);
      })
      .catch((res) => {
        // log errors
      });
  }
  useEffect(() => {
    getData();
  }, [page, debounceValue, applyFilter, refresh.clients]);

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(searchValue);
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, page]);
  // this useeffect is for rerender operations
  // useEffect(() => {
  //   if (isRender.includes("a")) {
  //     getData();
  //   }
  // }, [isRender, page]);
  return {
    clients,
    page,
    setpage,
    searchValue,
    setsearchValue,
  };
}

export default useClients;
