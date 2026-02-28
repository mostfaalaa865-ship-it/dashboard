import { useContext, useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { baseURL, Clients } from "../../Api/Api";
import { ReRender } from "../../context/ReRender";

function useClients() {
  const { isRender } = useContext(ReRender);
  const [clients, setClients] = useState([]);
  function getData() {
    Axios.get(`${baseURL}${Clients}?page=1&per_page=15&search=`)
      .then((res) => {
        setClients(res.data);
      })
      .catch((res) => {
        // log errors
      });
  }
  useEffect(() => {
    getData();
  }, []);
  // this useeffect is for rerender operations
  useEffect(() => {
    if (isRender.includes("a")) {
      getData();
    }
  }, [isRender]);
  return { clients };
}

export default useClients;
