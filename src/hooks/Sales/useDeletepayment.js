import React, { useContext } from "react";
import { Axios } from "../../Api/Axios";
import { payments } from "../../Api/Api";
import { ReRender } from "../../context/ReRender";

function useDeletepayment() {
  const { setRefresh } = useContext(ReRender);

  function Deletepayment(id) {
    Axios.delete(`${payments}/${id}`)
      .then((res) => {
        console.log(res);
        setRefresh((prev) => {
          return {
            ...prev,
            payment: prev.payment + 1,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return Deletepayment;
}

export default useDeletepayment;
