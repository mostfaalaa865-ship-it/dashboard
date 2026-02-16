import { Axios } from "../Api/Axios";
import { useContext, useEffect, useState } from "react";
import { ReRender } from "../context/ReRender";
import { Companies } from "../Api/Api";

function useClients() {
  const render = useContext(ReRender);

  const [companies, setcompanies] = useState([]);
  console.log(companies);

  function getCompanies() {
    Axios.get(`${Companies}?page=1&per_page=15&search=`)
      .then((res) => {
        setcompanies(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }
  useEffect(() => {
    getCompanies();
  }, []);

  useEffect(() => {
    if (render.isRender.includes("b")) {
      getCompanies();
    }
  }, [render.isRender]);
  return { companies };
}

export default useClients;
