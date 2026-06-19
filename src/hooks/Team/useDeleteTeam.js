import React from "react";
import { Axios } from "../../Api/Axios";
import { teams } from "../../Api/Api";
import { useContext } from "react";
import { ReRender } from "../../context/ReRender";

function useDeleteTeam() {
  const { setRefresh } = useContext(ReRender);
  // const time = "t" + Date.now();

  function handleDelete(id) {
    Axios.delete(`${teams}/${id}`)
      .then((res) => {
        console.log(res);
        setRefresh((prev) => ({
          ...prev,
          teams: prev.teams + 1,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return { handleDelete };
}

export default useDeleteTeam;
