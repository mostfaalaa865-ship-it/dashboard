import React, { useContext, useState } from "react";
import { Axios } from "../../Api/Axios";
import { schedule } from "../../Api/Api";
import { ReRender } from "../../context/ReRender";

function useCreateSchedule(setShowModal, id) {
  const [loading, setLoading] = useState(false);

  const path = id ? `${schedule}/${id}` : `${schedule}`;
  const { setRefresh } = useContext(ReRender);
  async function createschedule(Values) {
    try {
      setLoading(true);

      id
        ? await Axios.put(`${path}`, Values)
        : await Axios.post(`${path}`, Values);
      //   setShowModal(false);
      setRefresh((prev) => ({
        ...prev,
        schedule: prev.schedule + 1,
      }));
      //   setShowModal(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  }
  return { createschedule, loading };
}

export default useCreateSchedule;
