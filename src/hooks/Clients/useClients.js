import { useContext, useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { baseURL, Clients } from "../../Api/Api";
import { ReRender } from "../../context/ReRender";

function useClients() {
  const [page, setpage] = useState(1);
  const { isRender } = useContext(ReRender);
  const [clients, setClients] = useState([]);
  function getData() {
    Axios.get(`${baseURL}${Clients}?page=${page}&per_page=4&search=`)
      .then((res) => {
        setClients(res.data);
      })
      .catch((res) => {
        // log errors
      });
  }
  useEffect(() => {
    getData();
  }, [page]);
  // this useeffect is for rerender operations
  useEffect(() => {
    if (isRender.includes("a")) {
      getData();
    }
  }, [isRender, page]);
  return { clients, page, setpage };
}

export default useClients;
