import React from "react";
import { Axios } from "../../Api/Axios";
import { teams } from "../../Api/Api";
import { ReRender } from "../../context/ReRender";
import { useContext } from "react";

function useCreateTeam({ setShowModal }) {
  //   const time = "t" + Date.now();
  const { setRefresh } = useContext(ReRender);

  function handleCreateTeam(formValues) {
    Axios.post(`${teams}`, formValues)
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
  return { handleCreateTeam };
}

export default useCreateTeam;
