import React from "react";
import { Axios } from "../../Api/Axios";
import { teams } from "../../Api/Api";
import { useContext } from "react";
import { ReRender } from "../../context/ReRender";

function useUpdateTeam({ setShowModal }) {
  const { setRefresh } = useContext(ReRender);

  function updateTeam(id, formValues) {
    Axios.put(`${teams}/${id}`, formValues)
      .then((res) => {
        console.log(res);
        setRefresh((prev) => ({
          ...prev,
          teams: prev.teams + 1,
        }));
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return updateTeam;
}

export default useUpdateTeam;
