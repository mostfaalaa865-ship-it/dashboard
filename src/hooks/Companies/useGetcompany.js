import React, { useEffect, useState } from "react";
import { Companies } from "../../Api/Api";
import { Axios } from "../../Api/Axios";

function useGetcompany(id) {
  const [company, setcompany] = useState();

  useEffect(() => {
    if (!id) return;

    Axios.get(`${Companies}/${id}`)
      .then((res) => {
        setcompany(res.data);
      })
      .catch((err) => {
        //err
      });
  }, [id]);
  return company;
}

export default useGetcompany;
