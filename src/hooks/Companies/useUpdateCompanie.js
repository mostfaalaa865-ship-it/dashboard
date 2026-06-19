import React, { useContext, useState } from "react";
import { Companies } from "../../Api/Api";
import { ReRender } from "../../context/ReRender";
import { Axios } from "../../Api/Axios";

function useUpdateCompanies({ setShowModal }) {
  // const time = "b" + Date.now();
  const { setRefresh } = useContext(ReRender);

  const [load, setload] = useState(false);

  function handleUpdateCompanies(id, formValues) {
    setload(true);

    Axios.put(`${Companies}/${id}`, formValues)

      .then((res) => {
        setRefresh((prev) => ({
          ...prev,
          company: prev.company + 1,
        }));
        setShowModal(false);
        setload(false);
      })
      .catch((err) => {
        //err
        setload(false);
      });
  }

  return { load, handleUpdateCompanies };
}

export default useUpdateCompanies;
