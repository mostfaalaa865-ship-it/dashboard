import React from "react";
import { Axios } from "../../Api/Axios";
import { schedule } from "../../Api/Api";
import { useContext } from "react";
import Render, { ReRender } from "../../context/ReRender";

function useDeleteSchedule() {
  const { setRefresh } = useContext(ReRender);
  function deleteSchedule(id) {
    Axios.delete(`${schedule}/${id}`)
      .then((res) => {
        console.log(res);
        setRefresh((prev) => ({
          ...prev,
          schedule: prev.schedule + 1,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return deleteSchedule;
}

export default useDeleteSchedule;
