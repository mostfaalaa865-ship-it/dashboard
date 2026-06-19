import React, { useContext, useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { payments } from "../../Api/Api";
import { ReRender } from "../../context/ReRender";

function usepayments() {
  const [page, setpage] = useState(1);
  const { refresh } = useContext(ReRender);

  const [paymentsData, setpaymentsData] = useState();

  useEffect(() => {
    Axios.get(`${payments}?page=${page}&per_page=5`)
      .then((res) => {
        console.log(res);
        setpaymentsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, refresh]);
  return { paymentsData, page, setpage };
}

export default usepayments;
