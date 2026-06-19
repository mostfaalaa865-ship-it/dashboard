import React, { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { schedule } from "../../Api/Api";

function useGetschedule(id) {
  const [scheduleitem, setscheduleitem] = useState();

  useEffect(() => {
    Axios.get(`${schedule}/${id}`)
      .then((res) => {
        console.log(res);
        setscheduleitem(res.data.item);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return scheduleitem;
}

export default useGetschedule;
